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
                <div class="aside-menu-label">{{ item.title }}</div>
                <ul class="aside-submenu">
                  <li
                    v-for="(child, i) in item.children"
                    :key="i"
                    :class="['aside-submenu-title', { 'active': $route.path === `/${child.path}` }]"
                    @click="$router.push({ path: '/' + child.path })"
                  >{{ child.title }}</li>
                </ul>
              </template>
              <div
                v-else
                :class="['aside-menu-title', { 'active': $route.path === `/${item.path}` }]"
              >{{ item.title }}</div>
            </li>
          </ul>
        </aside>
        <article>
          <Content>
            <router-view />
          </Content>
        </article>
        <div>
          <!-- <Simulator :src="simulator" /> -->
        </div>
        <!-- <div>slug</div> -->
      </section>
    </div>
  </div>
</template>

<script>
// import Simulator from './components/Simulator.vue'
import Content from './components/Content/index.vue'
import { config } from '@COMPONENTS/doc'
export default {
  components: {
    Content
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
// @import './common/style/highlight.scss';
// @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300&display=swap');
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
    // background: #fcfcfd;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
    z-index: 2;
  }
  & > section {
    width: 100%;
    // background: #f8f9fa;
    background: #fff;
    max-height: 100%;
    height: 100%;
    padding-top: 64px;
    box-sizing: border-box;
    & > aside {
      position: fixed;
      left: 0;
      top: 64px;
      width: 180px;
      // padding-top: 64px;
      background: #fff;
      border-right: 1px solid rgb(240, 240, 240);
      padding: 64px 15px 0;
      height: 100%;
      max-height: 100%;
      box-sizing: content-box;
    }
    & > article {
      padding-top: 64px;
      padding-left: 230px;
    }
  }
}

.aside {
  &-menu-label {
    padding: 8px 16px 12px 20px;
    // color: rgba(0, 0, 0, .45);
    color: #5c6d95;
    font-weight: 600;
    font-size: 15px;
    position: relative;
    // border-bottom: 1px solid #f0f0f0;
  }
  &-submenu-title {
    height: 40px;
    line-height: 40px;
    padding: 0 16px 0 40px;
    font-size: 14px;
    cursor: pointer;
    color: #a3aab3;
    transition: color .3s ease;
    border-radius: 6px;
    &.active {
      color: #5c6d95;
      background: #ebf3f9;
    }
    &:hover {
      color: #5c6d95;
      transition: color .3s ease;
    }
  }
}
</style>
