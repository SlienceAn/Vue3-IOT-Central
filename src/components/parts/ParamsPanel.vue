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
    />
  </div>
  <div id="WifiSetting" class="collapse">Wifi設定</div>
  <div id="BigSetting" class="collapse">重要設定</div>
  <slot name="submit" />
</template>

<script lang="ts" setup>
import { reactive, defineProps, getCurrentInstance, defineExpose } from "vue";
import { useFetch } from "../../hook/useFetch";
import InputCube from "./InputCube.vue";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
let DataList = reactive({
  item: [],
  value: [],
}) as any;
let postData = reactive({
  Upvalue: {},
  Upcount: {},
  Written: {},
}) as any;
const props = defineProps({
  pjid: String,
  stid: String,
});
const queryValue = () => {
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
  Promise.all([getItem(), getValue()]).then((res) => {
    DataList.item = res[0]["data"];
    DataList.value = res[1]["data"];
    for (let i = 0; i < DataList.item.length / 2; i++) {
      postData["Upvalue"][`Ch0${i}Zero`] = "";
      postData["Upvalue"][`Ch0${i}Span`] = "";
      postData["Upcount"][`Ch0${i}Zero`] = "";
      postData["Upcount"][`Ch0${i}Span`] = "";
      postData["Written"][`Ch0${i}Written`] = false;
    }
  });
};
const modifyData = (cate: string, item: string, value: any) => {
  postData[cate][item] = value;
};
defineExpose({
  queryValue,
  postData
});
</script>


