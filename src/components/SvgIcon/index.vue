<script setup lang="ts">
defineProps({
  name: String,
  color: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "30px",
  },
  height: {
    type: String,
    default: "30px",
  },
});
</script>

<template>
  <svg :style="{ width, height }">
    <use :xlink:href="'#icon-' + name" :fill="color"></use>
  </svg>
</template>

<style scoped></style>
