# Web Font

## iconfont

iconfont 指的是引入字体图标库，在页面上使用 unicode 字符显示对应的图标

### html，css，js对 unicode 字符的处理

这里以 [Ant Design 官方图标库](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=9402) 的 `heart` 图标为例，16进制 unicode 为 `&#xe7df;`  
`&#xe7df;` 中10进制为 `59359`，16进制为 `e7df`  

#### html

html 有两种处理:

- '&# + 10进制的 unicode 编码 + 英文分号;'
- '&#x + 16进制的 unicode 编码 + 英文分号;'

```html
<!-- 两种都能生效 -->
<!-- 前提是要设置对应的 font-family -->
<!-- 这里只是举例，不提供 font-family -->
<span>&#xe7df;</span>
<span>&#59359;</span>
```

#### css

css 使用的是'\ + 16进制的 unicode 编码'

```css
.icon-heart::after {
  content: '\e7df'
}
```

#### js

js 使用的是 '\u + 16进制的 unicode 编码'

```js
console.log('\ue7df')
```

### 字体格式

可以通过本地，线上的 url，base64 引入字体图标库

- ttf
- woff
- woff2

### 注意

- woff 比 ttf 小 30%, woff2 比 woff 小 40%，但是 woff2 的兼容性比较差
- @font-face base64 的方式只能选一种文件格式，但是会降低首屏加载速度，同时体积也比源文件大[转换工具](https://transfonter.org/)
- 使用 cdn 方式引入，加载字体文件的过程中会有 FOIT 或 FOUT 的阶段，另外部分浏览器能做到按需加载
- FOIT 是指加载字体过程中的会出现空白的行为，加载前后页面会抖动，FOUT 是指加载字体过程中会先加载默认字体的行为

## inline svg

每个 svg 都使用单独的文件

## svg sprite

就是将多个 svg 文件通过 `<symbol>` 合并到一个文件中，再通过 `<use>` 使用

```html
// 定义 symbol
<svg>
  <symbol id="icon-arrow-left" viewBox="0 0 1024 1024">
    <path d="M694 ... 44.576-45.952"></path>
  </symbol>
  <symbol id="icon-arrow-right" viewBox="0 0 1024 1024">
    <path d="M693 ... 0-0.48-46.4"></path>
  </symbol>
</svg>

// 使用
<svg><use xlink:href="#icon-arrow-left"/></svg>
<svg><use xlink:href="#icon-arrow-right"/></svg>
```

## TODO

- [] travis ci 提交生成 icon
- [] 补全文档，iconfont，inline svg，svg sprite 的例子

## 参考

- [HTML Symbols - w3cschools](https://www.w3schools.com/charsets/ref_html_symbols.asp)
- [Web 字体简介: TTF, OTF, WOFF, EOT & SVG](https://zhuanlan.zhihu.com/p/28179203)
- [CSS @font-face性能优化](https://juejin.im/post/6844903790580072462#heading-6)
- [SVG vs Image, SVG vs Iconfont](https://aotu.io/notes/2018/11/23/SVG_vs_Image_vs_iconfont/index.html)
- [SVG 图标制作指南](https://zhuanlan.zhihu.com/p/20753791?spm=a313x.7781069.1998910419.35&refer=FrontendMagazine)
- [Seriously, Don’t Use Icon Fonts](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/)
