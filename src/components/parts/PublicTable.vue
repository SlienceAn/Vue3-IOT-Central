<template>
  <table class="table table table-striped table-bordered bg-white">
    <thead>
      <tr>
        <th v-for="H in header" :key="H">{{ H }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
      </tr>
      <tr>
        <td>2</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  header: Array,
});
</script>

<style lang="scss" scoped>
</style>