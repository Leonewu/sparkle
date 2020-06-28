import { mount } from '@vue/test-utils'
import card from '../card'

describe('card', () => {
  test('init card test', () => {
    const wrapper = mount(card)
    expect(wrapper.exists()).toBe(true)
  })
})
