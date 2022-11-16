<template>
  <button
    class="col-md-12 col-lg-3 col-sm-12 btn btn-info-dark text-white px-4"
    data-bs-toggle="modal"
    data-bs-target="#Modal"
    @click="query"
  >
    顯示前六次設定紀錄
  </button>
  <Modal
    :title="`前六次設定紀錄-${pjid}-${stid}`"
    close-text="關閉"
    size="modal-lg"
  >
    <table class="table table-striped">
      <thead>
        <tr>
          <th>設定時間</th>
          <th>設定者</th>
          <th>設定內容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script lang="ts" setup>
import {
  defineProps,
  inject,
  getCurrentInstance,
  reactive,
  nextTick,
} from "vue";
import Modal from "./Modal.vue";
import { useFetch } from "../../hook/useFetch";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const IQ: any = inject("inspectQuery");
const props = defineProps({
  pjid: String,
  stid: String,
});
let data = reactive({});
const query = async (): Promise<void> => {
  const { pjid, stid } = props;
  if (IQ()) {
    const { data: response, status } = await useFetch(
      `sensor/setting?pjid=${pjid}&stid=${stid}`,
      { method: "GET" },
      cookies
    )();
    if (status === 200) {
      data = response;
      console.log("data", data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>