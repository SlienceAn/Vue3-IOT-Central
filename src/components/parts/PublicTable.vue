<template>
  <table class="table table table-striped table-bordered bg-white">
    <thead>
      <tr>
        <th v-for="H in header" :key="H">
          <div class="d-flex align-items-center justify-content-between">
            <span>{{ H }}</span> <i class="material-icons">sort</i>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="value in data" :key="value">
        <template v-for="(val, key) in value" :key="val">
          <td v-if="key !== 'Duration'">{{ val }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  header: Array,
  data: Array,
});
</script>

<style lang="scss" scoped>
i:hover {
  cursor: pointer;
}
</style>