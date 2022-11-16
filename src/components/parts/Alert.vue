<template>
  <teleport to="body">
    <div
      v-if="isShow"
      :class="`alert ${data.color} d-flex align-items-cente gap-2`"
      role="alert"
    >
      <i class="material-icons" style="font-size: 25px">{{ data.i }}</i>
      <div>
        <strong>{{ data.text }}</strong>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineExpose, reactive, ref, watch } from "vue";
interface config {
  color: string;
  i: string;
  text: string;
}
const isShow = ref(false);
const data: config = reactive({
  color: "",
  i: "",
  text: "",
});
const notify = (config: config) => {
  isShow.value = true;
  data.color = config.color;
  data.i = config.i;
  data.text = config.text;
};
watch(isShow, (next) => {
  if (next) {
    setTimeout(() => (isShow.value = false), 3000);
  }
});
defineExpose({
  notify,
});
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 25px;
  left: 40%;
  transition: all 1s;
}
</style>