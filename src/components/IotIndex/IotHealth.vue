<template>
  <div class="row p-0 m-0 gy-2">
    <div class="col-md-4 col-sm-12">
      <select class="form-control">
        <option disabled selected>請選擇專案代碼</option>
        <option v-for="pj in state.projectCode" :key="pj.id" :value="pj.id">
          {{ pj.id }} {{ pj.name }}
        </option>
      </select>
    </div>
    <DateForm date-class="col-md-3 col-sm-12" placeholder="選擇月份" />
    <button class="btn btn-info-dark text-white w-auto">查詢</button>
  </div>
</template>

<script lang="ts" setup>
import DateForm from "@parts/DateForm.vue";
import { useStore } from "vuex";
const { state } = useStore();
</script>

<style lang="scss" scoped>
</style>