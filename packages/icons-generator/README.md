# 字体图标

## 基础知识

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

## 参考

- [HTML Symbols - w3cschools](https://www.w3schools.com/charsets/ref_html_symbols.asp)
