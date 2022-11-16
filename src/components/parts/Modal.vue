<template>
  <teleport to="body">
    <div
      class="modal fade"
      id="Modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div :class="`modal-dialog ${size}`">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <strong>{{ title }}</strong>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  closeText: String,
  size: String,
});
</script>
