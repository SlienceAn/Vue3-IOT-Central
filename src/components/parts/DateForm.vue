<template>
  <div class="w-100 d-flex">
    <Datepicker v-model="value" @change="dateee" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value = ref("2022");
const dateee = () => {
  console.log(value.value);
};
</script>

<style lang="scss" scoped>
</style>