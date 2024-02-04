import type { MigrateData, MigratePost, MigrateTag } from "@/types";

interface useGhostDataParserReturn {
  parse: () => Promise<MigrateData>;
}

export function useGhostDataParser(file: File): useGhostDataParserReturn {
  const parse = (): Promise<MigrateData> => {
    return new Promise<MigrateData>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const data = JSON.parse(fileContent);
        resolve(parseData(data.db[0].data));
      };
      reader.onerror = () => {
        reject("Failed to fetch data");
      };
      reader.readAsText(file);
    });
  };

  const parseData = (data: any): MigrateData => {
    return {
      tags: parseTags(data.tags),
      categories: [],
      posts: parsePosts(data),
      pages: [],
      comments: [],
      menuItems: [],
      moments: [],
      photos: [],
      links: [],
    } as MigrateData;
  };

  const parseTags = (tags: Tag[]): MigrateTag[] => {
    return tags?.map((tag: Tag) => {
      return {
        metadata: {
          name: tag.id + "",
        },
        kind: "Tag",
        apiVersion: "content.halo.run/v1alpha1",
        spec: {
          displayName: tag.name,
          slug: tag.slug,
          color: tag.accent_color,
          cover: tag.feature_image,
        },
      };
    });
  };

  const parsePosts = (data: any): MigratePost[] => {
    const { posts_tags, posts } = data;

    return posts?.map((post: Post) => {
      const tagIds = posts_tags
        .filter((item: PostTag) => item.post_id === post.id)
        .map((item: PostTag) => item.tag_id);

      return {
        postRequest: {
          post: {
            spec: {
              title: post.title,
              slug: post.slug,
              template: "",
              cover: post.feature_image,
              deleted: false,
              publish: true,
              publishTime: new Date(post.created_at).toISOString(),
              pinned: post.featured === 1,
              allowComment: true,
              visible: "PUBLIC",
              priority: 0,
              excerpt: {
                autoGenerate: false,
                raw: post.plaintext,
              },
              categories: [],
              tags: tagIds,
              htmlMetas: [],
            },
            apiVersion: "content.halo.run/v1alpha1",
            kind: "Post",
            metadata: {
              name: post.id + "",
              annotations: {},
            },
          },
          content: {
            raw: post.html,
            content: post.html,
            rawType: "HTML",
          },
        },
        counter: {
          visit: 0,
          upvote: 0,
        },
      };
    });
  };

  return { parse };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  parent_id?: string;
  visibility: "public";
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  canonical_url?: string;
  accent_color?: string;
  created_at: string;
  updated_at: string;
}

export interface PostTag {
  id: string;
  post_id: string;
  tag_id: string;
  sort_order: number;
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  mobiledoc: string;
  lexical: any;
  html: string;
  comment_id: string;
  plaintext: string;
  feature_image: string;
  featured: number;
  type: string;
  status: string;
  locale: any;
  visibility: string;
  email_recipient_filter: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt: any;
  codeinjection_head: any;
  codeinjection_foot: any;
  custom_template: any;
  canonical_url: any;
  newsletter_id: any;
}
