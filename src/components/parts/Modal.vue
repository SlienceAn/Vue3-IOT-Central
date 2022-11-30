<template>
  <teleport to="body">
    <div class="modal fade" id="Modal" ref="modalRef">
      <div :class="`modal-dialog ${size}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <strong>{{ title }}</strong>
            </h5>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              {{ closeText }}
            </button>
            <button type="button" class="btn btn-info-dark text-white">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, ref, onMounted } from "vue";
import { Modal } from "bootstrap";
const props = defineProps({
  title: String,
  closeText: String,
  size: String,
});
const modalRef = ref(null);
let modal: any;
onMounted(() => {
  modal = new Modal(modalRef.value, {});
});
const show = () => {
  modal.show();
};
defineExpose({
  show,
});
</script>
