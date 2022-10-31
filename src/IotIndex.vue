<template>
  <div class="row m-0 h-100">
    <div class="sidebar h-100 p-0">
      <div class="p-4">
        <strong> JSENE 捷思微感資訊中心</strong>
      </div>
      <ul class="list-group p-0 m-0">
        <router-link to="/" custom v-slot="{ navigate }">
          <li class="list-group-item d-flex justify-content-between py-3">
            <i class="material-icons">account_circle</i>
            <span>早安</span>
            <spa></spa>
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
      <nav class="navbar navbar-light">
        <strong>{{ routeName }}</strong>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            id="dropButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            專案ID(1xxxxx)
          </button>
          <ul class="dropdown-menu" id="dropButton">
            <li>111</li>
            <li>222</li>
          </ul>
        </div>
      </nav>
      <router-view v-slot="{ Component }" class="py-4">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { routeData, routeDataAnotherFeatures, LoginInfo } from "./store";
const store = useStore();
const route = useRoute();
const userName = ref<LoginInfo>(store.state.data);
const routeName = ref(route.name);
onMounted(() => {
  console.log(store.state);
});
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
  padding: 17px 0px;
}
</style>