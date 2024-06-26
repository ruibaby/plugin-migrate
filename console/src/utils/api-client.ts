import {
  ApiConsoleHaloRunV1alpha1PostApi,
  ApiConsoleHaloRunV1alpha1SinglePageApi,
  ApiConsoleHaloRunV1alpha1UserApi,
  ApiConsoleHaloRunV1alpha1CommentApi,
  ApiConsoleHaloRunV1alpha1ReplyApi,
  ApiConsoleHaloRunV1alpha1StatsApi,
  ContentHaloRunV1alpha1CategoryApi,
  ContentHaloRunV1alpha1CommentApi,
  ContentHaloRunV1alpha1PostApi,
  ContentHaloRunV1alpha1ReplyApi,
  ContentHaloRunV1alpha1TagApi,
  ContentHaloRunV1alpha1SinglePageApi,
  StorageHaloRunV1alpha1AttachmentApi,
  StorageHaloRunV1alpha1GroupApi,
  StorageHaloRunV1alpha1PolicyApi,
  StorageHaloRunV1alpha1PolicyTemplateApi,
  V1alpha1ConfigMapApi,
  V1alpha1MenuApi,
  V1alpha1MenuItemApi,
  V1alpha1SettingApi,
  V1alpha1UserApi,
  MetricsHaloRunV1alpha1CounterApi,
} from "@halo-dev/api-client";
import type { AxiosInstance } from "axios";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

const apiClient = setupApiClient(axiosInstance);

function setupApiClient(axios: AxiosInstance) {
  return {
    extension: {
      configMap: new V1alpha1ConfigMapApi(undefined, baseURL, axios),
      setting: new V1alpha1SettingApi(undefined, baseURL, axios),
      user: new V1alpha1UserApi(undefined, baseURL, axios),
      menu: new V1alpha1MenuApi(undefined, baseURL, axios),
      menuItem: new V1alpha1MenuItemApi(undefined, baseURL, axios),
      post: new ContentHaloRunV1alpha1PostApi(undefined, baseURL, axios),
      singlePage: new ContentHaloRunV1alpha1SinglePageApi(
        undefined,
        baseURL,
        axios,
      ),
      category: new ContentHaloRunV1alpha1CategoryApi(
        undefined,
        baseURL,
        axios,
      ),
      tag: new ContentHaloRunV1alpha1TagApi(undefined, baseURL, axios),
      comment: new ContentHaloRunV1alpha1CommentApi(undefined, baseURL, axios),
      reply: new ContentHaloRunV1alpha1ReplyApi(undefined, baseURL, axios),
      storage: {
        group: new StorageHaloRunV1alpha1GroupApi(undefined, baseURL, axios),
        attachment: new StorageHaloRunV1alpha1AttachmentApi(
          undefined,
          baseURL,
          axios,
        ),
        policy: new StorageHaloRunV1alpha1PolicyApi(undefined, baseURL, axios),
        policyTemplate: new StorageHaloRunV1alpha1PolicyTemplateApi(
          undefined,
          baseURL,
          axios,
        ),
      },
      counter: new MetricsHaloRunV1alpha1CounterApi(undefined, baseURL, axios),
    },
    // custom endpoints
    user: new ApiConsoleHaloRunV1alpha1UserApi(undefined, baseURL, axios),
    post: new ApiConsoleHaloRunV1alpha1PostApi(undefined, baseURL, axios),
    singlePage: new ApiConsoleHaloRunV1alpha1SinglePageApi(
      undefined,
      baseURL,
      axios,
    ),
    comment: new ApiConsoleHaloRunV1alpha1CommentApi(undefined, baseURL, axios),
    reply: new ApiConsoleHaloRunV1alpha1ReplyApi(undefined, baseURL, axios),
    stats: new ApiConsoleHaloRunV1alpha1StatsApi(undefined, baseURL, axios),
  };
}

export { apiClient };
