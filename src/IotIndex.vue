<template>
  <div class="row m-0" style="min-height: 100vh">
    <div class="sidebar p-0">
      <div v-if="isOpen" class="p-4">
        <strong> JSENE 捷思微感資訊中心</strong>
      </div>
      <ul v-if="isOpen" class="list-group p-0 m-0">
        <router-link to="/" custom v-slot="{ navigate }">
          <li class="list-group-item d-flex justify-content-between py-3">
            <i class="material-icons">account_circle</i>
            <span>早安</span>
            <span>{{ state.data["Name"] }}</span>
            <i class="material-icons" @click="navigate">input</i>
          </li>
        </router-link>
        <router-link
          v-for="R in routeData"
          :key="R.urls"
          :to="R.urls"
          custom
          v-slot="{ navigate, isExactActive }"
        >
          <li
            @click="navigate"
            :class="
              isExactActive
                ? 'list-group-item d-flex align-items-center gap-4 router-li active'
                : 'list-group-item d-flex align-items-center gap-4 router-li'
            "
          >
            <i class="material-icons">{{ R.i }}</i>
            <span>{{ R.text }}</span>
            <div v-if="isExactActive" class="triangle"></div>
          </li>
        </router-link>
        <li class="list-group-item d-flex align-items-center gap-4 router-li">
          <i class="material-icons">compare</i>
          <span>比對系統(另開新頁)</span>
        </li>
      </ul>
      <div
        v-if="isOpen"
        class="py-4 px-2 d-flex align-items-center justify-content-between"
      >
        <span class="text-danger text-time">更新時間:2020-06-15</span>
        <button class="btn btn-info-dark text-white">更新詳情</button>
      </div>
    </div>
    <div id="content" class="content">
      <nav class="navbar navbar-light mb-4">
        <div class="d-flex gap-2 align-items-center">
          <button class="btn d-flex py-1 px-1" @click="open">
            <i v-if="isOpen" class="material-icons"
              >keyboard_double_arrow_left
            </i>
            <i v-else class="material-icons"> keyboard_double_arrow_right </i>
          </button>
          <strong style="font-size: 25px">
            {{ route.name }}
          </strong>
        </div>
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
              v-for="code in state.projectCode"
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
        <Transition name="slide-fade">
          <keep-alive>
            <component :is="Component" :pjid="currentCode" />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Transition } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { routeData } from "./store";
const { state } = useStore();
const route = useRoute();
const currentCode = ref("");
const isOpen = ref(true);
const width = ref("calc(100% - 260px)");
const sidebarWidth = ref("260px");
onMounted(() => {
  setCode(state.projectCode[0].id); //Pjid預設值
});
const setCode = (code: string) => {
  currentCode.value = code;
};
const open = () => {
  isOpen.value = !isOpen.value;
  isOpen.value === true
    ? (width.value = "calc(100% - 260px)")
    : (width.value = "100%");
  isOpen.value === true
    ? (sidebarWidth.value = "260px")
    : (sidebarWidth.value = "0px");
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: v-bind(sidebarWidth);
  background-color: #fff;
  transition: all 0.5s;
}
.content {
  width: v-bind(width);
  transition: all 0.5s;
  position: relative;
}
.list-group-item:first-child {
  border-radius: 0;
  border-right: 0;
}
.router-li {
  position: relative;
  color: #007bff;
  padding: 15px 35px;
  border-right: 0px;
  &:hover {
    cursor: pointer;
    font-weight: bolder;
  }
}
.active {
  background: #007bff !important;
}
.triangle {
  position: absolute;
  width: 0;
  height: 0;
  right: -15px;
  border-top: 28px solid transparent;
  border-bottom: 28px solid transparent;
  border-left: 15px solid #007bff;
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
.text-time {
  font-size: 12px;
  font-weight: bolder;
}
// .slide-fade-enter-active {
//   transition: all 0.3s ease-out;
// }

// .slide-fade-leave-active {
//   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .slide-fade-enter-from,
// .slide-fade-leave-to {
//   transform: translateX(20px);
//   opacity: 0;
// }
</style>