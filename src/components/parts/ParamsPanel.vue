<template>
  <slot name="buttonList" />
  <div id="ZeroSpanParams" class="row m-0 p-0 collapse">
    <input-cube
      v-for="col in DataList.item.length / 2"
      :key="col"
      :idx="col"
      :value="DataList.value[`Value${col}`]"
      :count="DataList.value[`Value${col + 8}`]"
      :param="DataList.item[col]['Parameter']"
      :unit="DataList.item[col]['Unit']"
      :modifyData="modifyData"
    >
      <SwitchBox
        v-model:checked="IotData.Config.Written[`Ch0${col - 1}Written`]"
      />
    </input-cube>
  </div>
  <div id="WifiSetting" class="row p-0 mx-0 mb-2 collapse">
    <div class="text-danger mb-2">
      <strong>*調整後請確認感測器上線狀態*</strong>
    </div>
    <label class="col-md-2 col-sm-12">
      <span class="mb-2 d-block"><strong>Wifi帳號</strong></span>
      <input
        class="form-control"
        placeholder="輸入wifi帳號"
        v-model="IotData.Wifi.Account"
      />
    </label>
    <label class="col-md-2 col-sm-12">
      <span class="mb-2 d-block"><strong>Wifi密碼</strong></span>
      <input
        class="form-control"
        placeholder="輸入wifi密碼"
        v-model="IotData.Wifi.Password"
      />
    </label>
  </div>
  <div id="BigSetting" class="row p-0 mx-0 mb-2 collapse">
    <div class="text-danger mb-2">
      <strong>*重要細項設定，請謹慎調整*</strong>
    </div>
    <div class="text-warning mb-2">
      <strong>*參數更新間隔時間測試完後請調整回30分鐘*</strong>
    </div>
    <label class="col-md-2 col-sm-12">
      <span class="mb-2 d-block"><strong>參數更新間隔時間(分)</strong></span>
      <input class="form-control w-50" v-model="IotData.Interval" />
    </label>
    <label class="col-md-2 col-sm-12">
      <span class="mb-2 d-block"><strong>重開機</strong></span>
      <SwitchBox v-model="IotData.Reboot" />
    </label>
  </div>
  <div id="InfoSetting" class="row p-0 m-0 collapse">
    <div class="text-danger mb-2">
      <strong>*重要細項設定，請謹慎調整*</strong>
    </div>
    <label class="col-md-2 col-sm-12">
      <span class="mb-2 d-block"><strong>修改STID</strong></span>
      <input class="form-control" v-model="IotData.ChangeSTID" />
    </label>
  </div>
  <slot name="submit" />
</template>

<script lang="ts" setup>
import {
  reactive,
  defineProps,
  getCurrentInstance,
  defineExpose,
  watch,
  inject,
} from "vue";
import { useFetch } from "@/hook/useFetch";
import InputCube from "./InputCube.vue";
import SwitchBox from "./SwitchBox.vue";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const IQ = inject("inspectQuery") as any;
const props = defineProps({
  pjid: String,
  stid: String,
});
const DataList = reactive({
  item: [],
  value: [],
}) as any;
const IotData = reactive({
  ProjectID: props.pjid,
  STID: props.stid,
  Interval: "",
  Reboot: false,
  ChangeSTID: "",
  Wifi: {
    Account: "",
    Password: "",
  },
  Config: {
    Value: {},
    Count: {},
    Written: {},
  },
}) as any;
const queryValue = () => {
  if (IQ().isPass) {
    const getValue = useFetch(
      `sensor/value/${props.stid}/${props.pjid}`,
      { method: "GET" },
      cookies
    );
    const getItem = useFetch(
      `sensor/item/${props.stid}`,
      { method: "GET" },
      cookies
    );
    Promise.all([getItem(), getValue()])
      .then((res) => {
        if (Array.isArray(res)) {
          DataList.item = res[0]["data"];
          DataList.value = res[1]["data"];
          for (let i = 0; i < DataList.item.length / 2; i++) {
            IotData.Config.Value[`Ch0${i}Zero`] = "";
            IotData.Config.Value[`Ch0${i}Span`] = "";
            IotData.Config.Count[`Ch0${i}Zero`] = "";
            IotData.Config.Count[`Ch0${i}Span`] = "";
            IotData.Config.Written[`Ch0${i}Written`] = false;
          }
        }
      })
      .catch((err) => console.log(err));
  }
};
const modifyData = (cate: string, item: string, value: any) => {
  IotData.Config[cate][item] = value;
};
defineExpose({
  queryValue,
  IotData,
});
</script>


