<template>
  <div :class="dateClass">
    <Datepicker
      v-model="date"
      :placeholder="placeholder"
      :format="format"
      autoApply
      utc="preserve"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose } from "vue";
const props = defineProps({
  dateClass: String,
  placeholder: String,
});
const date = ref();
const format = ref("yyyy-MM-dd HH:mm");
defineExpose({
  date,
});
</script>

<style lang="scss" scoped>
</style>