<template>
  <div class="d-flex flex-column col-lg-4 col-md-6 col-xs-12 mx-auto my-0 p-4">
    <h2 class="text-center py-5">
      <strong>JS Iot Central捷思微感資訊中心</strong>
    </h2>
    <div class="py-5">
      <div class="block-cube block-input mb-5">
        <input type="text" class="form-input" placeholder="輸入帳號" />
        <div class="bg-top">
          <div class="bg-inner" />
        </div>
        <div class="bg-right">
          <div class="bg-inner" />
        </div>
      </div>
      <div class="block-cube block-input mb-5">
        <input type="text" class="form-input" placeholder="輸入密碼" />
        <div class="bg-top">
          <div class="bg-inner" />
        </div>
        <div class="bg-right">
          <div class="bg-inner" />
        </div>
      </div>
      <div class="block-cube block-input block-button mb-5">
        <input type="button" value="登入" class="w-100" />
        <div class="bg-top">
          <div class="bg-inner" />
        </div>
        <div class="bg-right">
          <div class="bg-inner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const User = reactive({
  UID: "",
  UPW: "",
});
</script>

<style lang="scss" scoped>
$main-color: #fff;
$border-color: #b6baba;
$button-color: rgb(4, 129, 183);
$button-hover-color: rgb(0, 91, 130);
.block-cube {
  position: relative;
}
.bg-top .bg-inner {
  bottom: 0;
}
.bg-top {
  position: absolute;
  height: 15px;
  bottom: 100%;
  left: 6px;
  right: -8px;
  transform: skew(-45deg, 0);
  margin: 0;
  background-color: $border-color;
}

.bg-right {
  position: absolute;
  top: -5px;
  z-index: 0;
  bottom: 5px;
  width: 15px;
  left: 100%;
  transform: skew(0, -45deg);
  background: $border-color;
}
.bg-right .bg-inner {
  left: 0;
}
.form-input {
  width: 100%;
  padding: 12px 16px;
  color: rgb(0, 0, 0);
  font-family: monospace, serif;
  letter-spacing: 0.05em;
  font-size: 16px;
  border: 0;
}
.form-input:hover,
.form-input:focus {
  border: 0px;
  outline: none;
}
.block-button {
  & > input {
    padding: 12px 16px;
    border: 0;
    font-weight: bolder;
    background-color: $button-color;
    color: #fff;
  }

  & > .bg-right,
  & > .bg-top {
    background-color: $button-color;
  }
  & > .bg-top {
    bottom: 102%;
  }
  & > .bg-right {
    left: 100.1%;
    top: -7px;
    bottom: 7px;
  }

  & > input:hover {
    background-color: $button-hover-color;

    & ~ .bg-top,
    & ~ .bg-right {
      background-color: $button-hover-color;
    }
  }
}
.form-input:hover ~ .bg-top,
.form-input:focus ~ .bg-top {
  background: rgb(105, 105, 105);
}
.form-input:focus ~ .bg-right,
.form-input:hover ~ .bg-right {
  bottom: 8px;
  background: rgb(105, 105, 105);
}
</style>