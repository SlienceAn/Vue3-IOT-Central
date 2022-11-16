<template>
  <div class="row p-0 m-0 gy-2">
    <div
      v-for="item in minorData"
      :key="item.title"
      class="col-lg-3 col-md-6 col-sm-12"
    >
      <div class="card">
        <div class="card-body d-flex justify-content-between">
          <i
            class="material-icons"
            :style="{ fontSize: '50px', color: item.iconColor }"
            >{{ item.mainIcon }}
          </i>
          <span>
            <div class="text-end mb-2" style="color: #9a9a9a">
              {{ item.title }}
            </div>
            <h2 class="text-end">
              <strong>{{ item.data }}</strong>
            </h2>
          </span>
        </div>
        <div
          class="card-footer d-flex align-items-center justify-content-between"
        >
          <i class="material-icons">{{ item.footerIcon }}</i>
          <span>{{ item.footerText }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="row p-0 m-0 gy-2">
    <div class="col-lg-4 col-md-4 p-0">
      <PanelWrapper
        title="強制上傳中"
        bg="bg-primary"
        :col="['STID', 'IIT', 'Desc', '快速開關']"
        :list="gatherList.forceUpload"
      />
    </div>
    <div class="col-lg-4 col-md-4 p-0">
      <PanelWrapper
        title="強制斷線中"
        bg="bg-primary"
        :col="['STID', 'IIT', 'Desc', '快速開關']"
        :list="gatherList.forceOff"
      />
    </div>
    <div class="col-lg-4 col-md-4 p-0">
      <PanelWrapper
        title="資料全失"
        bg="bg-primary"
        :col="['STID', 'IIT', 'Desc']"
        :list="gatherList.lost"
      />
    </div>
  </div>
  <PanelWrapper
    title="斷線中"
    bg="bg-danger"
    :col="['STID', 'IIT', 'Desc', '斷線時間', '斷線累積時數']"
    :list="gatherList.offline"
  />
  <PanelWrapper
    title="定值中"
    bg="bg-success"
    :col="['STID', 'IIT', 'Desc', '測項', '定值時間', '定值累積時數']"
    :list="gatherList.equal"
  />
  <PanelWrapper
    title="零值(負值)中"
    bg="bg-warning"
    :col="['STID', 'IIT', 'Desc', '測項', '零項時間', '零值累積時數']"
    :list="gatherList.negative"
  />
</template>

<script lang="ts" setup>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  defineProps,
  watch,
} from "vue";
import PanelWrapper from "../parts/PanelWrapper.vue";
import { useFetch } from "../../hook/useFetch";
import { minorData as MD } from "../../store";
import { useRouter } from "vue-router";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const router = useRouter();
const minorData = reactive(MD);
const gatherList = reactive({
  negative: [],
  offline: [],
  equal: [],
  lost: [],
  forceUpload: [],
  forceOff: [],
});
const props = defineProps({
  pjid: String,
});
onMounted(() => {
  console.log("$cookies", $cookies);
  if (cookies === "") router.push("/");
});
watch(
  () => props.pjid,
  (newPjid) => {
    queryData(newPjid);
  }
);
const queryData = (value: any) => {
  const promiseList = ["switch", "offline", "alllost", "negative", "equal"];
  const promiseListExe = promiseList.map((url) => {
    return useFetch(`${url}/${value}`, { method: "GET" }, cookies)();
  });
  Promise.all(promiseListExe)
    .then((res) => {
      const { data: switchData } = res[0];
      const { data: offlineData } = res[1];
      const { data: lostData } = res[2];
      const { data: negData } = res[3];
      const { data: equalData } = res[4];
      const offlineTotal =
        offlineData["SensorCounter"] - offlineData["Offline"].length;
      minorData[0].data = `${offlineTotal} / ${offlineData["SensorCounter"]}`;
      minorData[1].data = "0";
      minorData[2].data = "0";
      gatherList.negative = negData;
      gatherList.offline = offlineData["Offline"];
      gatherList.lost = lostData;
      gatherList.equal = equalData;
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped lang="scss">
</style>