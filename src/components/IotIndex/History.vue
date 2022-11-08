<template>
  <div class="row p-0 m-0 gy-2">
    <div class="col-md-2 col-sm-12">
      <select class="form-control" v-model="searchForm.pjid">
        <option disabled selected>請選擇專案代碼</option>
        <option v-for="pj in state.projectCode" :key="pj.id" :value="pj.id">
          {{ pj.id }} {{ pj.name }}
        </option>
      </select>
    </div>
    <div class="col-md-2 col-sm-12">
      <select class="form-control" v-model="searchForm.eventType">
        <option disabled selected>請選擇事件分類</option>
        <option value="offline">斷線</option>
        <option value="equal">定值</option>
        <option value="negative">零值(負值)</option>
      </select>
    </div>
    <DateForm
      date-class="col-md-2 col-sm-12"
      placeholder="選擇起始日期"
      ref="startDate"
    />
    <DateForm
      date-class="col-md-2 col-sm-12"
      placeholder="選擇結束日期"
      ref="endDate"
    />
    <div class="col-md-4 col-sm-12 d-flex">
      <input
        class="form-control"
        placeholder="感測器編號，多站請用逗號區隔(選填)"
        v-model="searchForm.stid"
      />
    </div>
    <button class="w-auto btn btn-info-dark text-white" @click="queryHistory">
      查詢
    </button>
  </div>
  <div class="row p-0 m-0">
    <PublicTable :header="header" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance, ref } from "vue";
import DateForm from "../parts/DateForm.vue";
import PublicTable from "../parts/PublicTable.vue";
import { useStore } from "vuex";
import { useFetch } from "../../hook/useFetch";
import { useCheckID } from "../../hook/useCheckID";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const { state } = useStore();
const startDate = ref();
const endDate = ref();
const header = reactive([
  "#",
  "STID",
  "IIT",
  "Desc",
  "開始時間",
  "結束時間",
  "持續時間",
]);
const searchForm = reactive({
  pjid: "請選擇專案代碼",
  stid: "",
  eventType: "請選擇事件分類",
  startDate: "",
  endDate: "",
});
const queryHistory = () => {
  console.log(searchForm);
  console.log(startDate.value.date);
  console.log(endDate.value.date);
  // const url = "history";
  // const { result, warnStr } = useCheckID(searchForm.pjid, searchForm.stid);
  // const getHistory = useFetch("history", { method: "GET" }, cookies);
};
</script>

<style lang="scss" scoped>
</style>