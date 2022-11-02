<template>
  <div class="row m-0">
    <div class="sidebar p-0">
      <div class="p-4">
        <strong> JSENE 捷思微感資訊中心</strong>
      </div>
      <ul class="list-group p-0 m-0">
        <router-link to="/" custom v-slot="{ navigate }">
          <li class="list-group-item d-flex justify-content-between py-3">
            <i class="material-icons">account_circle</i>
            <span>早安</span>
            <span>{{ store.state.data["Name"] }}</span>
            <i class="material-icons" @click="navigate">input</i>
          </li>
        </router-link>
        <router-link
          v-for="R in routeData"
          :key="R.urls"
          :to="R.urls"
          custom
          v-slot="{ navigate }"
        >
          <li
            @click="navigate"
            class="list-group-item d-flex align-items-center gap-4 router-li"
          >
            <i class="material-icons">{{ R.i }}</i>
            <span>{{ R.text }}</span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="content">
      <nav class="navbar navbar-light mb-4">
        <strong>
          <h4>{{ route.name }}</h4>
        </strong>
        <div class="dropdown" v-if="route.name === 'Dashboard'">
          <button
            class="btn btn-secondary dropdown-toggle"
            id="dropButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            專案ID {{ currentCode }}
          </button>
          <ul class="dropdown-menu end-0" id="dropButton">
            <li
              v-for="code in projectCode"
              :key="code.id"
              class="dropdown-item"
              @click="setCode(code.id)"
            >
              {{ code.id }} {{ code.name }}
            </li>
          </ul>
        </div>
      </nav>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :pjid="currentCode" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { routeData, routeDataAnotherFeatures } from "./store";
interface Code {
  name: string;
  id: string;
}
const store = useStore();
const route = useRoute();
const projectCode = reactive<Code[]>([]);
const currentCode = ref("");
onMounted(() => {
  for (const i in store.state.data["ProjectPermissions"].split(",")) {
    projectCode.push({
      name: store.state.data["ProjectName"].split(",")[i],
      id: store.state.data["ProjectPermissions"].split(",")[i],
    });
  }
  setCode(projectCode[0].id); //預設值
});
const setCode = (code: string) => {
  currentCode.value = code;
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 260px;
  background-color: #fff;
}
.content {
  width: calc(100% - 260px);
}
.list-group-item:first-child {
  border-radius: 0;
  border-right: 0;
}
.router-li {
  color: #007bff;
  padding: 15px 35px;
  border-right: 0px;
  &:hover {
    cursor: pointer;
    color: #094483;
  }
}

nav {
  border-bottom: 0.5px solid;
  padding: 17px 0px 17px 0;
  margin-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: calc(var(--bs-gutter-x) * 0.5);
}
ul {
  left: auto !important;
}
</style>