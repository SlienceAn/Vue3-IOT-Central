<template>
  <div class="row m-0">
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
  <button class="btn btn-success" @click="submitData">送出</button>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useFetch } from "../../hook/useFetch";
import InputCube from "./InputCube.vue";
let DataList = reactive({
  item: [],
  value: [],
}) as any;
let postData = reactive({
  Upvalue: {},
  Upcount: {},
  Written: {},
}) as any;
onMounted(async () => {
  const login = useFetch("login", {
    method: "POST",
    body: JSON.stringify({
      UID: "test",
      UPW: "40BD001563085FC35165329EA1FF5C5ECBDBBEEF",
    }),
  });
  const { data } = await login();
  const getValue = useFetch(
    "sensor/value/8001085/108023",
    { method: "GET" },
    data[0]["SessionID"]
  );
  const getItem = useFetch(
    "sensor/item/8001085",
    { method: "GET" },
    data[0]["SessionID"]
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
});
const modifyData = (cate: string, item: string, value: any) => {
  postData[cate][item] = value;
};
const submitData = () => {
  console.log(postData);
};
</script>


