<template>
  <div class="app">
    <doc
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
    >
      <router-view />
    </doc>
  </div>
</template>

<script>
import Doc from './components/index.vue'
import { config } from '@COMPONENTS/doc'
export default {
  components: {
    Doc
  },

  data() {
    const path = location.pathname.replace(/\/index(\.html)?/, '/')

    return {
      // packageVersion,
      simulator: `${path}mobile.html${location.hash}`
    }
  },

  computed: {
    lang() {
      const { lang } = this.$route.meta
      return lang || ''
    },

    langConfigs() {
      return {

      }
    },

    config() {
      const basicComponents = config.find(s =>
        s.title === '基础组件' && s.components
      ).components
      return {
        title: 'Starry UI',
        description: 'Mobile UI Components built on Vue',
        logo: 'https://img.yzcdn.cn/vant/logo.png',
        links: [{ logo: 'https://b.yzcdn.cn/vant/logo/github.svg', url: 'https://gitlab.xinghuolive.com/web' }],
        searchConfig: { apiKey: '90067aecdaa2c85220e2783cd305caac', indexName: 'vant', placeholder: 'Search...' },
        nav: [
          // {
          //   title: '介绍',
          //   items: [{ path: 'home', title: '主页' },
          //     { path: 'quickstart', title: '快速上手' },
          //     { path: 'changelog', title: '更新日志' },
          //     { path: 'theme', title: '定制主题' }
          //   ]
          // },
          {
            title: '基础组件',
            items: basicComponents
          }]
      }
    },

    versions() {
      return null
    }
  }

}
</script>

<style lang="scss">
@import './common/style/base.scss';
@import './common/style/highlight.scss';

.doc-intro {
  padding-top: 20px;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}
</style>
