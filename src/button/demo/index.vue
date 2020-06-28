<template>
  <div>
    <demo-block title="朴素按钮">
      <xiao-button />
    </demo-block>
    <demo-block title="幽灵按钮">
      <xiao-button />
    </demo-block>
    <demo-block title="禁用状态">
      <xiao-button />
    </demo-block>
  </div>
</template>

<script>
import xiaoButton from '../button.vue'
export default {
  components: {
    xiaoButton
  }
}
</script>
