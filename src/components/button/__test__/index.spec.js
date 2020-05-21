import { mount } from '@vue/test-utils'
import Button from '../button'

describe('Button', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Button)
    expect(wrapper.exists()).toBe(true)
  })
})
