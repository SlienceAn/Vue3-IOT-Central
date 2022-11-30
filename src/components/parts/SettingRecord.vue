<template>
  <button
    class="col-md-12 col-lg-3 col-sm-12 btn btn-info-dark text-white px-4"
    @click="query"
  >
    <span
      v-if="res.loading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
    顯示前六次設定紀錄
  </button>
  <Modal
    :title="`前六次設定紀錄,PJID:${pjid},STID:${stid}`"
    close-text="關閉"
    size="modal-lg"
    ref="ModalRef"
  >
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>設定時間</th>
          <th>設定者</th>
          <th>設定內容</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="R in res.data" :key="R">
          <td v-for="data in R" :key="data">{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script lang="ts" setup>
import { defineProps, inject, getCurrentInstance, reactive, ref } from "vue";
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
let res = reactive({ data: null, loading: false });
const ModalRef = ref();
const query = async (): Promise<void> => {
  const { pjid, stid } = props;
  if (IQ()) {
    res.loading = true;
    const { data, status, loading } = await useFetch(
      `sensor/setting?pjid=${pjid}&stid=${stid}`,
      { method: "GET" },
      cookies
    )();
    if (status === 200) {
      res.data = data;
      res.loading = loading;
      ModalRef.value?.show();
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  white-space: nowrap;
}
</style>