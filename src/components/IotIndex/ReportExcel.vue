<template>
  <div class="row m-0 p-0 gy-2">
    <div class="col-md-2">
      <select class="form-select" v-model="place">
        <option selected disabled>請選擇地區</option>
        <option value="107038">高雄500</option>
        <option value="108023">高雄750</option>
        <option value="110011">雲林</option>
        <option value="108064">彰化</option>
      </select>
    </div>
    <DateForm
      date-class="col-md-2 col-sm-12"
      placeholder="選擇起始日期"
      format="yyyy-MM-dd"
      ref="StartDate"
    />
    <DateForm
      date-class="col-md-2 col-sm-12"
      placeholder="選擇結束日期"
      format="yyyy-MM-dd"
      ref="EndDate"
    />
    <button class="btn btn-info-dark text-white w-auto" @click="query">
      搜尋
    </button>
  </div>
  <Loading v-if="res.loading" />
  <div v-else class="table-box row gy-2">
    <table class="table table-striped table-bordered bg-white">
      <thead>
        <tr>
          <th v-for="F in field" :key="F">{{ F }}</th>
          <th>設備外觀檢查</th>
          <th>設備內檢查清理</th>
          <th>設備周邊遮蔽檢查</th>
          <th>周界50公尺排放源</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(R, index) in res.data" :key="R">
          <td v-for="value in R" :key="value">{{ value }}</td>
          <td>
            <img style="width: 100px" :src="imgList[index].East" alt="East" />
          </td>
          <td>
            <img style="width: 100px" :src="imgList[index].West" alt="West" />
          </td>
          <td>
            <img style="width: 100px" :src="imgList[index].South" alt="South" />
          </td>
          <td>
            <img style="width: 100px" :src="imgList[index].North" alt="North" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button
    class="btn btn-info-dark text-white w-auto btn-excel"
    @click="postData"
    :disabled="btnText.loading"
  >
    <span
      v-if="btnText.loading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
    {{ btnText.text }}
  </button>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from "vue";
import DateForm from "@parts/DateForm.vue";
import Loading from "@parts/Loading.vue";
import { useFetch } from "@hook/useFetch";
import { field } from "../../store";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const StartDate = ref();
const EndDate = ref();
const place = ref("");
const btnText = reactive({
  text: "匯出報表",
  loading: false,
});
const res = reactive<any>({
  data: [],
  loading: false,
});
let imgList = reactive<any>([]);
const query = async () => {
  res.loading = true;
  const { data, status } = await useFetch(
    `getExcel?start=${StartDate.value.date}&end=${EndDate.value.date}&place=${place.value}`,
    { method: "GET" },
    cookies
  )();
  if (status === 200) {
    const url = "http://www.jsene.com/iotcentral/api/files/";
    for (const i in data) {
      res.data.push(data[i]["result"]);//bug...需要改
      imgList.push({
        East: `${url + data[i].BookID}/east.jpeg`,
        North: `${url + data[i].BookID}/north.jpeg`,
        West: `${url + data[i].BookID}/west.jpeg`,
        South: `${url + data[i].BookID}/south.jpeg`,
      });
    }
    res.loading = false;
  }
};
const postData = async () => {
  btnText.loading = true;
  btnText.text = "正在匯出報表...";
  const mixData = JSON.parse(JSON.stringify(res.data));
  for (const i in res.data) {
    mixData[i]["East"] = imgList[i]["East"];
    mixData[i]["West"] = imgList[i]["West"];
    mixData[i]["South"] = imgList[i]["South"];
    mixData[i]["North"] = imgList[i]["North"];
  }
  const { data, status } = await useFetch(
    "getExcel",
    {
      method: "POST",
      body: JSON.stringify({
        params: {
          data: mixData,
          field: [
            ...field,
            "設備外觀檢查",
            "設備內檢查清理",
            "設備周邊遮蔽檢查",
            "周界50公尺排放源",
          ],
        },
      }),
    },
    cookies,
    "blob"
  )();
  if (status === 200) {
    console.log(data);
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    let url = window.URL.createObjectURL(blob);
    let fileDownload = document.createElement("a");
    fileDownload.href = url;
    fileDownload.download = "巡檢報表.xlsx";
    fileDownload.click();
    window.URL.revokeObjectURL(url);
    btnText.loading = false;
    btnText.text = "匯出報表";
  }
};
</script>

<style lang="scss" scoped>
.table-box,
.btn-excel {
  margin-right: calc(var(--bs-gutter-x) * 0.5);
  margin-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: calc(var(--bs-gutter-x) * 0.5);
  margin-bottom: calc(var(--bs-gutter-x) * 0.5);
}
.table-box {
  overflow-x: scroll;
}
th,
td {
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
}
</style>