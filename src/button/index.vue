<template>
  <div class="wrapper">
    button component test
  </div>
</template>

<script>
// import './button.scss'
import { add } from '../utils/'
export default {
  name: 'Button',
  data() {
    return {}
  },
  async mounted() {
    await this.promise
  },
  methods: {
    c() {
      console.log(12)
      add()
    },
    promise() {
      return new Promise((resolve, reject) => {
        resolve(1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.test {
  background: #ddd;
}
</style>
