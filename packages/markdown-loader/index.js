/**
 * 将 md 文件 转成 vue 文件
 * */
const markdown = require('markdown-it')
const { unescapeAll } = require('markdown-it/lib/common/utils')
const hljs = require('highlight.js')
const wrapCard = require('./card')
const md = markdown({
  typographer: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return ''
  }
})

const defaultRenderer = md.renderer.rules.fence

md.renderer.rules.fence = function(tokens, idx, options, env, slf) {
  const token = tokens[idx]
  const info = token.info ? unescapeAll(token.info).trim() : ''
  let lang = ''
  if (info) {
    lang = info.split(/\s+/g)[0]
  }
  if (lang === 'vue') {
    // 对 vue 的代码块不解析，交给后面的 vue-loader 解析
    return token.content
  }
  return defaultRenderer(tokens, idx, options, env, slf)
}

function loader(src) {
  // const content = escape(wrapCard(md.render(src)))
  const content = wrapCard(md.render(src))
  return `
    <template>
      <section v-once>
        ${content}
      </section>
    </template>

    <script>
    export default {
      created() {
        this.content = unescape(\`${content}\`);
      },

      mounted() {
        const anchors = [].slice.call(this.$el.querySelectorAll('h2, h3, h4, h5'));

        anchors.forEach(anchor => {
          anchor.addEventListener('click', this.scrollToAnchor);
        });
      },

      methods: {
        scrollToAnchor(event) {
          if (event.target.id) {
            this.$router.push({
              path: this.$route.path,
              hash: event.target.id
            })
          }
        }
      }
    };
    </script>`
}

module.exports = loader
