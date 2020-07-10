<template>
  <div>
    测试嵌套引用
    <ppp />
  </div>
</template>

<script>
import ppp from '../../components3/test3'
export default {
  name: 'Tt',
  components: { ppp }
}
</script>

<style>
.tr {
  color: #ddd;
}
</style>
