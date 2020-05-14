<template>
  <div>
    <demo-nav />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import DemoNav from './components/DemoNav'

export default {
  components: { DemoNav }
}
</script>

<style lang="scss">
@import './common/style/var.scss';
@import './common/style/base.scss';

body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
