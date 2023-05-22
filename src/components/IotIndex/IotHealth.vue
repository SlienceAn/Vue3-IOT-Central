<template>
  <div class="row p-0 m-0 gy-2">
    <div class="col-md-2 col-sm-12">
      <select class="form-select" v-model="pjid">
        <option disabled selected>請選擇專案代碼</option>
        <option v-for="pj in state.projectCode" :key="pj.id" :value="pj.id">
          {{ pj.id }} {{ pj.name }}
        </option>
      </select>
    </div>
    <DateForm
      date-class="col-md-2 col-sm-12"
      placeholder="選擇月份"
      format="yyyy-MM"
      ref=""
    />
    <button class="btn btn-info-dark text-white w-auto" @click="query">
      查詢
    </button>
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import DateForm from "@parts/DateForm.vue";
import { useStore } from "vuex";
import { useFetch } from "@hook/useFetch";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const { state } = useStore();
const pjid = ref("");
const Date = ref();
const query = async () => {
  console.log(Date.value.date.split("-"));
  const { data, status } = await useFetch(
    "healthy/month/",
    { method: "GET" },
    cookies
  );
};
</script>

<style lang="scss" scoped>
</style>