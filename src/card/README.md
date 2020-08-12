# Card

### 引入

```js
import Vue from 'vue';
import { Card } from 'vant';
Vue.use(Card);
```

## 代码演示

### ***这里写代码片段的标题***

***这里写代码片段的描述***

```html
<xiao-card></xiao-card>
```

## 同时也支持 vue 语法

### 

```vue
<p v-for="i in [1,2]">支持引用组件库内的组件作为展示用</p>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `info` | _string_ | `default` |

### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 事件描述 | _event: Event_      |
