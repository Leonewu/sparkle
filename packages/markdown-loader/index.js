const markdown = require('markdown-it')
const fs = require('fs')
const path = require('path')

function loader(src) {
  console.log(src)
  const file = fs.readFileSync(path.resolve(__dirname, './test.md'), 'utf-8')
  const md = markdown({
    typographer: true
  })
  const content = md.render(file)
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
