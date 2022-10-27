<template>
  <label class="switch">
    <!-- <input type="checkbox" v-model="isCheck" @click="checked" /> -->
    <span class="slider" />
  </label>
</template>

<script lang="ts" setup>
import { defineExpose, ref } from "vue";
const count = 0;
const fn = () => {
  console.log("子組件方法");
};
defineExpose({ fn, count });
</script>

<style scoped>
.switch {
  position: relative;
  display: flex;
  width: 55px;
  height: 29px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 30px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 25px;
  width: 25px;
  left: 2px;
  top: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: green;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>