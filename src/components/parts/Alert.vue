<template>
  <teleport to="body">
    <div :class="`alert ${color} d-flex align-items-cente gap-2`" role="alert">
      <i class="material-icons" style="font-size: 25px">{{ i }}</i>
      <div>{{ text }}</div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, watch } from "vue";
const props = defineProps({
  i: String,
  text: String,
  color: String,
});
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 25px;
  left: 40%;
  transition: all 0.3s;
}
</style>