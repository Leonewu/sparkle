<template>
  <div class="app">
    <!-- <doc
      :lang="lang"
      :config="config"
      :versions="versions"
      :simulator="simulator"
    > -->
    <!-- <router-view /> -->
    <!-- </doc> -->

    <div class="doc">
      <header>导航栏</header>
      <section>
        <aside>
          <ul class="aside-menu">
            <li v-for="(item, index) in config.nav" :key="index">
              <template v-if="item.children && item.children.length">
                <div>{{ item.title }}</div>
                <ul class="aside-submenu">
                  <li v-for="(child, i) in item.children" :key="i">
                    {{ child.title }}
                  </li>
                </ul>
              </template>
              <template v-else>
                <div>{{ item.title }}</div>
              </template>
            </li>
          </ul>
        </aside>
        <article>
          <router-view />
        </article>
        <div>
          <Simulator :src="simulator" />
        </div>
        <!-- <div>slug</div> -->
      </section>
    </div>
  </div>
</template>

<script>
import Simulator from './components/Simulator.vue'
import { config } from '@COMPONENTS/doc'
export default {
  components: {
    Simulator
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
            children: basicComponents
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

html, body {
  min-height: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  height: 100%;
}

.doc-intro {
  padding-top: 20px;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-align: center;

  p {
    margin-bottom: 20px;
  }
}

.doc {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  & > header {
    width: 100%;
    height: 64px;
    background: #fcfcfd;
    border-bottom: 1px solid #e9e9ea;
    padding: 20px;
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
  }
  & > section {
    width: 100%;
    // background: #f8f9fa;
    background: #fff;
    max-height: calc(100% - 66px);
    height: calc(100% - 66px);
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    & > aside {
      width: 180px;
      padding-top: 64px;
      background: #fff;
      border-right: 1px solid rgb(240, 240, 240);
    }
  }
}
</style>
