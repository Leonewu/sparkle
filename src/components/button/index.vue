<template>
  <div class="wrapper">
    button component
  </div>
</template>

<script>
// import './button.scss'
export default {
  name: 'XiaoButton',
  data() {
    return {}
  },
  async mounted() {
    await this.promise
  },
  methods: {
    c() {
      console.log(12)
    },
    promise() {
      return new Promise((resolve, reject) => {
        resolve(1)
      })
    }
  }
}
</script>
<style lang="scss">
.test {
  background: #ddd;
}
</style>
