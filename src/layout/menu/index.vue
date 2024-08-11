<script setup lang="ts">
import MenuItem from "./menuItem.vue";
import { useRouter } from "vue-router";
import useStore from "@/store";
import { computed } from "vue";

const { setting } = useStore();
const router = useRouter();

const routes = computed(() => router.options.routes);
</script>

<template>
  <el-scrollbar class="scrollbar">
    <el-menu
      :default-active="$route.path"
      background-color="#001529"
      text-color="#ffffff"
      :collapse="setting.fold"
    >
      <MenuItem v-for="route in routes" :key="route.path" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.scrollbar {
  height: calc(100vh - 50px);
  .el-menu {
    border-right: none;
  }
}
</style>
