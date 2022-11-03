<template>
  <div class="col-md-4 py-4">
    <span class="text-danger">
      <strong>{{ param }} | {{ unit }}</strong>
    </span>
    <div class="d-flex align-items-center py-2">
      <span class="col-md-2 text-color">{{ value?.toFixed(2) }}</span>
      <span class="col-md-2">Value</span>
      <label class="col-md-4 pr">
        <span>Zero</span>
        <input
          class="form-control"
          v-model="colData.valueZero"
          @blur="modifyData('Upvalue', `Ch0${idx - 1}Zero`, colData.valueZero)"
        />
      </label>
      <label class="col-md-4 pl">
        <span>Span</span>
        <input
          class="form-control"
          v-model="colData.valueSpan"
          @blur="modifyData('Upvalue', `Ch0${idx - 1}Span`, colData.valueSpan)"
        />
      </label>
    </div>
    <div class="d-flex align-items-center py-2">
      <span class="col-md-2 text-color">{{ count }}</span>
      <span class="col-md-2">Count</span>
      <label class="col-md-4 pr">
        <span>Zero</span>
        <input
          class="form-control"
          v-model="colData.countZero"
          @blur="modifyData('Upcount', `Ch0${idx - 1}Zero`, colData.countZero)"
        />
      </label>
      <label class="col-md-4 pl">
        <span>Span</span>
        <input
          class="form-control"
          v-model="colData.countSpan"
          @blur="modifyData('Upcount', `Ch0${idx - 1}Span`, colData.countSpan)"
        />
      </label>
    </div>
    <div class="mb-2">寫入記憶體</div>
    <SwitchBox ref="switchRef" />
  </div>
</template>

<script lang="ts" setup>
import SwitchBox from "./SwitchBox.vue";
import { defineProps, reactive, ref } from "vue";
const switchRef = ref();
console.log(switchRef.value?.isSwitch);
defineProps({
  idx: Number,
  value: Number,
  count: Number,
  param: String,
  unit: String,
  modifyData: Function,
});
let colData = reactive({
  valueZero: "",
  valueSpan: "",
  countZero: "",
  countSpan: "",
});
</script>

<style scoped>
.text-color {
  color: #34da0c;
}
.pr {
  padding-right: 0.5rem;
}
.pl {
  padding-left: 0.5rem;
}
</style>