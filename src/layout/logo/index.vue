<script setup lang="ts">
import setting from "@/setting";
</script>

<template>
  <div class="logo" v-if="setting.isShow">
    <img :src="setting.logoUrl" alt="" />
    <p>{{ setting.logoName }}</p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  p {
    text-wrap: nowrap;
  }
}
</style>
