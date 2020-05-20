import { mount } from '@vue/test-utils'
import example from '../example'

describe('example', () => {
  test('init example test', () => {
    const wrapper = mount(example)
    expect(wrapper.isEmpty()).toBe(true)
  })
})
