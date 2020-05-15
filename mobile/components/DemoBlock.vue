<template>
  <div class="doc-demo-block">
    <h2 class="doc-demo-block__title">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DemoBlock',

  props: {
    title: String
  }
}
</script>

<style lang="scss">
@import '../common/style/var';

.doc-demo-block {
  &__title {
    margin: 0;
    padding: 32px 16px 16px;
    color: $doc-text-light-blue;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }

  &:first-of-type {
    .doc-demo-block__title {
      padding-top: 20px;
    }
  }
}
</style>
