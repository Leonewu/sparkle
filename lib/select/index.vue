<template>
  <div class="select-wrapper">
    select component
    <XiaoButton />
    <picker />
  </div>
</template>

<script>
// import './select.scss'
/*
  asdasd
*/
import XiaoButton from '../button/'
import picker from './picker'
export default {
  name: 'XiaoSelect',
  components: { XiaoButton, picker },
  data() {
    return {

    }
  }
}
</script>
