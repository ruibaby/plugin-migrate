import { definePlugin } from "@halo-dev/console-shared";
import MigrateView from "./views/MigrateView.vue";
import { markRaw } from "vue";
import MdiCogTransferOutline from "~icons/mdi/cog-transfer-outline";
import "./styles/tailwind.css";

export default definePlugin({
  name: "PluginMigrate",
  components: [],
  routes: [
    {
      parentName: "ToolsRoot",
      route: {
        path: "/migrate",
        name: "Migrate",
        meta: {
          title: "迁移",
          searchable: true,
          permissions: ["plugin:PluginMigrate:migrate"],
          menu: {
            name: "迁移",
            group: "tool",
            icon: markRaw(MdiCogTransferOutline),
            priority: 0,
          },
        },
        children: [
          {
            path: "",
            component: MigrateView,
          },
        ],
      },
    },
  ],
  extensionPoints: {},
});
