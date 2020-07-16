
// path 为 src 下的目录名称
// 会用于编译时的组件查找
// 以及作为 site 的路由
module.exports = [
  {
    title: '基础组件',
    components: [
      {
        path: 'button',
        title: 'Button 按钮'
      },
      {
        path: 'select',
        title: 'Select 选择'
      },
      {
        path: 'card',
        title: 'card 卡片'
      }
    ]
  },
  {
    title: '表单组件',
    components: []
  }
]
