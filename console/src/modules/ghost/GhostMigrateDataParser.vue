<script setup lang="ts">
import type { MigrateData } from "@/types";
import FileSelector from "@/components/FileSelector.vue";
import { useGhostDataParser } from "./use-ghost-data-parser";
defineProps<{
  data: MigrateData;
}>();

const emit = defineEmits<{
  (event: "update:data", value: MigrateData): void;
}>();

const handleFileChange = (files: FileList) => {
  const file = files.item(0);
  if (!file) {
    return;
  }
  useGhostDataParser(file)
    .parse()
    .then((data) => {
      emit("update:data", data);
    })
    .catch((error: any) => {
      console.error(error);
    });
};
</script>
<template>
  <div class="sm:migrate-w-1/2">
    <FileSelector
      :options="{ accept: '.json', multiple: false }"
      @fileChange="handleFileChange"
    ></FileSelector>
  </div>
</template>
