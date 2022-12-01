<template>
  <div :class="dateClass">
    <Datepicker
      v-model="date"
      :placeholder="placeholder"
      :format="format"
      autoApply
      utc="preserve"
      :monthPicker="month"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose } from "vue";
const props = defineProps({
  dateClass: String,
  placeholder: String,
  format: String,
  month: {
    type: Boolean,
    default: false,
    require: false,
  },
});
const date = ref();
defineExpose({
  date,
});
</script>

<style lang="scss" scoped>
</style>