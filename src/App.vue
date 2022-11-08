<template>
  <router-view />
  <div id="modal"></div>
</template>
<style lang="scss">
$main-bg: #f0f0f0;
* {
  box-sizing: border-box;
  font-family: "微軟正黑體";
}
#app {
  min-height: 100%;
  background-color: $main-bg;
}
.btn-info-dark {
  background-color: #138496 !important;
  border-color: #117a8b !important;

  &:hover {
    background-color: #0b5e6b !important;
    border-color: #0b5e6b !important;
  }
}
</style>
