#! /usr/bin/env node
// npm run create button
// 复制组件模板
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const PREFIX = 'starry'

function replaceFile(dir, componentName) {
  // 读取文件目录并且替换文件内容，重命名
  fs.readdirSync(dir).forEach(file => {
    const filePath = `${dir}/${file}`
    const newPath = `${dir}/${file.replace('example', componentName)}`
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      const fd = fs.readFileSync(filePath)
      const content = replaceName(fd.toString(), componentName)
      fs.writeFileSync(filePath, content)
      fs.renameSync(filePath, newPath)
    } else if (stat.isDirectory()) {
      const subDir = path.resolve(dir, file)
      replaceFile(subDir, componentName)
    }
  })
}

function replaceName(str, componentName) {
  const capitaName = componentName.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('')
  if (!PREFIX) {
    str = str.replace(/(prefix-|prefix|Prefix)/g, '')
  }
  const capitalPrefix = PREFIX.replace(/^\S/, s => s.toUpperCase())
  return str
    // .replace(/xiao-example/g, `xiao-${componentName}`)
    // .replace(/XiaoExample/g, `Xiao${capitaName}`)
    // .replace(/(example)(\.vue|\.scss)/, `${componentName}$2`)
    .replace(/example/g, componentName)
    .replace(/Example/g, capitaName)
    .replace(/prefix/g, PREFIX.toLowerCase())
    .replace(/Prefix/g, capitalPrefix)
}

// main programe begin
const components = fs.readdirSync(path.resolve(__dirname, '../../src'))
if (!process.argv[2]) {
  console.log(chalk.red('请输入组件名称，npm run create [component name]'))
  process.exit()
}
const name = process.argv[2].toLowerCase()
if (components.includes(name)) {
  console.log(chalk.red(`目录 src/${name} 已存在`))
  process.exit()
}
const src = path.resolve(__dirname, './example')
const dest = path.resolve(__dirname, `../../src/${name}`)
fs.copySync(src, dest)
replaceFile(dest, name)
// end
const emoji = {
  rocket_x3: (String.fromCodePoint(0x1F680) + ' ').repeat(3),
  fire: String.fromCodePoint(0x1F525),
  point_left_x3: (String.fromCodePoint(0x1F448) + ' ').repeat(3),
  point_right_x3: (String.fromCodePoint(0x1F449) + ' ').repeat(3),
  warn_x3: (String.fromCodePoint(0x26A0) + ' ').repeat(3)
}
console.log(chalk.magenta(`${emoji.rocket_x3} 组件 ${name} 创建成功!`))
// │ └ ├ ─
console.log(chalk.cyan(
  'src\n' +
  `├── ${name}\n` +
  '├───└── index.vue\n' +
  '├───└── index.scss\n' +
  '├───└── README.md\n' +
  '├───└── demo\n' +
  '├───────└── index.vue\n' +
  '├───└── __test__\n' +
  '└───────└── index.spec.js\n'))
console.log(chalk.red(`${emoji.point_right_x3} 请在` + chalk.bgMagentaBright.black.italic(' components.config.js ') + `中手动添加组件配置! ${emoji.point_left_x3}`))
console.log(chalk.yellow(`${emoji.fire} Getting started with ` + chalk.magenta.italic('`npm run dev`')))
