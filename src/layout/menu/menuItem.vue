<script setup lang="ts" name="menuItem">
import { useRouter } from "vue-router";
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

const resolvePath = (vc: any) => {
  router.push(vc.index);
};
</script>

<template>
  <!-- 没有子路由 -->
  <el-menu-item
    v-if="!item.children && !item.hidden"
    :index="item.path"
    @click="resolvePath"
  >
    <el-icon>
      <component :is="item.meta.icon"></component>
    </el-icon>
    <template #title>{{ item.meta.title }}</template>
  </el-menu-item>
  <!-- 有且仅有一个子路由 -->
  <el-menu-item
    v-else-if="item.children && item.children.length === 1 && !item.hidden"
    :index="item.path"
    @click="resolvePath"
  >
    <el-icon>
      <component :is="item.children[0].meta.icon"></component>
    </el-icon>
    <template #title>{{ item.children[0].meta.title }}</template>
  </el-menu-item>
  <!-- 有多个子路由 -->
  <el-sub-menu
    v-else-if="item.children && item.children.length > 1 && !item.hidden"
    :index="item.path"
  >
    <template #title>
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <menuItem v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>
</template>

<style scoped></style>
