<template>
  <div class="row p-0 m-0">
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
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, reactive } from "vue";
import { useFetch } from "../../hook/useFetch";
import { minorData as MD } from "../../store";
import { useRouter } from "vue-router";
const globalData = getCurrentInstance()?.appContext.config.globalProperties;
const $cookies = globalData?.$cookies;
const cookies = $cookies.get("JSESSIONID");
const router = useRouter();
const minorData = reactive(MD);
const testPJ = 107038;
onMounted(() => {
  if (cookies === "") {
    router.push("/");
  } else {
    queryData();
  }
});
const queryData = () => {
  const Switchs = useFetch(`switch/${testPJ}`, { method: "GET" }, cookies);
  const Offline = useFetch(`offline/${testPJ}`, { method: "GET" }, cookies);
  const AllLost = useFetch(`alllost/${testPJ}`, { method: "GET" }, cookies);
  const Negative = useFetch(`negative/${testPJ}`, { method: "GET" }, cookies);
  const Equal = useFetch(`qqual/${testPJ}`, { method: "GET" }, cookies);
  Promise.all([Switchs(), Offline(), AllLost(), Negative(), Equal()])
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
    })
    .catch((err) => console.log(err));
};
</script>

<style scoped lang="scss">
</style>