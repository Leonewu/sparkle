<template>
  <input
    class="doc-search"
    :placeholder="placeholder"
  >
</template>

<script>
export default {
  name: 'DocSearch',

  props: {
    lang: String,
    searchConfig: Object
  },

  computed: {
    placeholder() {
      return this.searchConfig.placeholder || 'Search...'
    }
  },

  watch: {
    lang(lang) {
      if (this.docsearchInstance) {
        this.docsearchInstance.algoliaOptions.facetFilters = [`lang:${lang}`]
      }
    }
  },

  mounted() {
    if (this.searchConfig) {
      this.docsearchInstance = window.docsearch({
        ...this.searchConfig,
        inputSelector: '.doc-search',
        algoliaOptions: {
          facetFilters: [`lang:${this.lang}`]
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../common/style/var';

.doc-search {
  width: 200px;
  height: 60px;
  margin-left: 140px;
  color: #fff;
  font-size: 14px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #fff;
    opacity: 0.7;
  }
}

.ds-dropdown-menu {
  line-height: 1.8;
}

.algolia-autocomplete {
  .algolia-docsearch-suggestion--highlight {
    color: $doc-blue;
    background-color: transparent;
  }

  .algolia-docsearch-suggestion--title {
    font-weight: 500;
  }

  .algolia-docsearch-suggestion--text {
    .algolia-docsearch-suggestion--highlight {
      box-shadow: inset 0 -1px 0 0 $doc-blue;
    }
  }

  .algolia-docsearch-suggestion--category-header {
    border-bottom-color: #eee;
  }

  .ds-dropdown-menu [class^='ds-dataset-'] {
    border: none;
  }

  .ds-dropdown-menu {
    top: 80% !important;
    box-shadow: 0 4px 12px #ebedf0;

    &::before {
      display: none;
    }
  }
}
</style>
