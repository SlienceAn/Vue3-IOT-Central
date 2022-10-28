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
            <spa>開發測試</spa>
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
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { routeData, routeDataAnotherFeatures } from "./store";
</script>

<style lang="scss" scoped>
.sidebar {
  width: 260px;
  background-color: #fff;
}
.content {
  width: calc(100% - 260px);
}
.router-li {
  color: #007bff;
  padding: 15px 35px;
  &:hover {
    cursor: pointer;
    color: #094483;
  }
}
</style>