<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Tabbar from "./tabbar/index.vue";
import useStore from "@/store";
import { watch, nextTick } from "vue";
const { setting } = useStore();

watch(
  () => setting.refresh,
  (val) => {
    if (!val) {
      nextTick(() => {
        setting.toggleRefresh();
      });
    }
  }
);
</script>

<template>
  <div class="layout_container">
    <div class="layout_menu" :class="{ fold: setting.fold }">
      <Logo />
      <Menu />
    </div>
    <div class="layout_flexbox">
      <Tabbar class="layout_topbar" />
      <div class="layout_main">
        <router-view v-if="setting.refresh"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  display: flex;
  width: 100%;
  height: 100vh;
  .layout_menu {
    height: 100%;
    width: $base_menu_width;
    background-color: $base_menu_background_color;
    transition: all 0.3s;
    overflow: hidden;
  }
  .fold {
    width: 60px;
  }
  .layout_flexbox {
    width: calc(100vw - $base_menu_width);
    height: 100%;
    transition: all 0.5s;
    .layout_topbar {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: $base_topbar_height;
      background: white;
      box-shadow: 0 2px 4px #00000014;
    }
    .layout_main {
      width: 100%;
      height: calc(100vh - $base_topbar_height);
      padding: 20px;
      // background: skyblue;
      overflow: auto;
    }
  }
}
</style>
