<template>
  <div class="card mt-4 mb-4">
    <div :class="`card-header text-white ${bg}`">
      <strong style="font-size: 25px">{{ title }} ({{ total }})</strong>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="c in col" :key="c">{{ c }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="list?.length === 0">
            <td style="border: 0px">無</td>
          </tr>
          <tr v-else v-for="L in list" :key="L">
            <td v-for="col in L" :key="col">{{ col }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  title: String,
  bg: String,
  col: Array,
  list: Array,
});
const total = computed(() => {
  return props.list?.length;
});
</script>

<style lang="scss" scoped>
.card {
  margin-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: calc(var(--bs-gutter-x) * 0.5);
}
</style>