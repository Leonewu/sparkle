import { mount } from '@vue/test-utils'
import example from '../index.vue'

describe('example', () => {
  test('init example test', () => {
    const wrapper = mount(example)
    expect(wrapper.exists()).toBe(true)
  })
})
