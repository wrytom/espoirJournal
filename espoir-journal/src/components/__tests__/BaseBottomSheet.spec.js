import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BottomSheet from '@/components/Base/BaseBottomSheet.vue'

vi.mock('gsap', () => ({
  default: {
    to: vi.fn((_, options) => {
      if (options.onComplete) options.onComplete()
    }),
    fromTo: vi.fn(),
  },
}))

describe('BottomSheet', () => {
  let wrapper

  const createWrapper = (props = {}) => {
    document.body.innerHTML = ''
    return mount(BottomSheet, {
      props: {
        modelValue: false,
        initialHeight: 80,
        ...props,
      },
      slots: {
        default: '<div>Test Content</div>',
      },
      attachTo: document.body,
    })
  }

  beforeEach(() => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('content', '#ffffff')
    document.head.appendChild(meta)

    wrapper = createWrapper()
  })

  it('renders correctly when closed', async () => {
    const container = document.querySelector('.bottom-sheet-container')
    expect(container).toBeTruthy()
    expect(container.style.display).toBe('none')
  })

  it('renders correctly when opened', async () => {
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const container = document.querySelector('.bottom-sheet-container')
    const content = container.querySelector('.content')

    expect(container.style.display).not.toBe('none')
    expect(content.textContent).toBe('Test Content')
  })

  it('applies correct initial height from props', async () => {
    await wrapper.setProps({ modelValue: true, initialHeight: 60 })
    await nextTick()

    const bottomSheet = document.querySelector('.bottom-sheet')
    expect(bottomSheet.style.height).toBe('60vh')
  })

  it('emits close event when clicking overlay', async () => {
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const container = document.querySelector('.bottom-sheet-container')
    await container.dispatchEvent(new Event('click'))
    await nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('updates theme color when opened and closed', async () => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(metaThemeColor.getAttribute('content')).toBe('#808080')

    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(metaThemeColor.getAttribute('content')).toBe('#ffffff')
  })

  it('handles animation when opening', async () => {
    const gsap = await import('gsap')
    await wrapper.setProps({ modelValue: true })

    expect(gsap.default.fromTo).toHaveBeenCalledWith(
      expect.anything(),
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.1,
        ease: 'power2.out',
      },
    )
  })

  it('handles animation when closing', async () => {
    const gsap = await import('gsap')
    await wrapper.setProps({ modelValue: true })
    await nextTick()

    const container = document.querySelector('.bottom-sheet-container')
    await container.dispatchEvent(new Event('click'))

    expect(gsap.default.to).toHaveBeenCalledWith(expect.anything(), {
      yPercent: 200,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: expect.any(Function),
    })
  })
})
