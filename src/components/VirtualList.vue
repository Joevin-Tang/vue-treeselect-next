<script>
  import Option from './Option'

  /**
   * 虚拟滚动列表组件
   * 用于优化大数据量树形选择器的渲染性能
   * 只渲染可视区域内的节点
   */
  export default {
    name: 'vue-treeselect--virtual-list',
    inject: [ 'instance' ],

    components: {
      Option,
    },

    props: {
      itemHeight: {
        type: Number,
        default: 40, // 每个选项的高度（px）
      },
      bufferSize: {
        type: Number,
        default: 5, // 上下缓冲区数量
      },
    },

    data() {
      return {
        scrollTop: 0,
        containerHeight: 0,
        isMounted: false,
      }
    },

    computed: {
      // 获取所有可见的选项ID列表（扣平化）
      flattenedItems() {
        const { instance } = this
        const items = []

        const addNodeAndChildren = (node, level = 0) => {
          if (!instance.shouldShowOptionInMenu(node)) {
            return
          }

          items.push({
            id: node.id,
            node,
            level,
          })

          // 如果节点展开且是分支节点，递归添加子节点
          if (node.isBranch && instance.shouldExpand(node)) {
            // 确保 children 是数组且有内容
            if (Array.isArray(node.children) && node.children.length > 0) {
              node.children.forEach(child => {
                addNodeAndChildren(child, level + 1)
              })
            }
          }
        }

        instance.forest.normalizedOptions.forEach(rootNode => {
          addNodeAndChildren(rootNode, 0)
        })

        return items
      },

      // 总高度
      totalHeight() {
        return this.flattenedItems.length * this.itemHeight
      },

      // 可视区域能容纳的数量
      visibleCount() {
        if (!this.isMounted || !this.containerHeight) {
          // 初始默认值
          return Math.ceil((this.instance.maxHeight || 300) / this.itemHeight)
        }
        return Math.ceil(this.containerHeight / this.itemHeight)
      },

      // 开始索引
      startIndex() {
        const index = Math.floor(this.scrollTop / this.itemHeight) - this.bufferSize
        return Math.max(0, index)
      },

      // 结束索引
      endIndex() {
        const index = this.startIndex + this.visibleCount + this.bufferSize * 2
        return Math.min(this.flattenedItems.length, index)
      },

      // 可见的项目列表
      visibleItems() {
        return this.flattenedItems.slice(this.startIndex, this.endIndex)
      },

      // 偏移量
      offsetY() {
        return this.startIndex * this.itemHeight
      },
    },

    mounted() {
      this.$nextTick(() => {
        this.isMounted = true
        this.updateContainerHeight()
        // 监听容器大小变化
        if (typeof ResizeObserver !== 'undefined') {
          this.resizeObserver = new ResizeObserver(this.updateContainerHeight)
          this.resizeObserver.observe(this.$refs.container)
        }
      })
    },

    beforeDestroy() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
      }
    },

    methods: {
      handleScroll(event) {
        this.scrollTop = event.target.scrollTop
      },

      updateContainerHeight() {
        if (this.$refs.container) {
          const newHeight = this.$refs.container.clientHeight
          if (newHeight !== this.containerHeight) {
            this.containerHeight = newHeight
          }
        }
      },

      renderOption(item) {
        const { node, level } = item
        const { instance } = this

        // 在虚拟滚动模式下，使用我们计算的 level，而不是 node.level
        // 因为我们已经将树展开成了扁平列表
        const indentLevel = instance.flat ? 0 : level
        const listItemClass = [
          'vue-treeselect__list-item',
          `vue-treeselect__indent-level-${indentLevel}`,
        ]

        return (
          <div class={listItemClass} key={node.id}>
            <Option node={node} />
          </div>
        )
      },
    },

    render() {
      const { instance } = this
      return (
        <div class="vue-treeselect__list">
          <div
            ref="container"
            class="vue-treeselect__virtual-list-container"
            onScroll={this.handleScroll}
            style={{
              maxHeight: instance.maxHeight + 'px',
            }}
          >
            <div
              class="vue-treeselect__virtual-list-spacer"
              style={{ height: `${this.totalHeight}px` }}
            >
              <div
                class="vue-treeselect__virtual-list-items"
                style={{ transform: `translateY(${this.offsetY}px)` }}
              >
                {this.visibleItems.map(item => this.renderOption(item))}
              </div>
            </div>
          </div>
        </div>
      )
    },
  }
</script>

<style>
/* 虚拟滚动容器处理所有的滚动 */
.vue-treeselect__virtual-list-container {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.vue-treeselect__virtual-list-spacer {
  position: relative;
}

.vue-treeselect__virtual-list-items {
  will-change: transform;
}
</style>
