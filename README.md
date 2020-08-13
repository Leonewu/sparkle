# 项目介绍

![vue](https://img.shields.io/badge/vue-2.x-4fc08d.svg?colorA=2c3e50&style=flat-square)
![node](https://img.shields.io/badge/node-%3E=12.16.3-4fc08d.svg?colorA=2c3e50&style=flat-square)

## 使用

### 引入

- 全量引入

```
import XiaoUI from 'xiao-ui'
import 'xiao-ui/lib/index.css'
Vue.use(XiaoUI)
```

- 按需引入，首先安装 babel 插件 `npm install -D babel-plugin-import`，配置 babel

```
"plugins": [
  [
    "import",
    {
      "libraryName": "xiao-ui",
      "libraryDirectory": "lib",
      "style": "css"
    }
  ]
]
```

```
import { Button } from 'xiao-ui'
Vue.use(Button)
// 或者
// Vue.component(Button.name, Button)
```

注意：不能同时使用全局引入和按需引入

## 开发注意事项

### 创建组件

- `npm run create` 创建组件目录，如 `npm run create button`
- 组件目录使用中划线命名方式如 `npm run create date-time-picker`
- 组件名不需要自动加前缀
- 创建组件目录后需在 `components.config.js` 中配置组件路径，否则将不会生成 site 的路由
- 注册的组件名不需要加前缀，编译的时候会自动补全前缀，但是必须以大写字母开头，如 name: "Button"

### 文档/demo编写

- 文档为组件目录下 README.md 文件
- demo 为组件目录下 demo 文件夹
— 文档和 demo 均支持使用项目中的组件，引用时可直接用组件注册的 name（必须以大写字母开头）

### 单元测试

## 脚本

- `npm run create [component]`: 创建组件，生成模板
- `npm run dev`: 启动开发环境服务
- `npm run build`: 打包
- `npm run build:site`: 打包文档网站
- `npm test`: 运行测试用例，此时 NODE_ENV 为 test

## 项目目录

`tree -I 'node_modules' -L 1`

```
.
├── README.md
├── guide.md
├── webpack.site.config.js (网站webpack配置)
├── components.config.js (组件配置文件)
├── jest.config.js (jest配置文件)
├── site-dist (文档网站打包目录)
├── site (文档网站)
├── mobile (移动端展示)
├── src (开发目录)
├── lib (打包commonJs目录)
├── es (打包esModule目录)
└── packages (编译脚本等)
```

## 组件目录

源目录

```
.
├── index.{vue,js,ts,jsx,tsx}
├── index.scss
├── README.md (组件文档)
├── demo (组件demo)
├── __test__ (测试目录)
```

打包目录

```
.
├── index.js
├── index.css
├── index.scss
└── style (管理css依赖)
    ├── css.js
    └── scss.js
```
