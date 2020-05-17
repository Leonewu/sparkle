#! /usr/bin/env node
// npm run new --name=button
// component.json 添加上组件名
// 新建组件的文件夹，添加对应的 scss，vue，README，demo

const glob = require('glob')
// eslint-disable-next-line no-unused-vars
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
// const childProcess = require('child_process')
// function renameFile(src) {

// }
glob('src/components/*', {}, function(er, files) {
  if (!process.argv[2]) {
    console.log(chalk.red('请输入组件名称，npm run create [component name]'))
  } else {
    const components = files.map(file => file.match(/(?<=src\/components\/)(.*)/)[0])
    const name = process.argv[2].toLowerCase()
    if (components.includes(name)) {
      console.log(chalk.red(`组件 ${name} 已存在`))
      return
    }
    try {
      // fs.mkdirSync(path.resolve(`../../src/components/${name}`))
      // fs.copyFileSync(path.resolve('./example'), path.resolve(`../../src/components/${name}`)))
      const src = path.resolve(__dirname, './example')
      const dest = path.resolve(__dirname, `../../src/components/${name}`)
      // childProcess.spawnSync('cp', ['-r', src, dest])
      fs.readdirSync(src).forEach(file => {
        const stat = fs.statSync(`${dest}/${file}`)
        console.log(stat.isFile())
      })
    } catch (e) {
      throw new Error(e)
    }
  }
  // 创建文件夹
  //   // files is an array of filenames.
  //   // If the `nonull` option is set, and nothing
  //   // was found, then files is ["**/*.js"]
  //   // er is an error object or null.
})
