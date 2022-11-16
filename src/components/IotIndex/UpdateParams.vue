<template>
  <div>
    <div class="row p-0 m-0">
      <label class="col-md-2 col-sm-12">
        <div class="mb-2"><strong>Project ID</strong></div>
        <select class="form-control" v-model="inputData.ProjectID">
          <option disabled selected>請選擇專案代碼</option>
          <option v-for="pj in state.projectCode" :key="pj.id" :value="pj.id">
            {{ pj.id }} {{ pj.name }}
          </option>
        </select>
      </label>
      <label class="col-md-2 col-sm-12">
        <div class="mb-2"><strong>STID</strong></div>
        <input
          class="form-control"
          v-model="inputData.STID"
          placeholder="請輸入STID"
        />
      </label>
      <div id="buttonBox" class="col-md-8">
        <div class="mb-2">
          <span class="text-yellow">*支援所有感測器系列的完整查詢*</span>
          <span class="text-green">(部分感測器可能無Count值)</span>
        </div>
        <div class="row p-0 m-0 gap-2">
          <button
            class="
              col-md-12 col-lg-3 col-sm-12
              btn btn-info-dark
              text-white
              px-4
            "
            @click="queryValue"
          >
            查詢最新測值
          </button>
          <SettingRecord :pjid="inputData.ProjectID" :stid="inputData.STID" />
          <button
            class="col-lg-5 col-md-12 col-sm-12 btn btn-danger text-white px-4"
          >
            查詢感測器詳細資訊(另開新頁)
          </button>
        </div>
      </div>
    </div>
    <ParamsPanel
      ref="paramsPanel"
      :pjid="inputData.ProjectID"
      :stid="inputData.STID"
    >
      <template v-slot:buttonList>
        <div id="buttonList" class="row py-4 gap-2 w-75">
          <button
            v-for="B in buttonList[0]"
            :key="B.text"
            class="btn btn-primary w-auto col-sm-12"
            type="button"
            :data-bs-toggle="B.toggle"
            :data-bs-target="B.id"
          >
            {{ B.text }}
          </button>
        </div>
      </template>
      <template v-slot:submit>
        <div class="submit d-flex gap-4 mt-4">
          <button class="btn btn-info-dark text-white" @click="submit">
            送出
          </button>
          <div>
            <div class="mb-2">送出後保留Value欄位</div>
            <SwitchBox v-model:checked="saveValue" />
          </div>
        </div>
      </template>
    </ParamsPanel>
  </div>
  <Modal title="ModelType變更" close-text="取消變更" size="">
    <div>checkBox</div>
  </Modal>
  <Alert ref="alert" />
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, provide } from "vue";
import ParamsPanel from "@parts/ParamsPanel.vue";
import SwitchBox from "@parts/SwitchBox.vue";
import Modal from "@parts/Modal.vue";
import Alert from "@parts/Alert.vue";
import SettingRecord from "@parts/SettingRecord.vue";
import { useStore } from "vuex";
import { usePermission } from "@hook/usePermission";
import { useFetch } from "@hook/useFetch";
import { useCheckID } from "@hook/useCheckID";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const { state } = useStore();
const { buttonList } = usePermission(state.data["ModifyPermissions"]);
const paramsPanel = ref();
const alert = ref();
const saveValue = ref(false);
const inputData = reactive({
  ProjectID: "請選擇專案代碼",
  STID: "",
});
const inspectQuery = () => {
  const { ProjectID: pjid, STID: stid } = inputData;
  let isPass = false;
  if (!pjid || !stid) {
    alert.value?.notify({
      color: "alert-danger",
      i: "warning",
      text: "STID、Project ID不得為空",
    });
  } else {
    const { result, warnStr } = useCheckID(pjid, stid);
    if (result === false) {
      alert.value?.notify({
        color: "alert-warning",
        i: "gpp_bad",
        text: `${pjid}的STID開頭必須為${warnStr} !!`,
      });
    } else {
      alert.value?.notify({
        color: "alert-success",
        text: "STID查詢成功",
        i: "task_alt",
      });
      isPass = true;
    }
  }
  return {
    isPass,
  };
};
provide("inspectQuery", inspectQuery);
const queryValue = () => paramsPanel.value?.queryValue();
</script>

<style lang="scss" scoped>
#buttonList,
.submit {
  margin-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: calc(var(--bs-gutter-x) * 0.5);
}
.text-yellow {
  color: rgb(255, 145, 0);
}
.text-green {
  color: rgb(0, 192, 26);
}
</style>