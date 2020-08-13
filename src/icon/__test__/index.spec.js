import { mount } from '@vue/test-utils'
import icon from '../index.vue'

describe('icon', () => {
  test('init icon test', () => {
    const wrapper = mount(icon)
    expect(wrapper.exists()).toBe(true)
  })
})
