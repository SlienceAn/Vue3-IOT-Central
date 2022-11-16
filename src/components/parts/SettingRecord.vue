<template>
  <button
    class="col-md-12 col-lg-3 col-sm-12 btn btn-info-dark text-white px-4"
    data-bs-toggle="modal"
    data-bs-target="#Modal"
  >
    顯示前六次設定紀錄
  </button>
  <Modal
    :title="`前六次設定紀錄 ${pjid} ${stid}`"
    close-text="關閉"
    size="modal-lg"
  >
    <table>
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </Modal>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Modal from "./Modal.vue";
import { useFetch } from "../../hook/useFetch";
const props = defineProps({
  pjid: String,
  stid: String,
});
</script>

<style lang="scss" scoped>
</style>