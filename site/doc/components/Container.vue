<template>
  <div
    class="doc-container doc-row"
    :class="{ 'doc-container--with-simulator': hasSimulator }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DocContainer',

  props: {
    hasSimulator: Boolean
  }
}
</script>

<style lang="scss">
@import '../common/style/var';

.doc-container {
  box-sizing: border-box;
  padding-left: $doc-nav-width;
  overflow: hidden;

  &--with-simulator {
    padding-right: $doc-simulator-width + $doc-padding;
  }
}
</style>
