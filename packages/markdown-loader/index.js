/**
 * 将 md 文件 转成 vue 文件
 * */
const markdown = require('markdown-it')
const hljs = require('highlight.js')
const fs = require('fs')
const path = require('path')
const wrapCard = require('./card')

function loader(src) {
  console.log(src)
  const file = fs.readFileSync(path.resolve(__dirname, './test.md'), 'utf-8')
  const md = markdown({
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value
      }
      return '' // use external default escaping
    }
  })
  const content = escape(wrapCard(md.render(file)))
  return `
    <template>
      <section v-html="content" v-once />
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
