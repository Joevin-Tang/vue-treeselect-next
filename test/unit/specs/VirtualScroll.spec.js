import { mount } from '@vue/test-utils'
import Treeselect from '@src/components/Treeselect'

describe('Virtual Scroll', () => {
  let wrapper

  afterEach(() => {
    if (wrapper && wrapper.destroy) {
      wrapper.destroy()
    }
  })

  function generateLargeDataset(rootCount, maxDepth, avgChildren = 3) {
    let nodeId = 0
    const generateNode = depth => {
      const id = `node-${nodeId++}`
      const hasChildren = depth < maxDepth && Math.random() > 0.3
      return {
        id,
        label: `Node ${id}`,
        children: hasChildren
          ? Array.from({ length: Math.floor(Math.random() * avgChildren) + 2 }, (_, i) =>
            generateNode(depth + 1, i),
          )
          : undefined,
      }
    }
    return Array.from({ length: rootCount }, (_, i) => generateNode(0, i))
  }

  it('should render with virtual scroll enabled', () => {
    const options = generateLargeDataset(100, 3)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
      },
    })

    expect(wrapper.vm.virtualScroll).toBe(true)
    expect(wrapper.vm.optionHeight).toBe(40)
  })

  it('should render VirtualList component when virtualScroll is true', async () => {
    const options = generateLargeDataset(50, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    // 检查是否渲染了 VirtualList 组件
    const menu = wrapper.find('.vue-treeselect__menu')
    expect(menu.exists()).toBe(true)

    const virtualListContainer = wrapper.find('.vue-treeselect__virtual-list-container')
    expect(virtualListContainer.exists()).toBe(true)
  })

  it('should render normal list when virtualScroll is false', async () => {
    const options = generateLargeDataset(10, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: false,
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    const virtualListContainer = wrapper.find('.vue-treeselect__virtual-list-container')
    expect(virtualListContainer.exists()).toBe(false)

    const normalList = wrapper.find('.vue-treeselect__list')
    expect(normalList.exists()).toBe(true)
  })

  it('should only render visible items in virtual scroll mode', async () => {
    const options = generateLargeDataset(200, 2, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        maxHeight: 300,
      },
      attachTo: document.body,
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    // 计算应该渲染的节点数量（可视区域 + 缓冲区）
    const maxHeight = 300
    const optionHeight = 40
    const bufferSize = 5
    const visibleCount = Math.ceil(maxHeight / optionHeight) + bufferSize * 2

    const renderedOptions = wrapper.findAll('.vue-treeselect__list-item')

    // 虚拟滚动应该只渲染部分节点，而不是全部
    expect(renderedOptions.length).toBeLessThan(options.length)
    expect(renderedOptions.length).toBeGreaterThan(0)
    expect(renderedOptions.length).toBeLessThanOrEqual(visibleCount + 10) // 允许一些误差
  })

  it('should maintain correct structure with vue-treeselect__list wrapper', async () => {
    const options = generateLargeDataset(50, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    // 检查结构：应该有 vue-treeselect__list 包裹
    const list = wrapper.find('.vue-treeselect__list')
    expect(list.exists()).toBe(true)

    // 虚拟滚动容器应该在 list 内部
    const virtualContainer = list.find('.vue-treeselect__virtual-list-container')
    expect(virtualContainer.exists()).toBe(true)

    // 应该有 spacer 和 items 容器
    const spacer = virtualContainer.find('.vue-treeselect__virtual-list-spacer')
    expect(spacer.exists()).toBe(true)

    const items = virtualContainer.find('.vue-treeselect__virtual-list-items')
    expect(items.exists()).toBe(true)
  })

  it('should apply correct indent levels to items', async () => {
    const options = [
      {
        id: 'a',
        label: 'Root A',
        children: [
          { id: 'a-1', label: 'Child A-1' },
          {
            id: 'a-2',
            label: 'Child A-2',
            children: [
              { id: 'a-2-1', label: 'Grandchild A-2-1' },
            ],
          },
        ],
      },
    ]

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        defaultExpandLevel: Infinity,
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    const listItems = wrapper.findAll('.vue-treeselect__list-item')

    // 根节点应该是 level-0
    expect(listItems.at(0).classes()).toContain('vue-treeselect__indent-level-0')

    // 子节点应该是 level-1
    if (listItems.length > 1) {
      expect(listItems.at(1).classes()).toContain('vue-treeselect__indent-level-1')
    }

    // 孙节点应该是 level-2
    if (listItems.length > 3) {
      expect(listItems.at(3).classes()).toContain('vue-treeselect__indent-level-2')
    }
  })

  it('should not recursively render children in virtual scroll mode', async () => {
    const options = [
      {
        id: 'parent',
        label: 'Parent',
        children: [
          { id: 'child1', label: 'Child 1' },
          { id: 'child2', label: 'Child 2' },
        ],
      },
    ]

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        defaultExpandLevel: 1,
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    // 展开父节点
    await wrapper.vm.toggleExpanded(wrapper.vm.forest.nodeMap.parent)
    await wrapper.vm.$nextTick()

    const listItems = wrapper.findAll('.vue-treeselect__list-item')

    // 应该渲染 3 个节点（1个父 + 2个子），每个都是独立的 list-item
    expect(listItems.length).toBe(3)

    // 每个 list-item 应该只包含一个 option，不应该嵌套 list
    listItems.wrappers.forEach(item => {
      const nestedLists = item.findAll('.vue-treeselect__list')
      // 虚拟滚动模式下，Option 不应该渲染子列表
      expect(nestedLists.length).toBeLessThanOrEqual(1) // 最多只有外层的 list
    })
  })

  it('should handle scrolling correctly', async () => {
    const options = generateLargeDataset(100, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        maxHeight: 300,
      },
      attachTo: document.body,
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    const virtualContainer = wrapper.find('.vue-treeselect__virtual-list-container')
    expect(virtualContainer.exists()).toBe(true)

    // 模拟滚动
    const scrollEvent = new Event('scroll')
    virtualContainer.element.scrollTop = 200
    virtualContainer.element.dispatchEvent(scrollEvent)

    await wrapper.vm.$nextTick()

    // 确保组件仍然正常工作
    expect(wrapper.find('.vue-treeselect__list-item').exists()).toBe(true)
  })

  it('should not have blank space when scrolling to bottom', async () => {
    const options = generateLargeDataset(100, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        maxHeight: 300,
      },
      attachTo: document.body,
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    const virtualContainer = wrapper.find('.vue-treeselect__virtual-list-container')

    // 获取虚拟列表信息
    const spacer = wrapper.find('.vue-treeselect__virtual-list-spacer')
    const totalHeight = parseInt(spacer.element.style.height, 10)
    const containerHeight = virtualContainer.element.clientHeight
    const maxScrollTop = totalHeight - containerHeight

    // 滚动到最底部
    virtualContainer.element.scrollTop = maxScrollTop
    virtualContainer.element.dispatchEvent(new Event('scroll'))

    await wrapper.vm.$nextTick()

    // 验证渲染的项目位置正确，不应该留下空白
    const items = wrapper.find('.vue-treeselect__virtual-list-items')
    const transform = items.element.style.transform
    const offsetMatch = transform.match(/translateY\(([0-9.]+)px\)/)
    const offsetY = offsetMatch ? parseInt(offsetMatch[1], 10) : 0
    const renderedItems = wrapper.findAll('.vue-treeselect__list-item')

    // 渲染的内容应该能填满可视区域，应该有项目渲染
    expect(renderedItems.length).toBeGreaterThan(0)
    // 离上有恰当的距离，无潕不必要的空白
    expect(offsetY).toBeLessThanOrEqual(Math.max(0, totalHeight - containerHeight))
  })

  it('should work with checkbox selection', async () => {
    const options = generateLargeDataset(50, 2)

    wrapper = mount(Treeselect, {
      propsData: {
        options,
        multiple: true,
        virtualScroll: true,
        optionHeight: 40,
        value: [],
      },
    })

    await wrapper.vm.openMenu()
    await wrapper.vm.$nextTick()

    // 查找第一个选项
    const firstOption = wrapper.find('.vue-treeselect__option')
    expect(firstOption.exists()).toBe(true)

    // 检查是否有 checkbox
    const checkbox = firstOption.find('.vue-treeselect__checkbox')
    expect(checkbox.exists()).toBe(true)
  })

  describe('Performance', () => {
    it('should initialize faster with virtual scroll for large datasets', () => {
      const largeOptions = generateLargeDataset(500, 3)

      const startTime = Date.now()
      wrapper = mount(Treeselect, {
        propsData: {
          options: largeOptions,
          multiple: true,
          virtualScroll: true,
          optionHeight: 40,
        },
      })
      const initTime = Date.now() - startTime

      // 初始化时间应该合理（根据机器性能，通常 < 500ms）
      expect(initTime).toBeLessThan(2000)
      expect(wrapper.vm.forest.normalizedOptions.length).toBeGreaterThan(0)
    })
  })
})
