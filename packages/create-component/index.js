#! /usr/bin/env node
// npm run create button
// 把 example 的文件复制到组件目录，并修改内容
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')

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
  // 替换字符串
  const capitalizeName = componentName.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('')
  return str
    // .replace(/xiao-example/g, `xiao-${componentName}`)
    // .replace(/XiaoExample/g, `Xiao${capitalizeName}`)
    // .replace(/(example)(\.vue|\.scss)/, `${componentName}$2`)
    .replace(/example/g, componentName)
    .replace(/Example/g, capitalizeName)
}

// function updateComponentsJson() {
//   // 根据文件目录更新 components.json 文件
//   const filePath = path.resolve(__dirname, '../../src/components')
//   const components = fs.readdirSync(filePath)
//     .sort((a, b) =>
//       fs.statSync(filePath + '/' + a).birthtimeMs - fs.statSync(filePath + '/' + b).birthtimeMs)
//   const content = components.reduce((sum, cur, idx) => {
//     if (idx < components.length - 1) {
//       sum += `  "${cur}",\n`
//     } else {
//       sum += `  "${cur}"\n`
//     }
//     return sum
//   }, '')
//   fs.writeFileSync(path.resolve(__dirname, '../../components.json'), `[\n${content}]`)
// }

// main programe begin
const components = fs.readdirSync(path.resolve(__dirname, '../../src/components'))
if (!process.argv[2]) {
  console.log(chalk.red('请输入组件名称，npm run create [component name]'))
  process.exit()
}
const name = process.argv[2].toLowerCase()
if (components.includes(name)) {
  console.log(chalk.red(`组件 ${name} 已存在`))
  process.exit()
}
const src = path.resolve(__dirname, './example')
const dest = path.resolve(__dirname, `../../src/components/${name}`)
childProcess.spawnSync('cp', ['-r', src, dest])
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
  '├── src\n' +
  '├────└──components\n' +
  `├────────└── ${name}\n` +
  '├─────────────└── demo\n' +
  '├──────────────────└── index.vue\n' +
  '├─────────────└── __test__\n' +
  '├──────────────────└── index.spec.js\n' +
  `├─────────────└── ${name}.vue\n` +
  `├─────────────└── ${name}.scss\n` +
  '└─────────────└── index.js'))
console.log(chalk.red(`${emoji.point_right_x3} 请在` + chalk.bgMagentaBright.black.italic(' src/index.js ') + `中手动添加组件入口! ${emoji.point_left_x3}`))
console.log(chalk.yellow(`${emoji.fire} Getting started with ` + chalk.magenta.italic('`npm run dev`')))
console.log(chalk.yellow(`${emoji.fire} 移动端预览: http://127.0.0.1:2333/mobile.html/${name}`))
console.log(chalk.yellow(`${emoji.fire} 网站预览: http://127.0.0.1:2333/index.html/${name}`))
