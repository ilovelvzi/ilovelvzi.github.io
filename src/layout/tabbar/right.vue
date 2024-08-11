<script setup lang="ts">
import useStore from "@/store";
import { useRouter } from "vue-router";

const { setting, user } = useStore();
const router = useRouter();
// 刷新
const handleRefresh = () => {
  setting.toggleRefresh();
};
// 全屏
const fullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    // 全屏
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};
// 退出登录
const logout = async () => {
  await user.logout();
  router.push("/login");
};
</script>

<template>
  <div class="tabbar_right">
    <el-button @click="handleRefresh" size="small" icon="Refresh" circle />
    <el-button @click="fullScreen" size="small" icon="FullScreen" circle />
    <el-button size="small" icon="Setting" circle />
    <img :src="user.avatar" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ user.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.tabbar_right {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 15px;
    margin-right: 10px;
  }
}
</style>
