<script setup lang="ts">
import { computed } from "vue";
import useStore from "@/store";

const { setting } = useStore();

const iconName = computed(() => {
  return setting.fold ? "Fold" : "Expand";
});

const changeIcon = () => {
  setting.changeFold();
};
</script>

<template>
  <div class="tabbar_left">
    <el-icon class="icon" @click="changeIcon">
      <component :is="iconName" />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
      >
        <el-icon style="margin-right: 5px">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.tabbar_left {
  display: flex;
  align-items: center;
  .icon {
    cursor: pointer;
    margin: 0 15px 0 20px;
  }
}
:deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
}
</style>
