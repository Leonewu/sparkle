<template>
  <div>
    测试嵌套引用
    <trr />
  </div>
</template>

<script>
import trr from './components2/test2.vue'
export default {
  name: 'Tt',
  components: { trr }
}
</script>

<style>
.tr {
  color: #000;
}
</style>
