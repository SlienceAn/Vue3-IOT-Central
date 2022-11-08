<template>
  <div :class="dateClass">
    <Datepicker v-model="date" :placeholder="placeholder"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose } from "vue";
const props = defineProps({
  dateClass: String,
  placeholder: String,
});
const date = ref();
defineExpose({
  date,
});
</script>

<style lang="scss" scoped>
</style>