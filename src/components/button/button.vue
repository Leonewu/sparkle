<template>
  <div
    v-if="sd"
    class="wrapper"
    style=""
    name=""
  >
    button component
  </div>
</template>

<script>
import './button.scss'
export default {
  name: 'XiaoButton',
  data() {
    return {}
  },
  methods: {
    c() {
      console.log(12)
    }
  }
}
</script>

<style></style>
