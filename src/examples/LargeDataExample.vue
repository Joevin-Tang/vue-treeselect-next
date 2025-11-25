<template>
  <div class="large-data-example">
    <h2>大数据量优化示例（1-2万条数据）</h2>

    <div class="config-panel">
      <h3>配置选项：</h3>
      <label>
        <input type="checkbox" v-model="useVirtualScroll">
        启用虚拟滚动（推荐用于 >1000 条数据）
      </label>
      <label>
        <input type="checkbox" v-model="flattenSearch">
        扁平化搜索结果
      </label>
      <label>
        <input type="checkbox" v-model="disableFuzzy">
        禁用模糊搜索
      </label>
    </div>

    <div class="demo-section">
      <h3>优化后的 Treeselect：</h3>
      <treeselect
        v-model="value"
        :options="options"
        :multiple="true"
        :virtual-scroll="useVirtualScroll"
        :flatten-search-results="flattenSearch"
        :disable-fuzzy-matching="disableFuzzy"
        :default-expand-level="0"
        :cache-options="true"
        :show-count="false"
        :option-height="40"
        placeholder="选择选项（支持搜索）..."
        @open="onOpen"
        @close="onClose"
        @search-change="onSearchChange"
        />

      <div class="info">
        <p>已选择: {{ value ? value.length : 0 }} 项</p>
        <p>总数据量: {{ totalCount }} 条</p>
        <p>当前模式: {{ useVirtualScroll ? '虚拟滚动' : '普通渲染' }}</p>
      </div>
    </div>

    <div class="tips">
      <h3>性能优化提示：</h3>
      <ul>
        <li>✅ 使用 <code>virtual-scroll</code> 开启虚拟滚动（1万+数据必备）</li>
        <li>✅ 设置 <code>default-expand-level="0"</code> 避免初始展开</li>
        <li>✅ 启用 <code>flatten-search-results</code> 简化搜索结果</li>
        <li>✅ 设置 <code>show-count="false"</code> 减少计数计算</li>
        <li>✅ 启用 <code>cache-options</code> 缓存搜索结果</li>
        <li>✅ 使用 <code>disable-fuzzy-matching</code> 提升搜索速度（如果不需要模糊匹配）</li>
        <li>✅ 搜索输入已自动添加 300ms 防抖</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Treeselect from '../components/Treeselect.vue'

  export default {
    name: 'LargeDataExample',
    components: { Treeselect },

    data() {
      return {
        value: [],
        options: [],
        useVirtualScroll: true,
        flattenSearch: true,
        disableFuzzy: false,
        totalCount: 0,
      }
    },

    created() {
      // 生成大量测试数据
      this.options = this.generateLargeDataset(2000, 5) // 2000个根节点，每个最多5层
    },

    methods: {
      /**
       * 生成大量树形数据用于测试
       * @param {number} rootCount - 根节点数量
       * @param {number} maxDepth - 最大深度
       */
      generateLargeDataset(rootCount, maxDepth) {
        let id = 0
        this.totalCount = 0

        const generateNode = (parentId, depth, index) => {
          this.totalCount++
          const nodeId = `node-${id++}`
          const hasChildren = depth < maxDepth && Math.random() > 0.3

          return {
            id: nodeId,
            label: `${parentId ? parentId + ' > ' : ''}节点 ${index + 1}`,
            children: hasChildren
              ? Array.from(
                { length: Math.floor(Math.random() * 8) + 2 },
                (_, i) => generateNode(nodeId, depth + 1, i),
              )
              : undefined,
          }
        }

        return Array.from({ length: rootCount }, (_, i) =>
          generateNode(null, 0, i),
        )
      },

      onOpen() {
        // eslint-disable-next-line no-console
        console.log('菜单打开')
      },

      onClose() {
        // eslint-disable-next-line no-console
        console.log('菜单关闭')
      },

      onSearchChange(query) {
        // eslint-disable-next-line no-console
        console.log('搜索查询:', query)
      },
    },
  }
</script>

<style scoped>
.large-data-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.config-panel {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.config-panel label {
  display: block;
  margin: 8px 0;
  cursor: pointer;
}

.config-panel input[type="checkbox"] {
  margin-right: 8px;
}

.demo-section {
  margin: 20px 0;
}

.info {
  margin-top: 15px;
  padding: 10px;
  background: #e8f4f8;
  border-radius: 4px;
}

.info p {
  margin: 5px 0;
  font-size: 14px;
}

.tips {
  background: #fffbe6;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #faad14;
}

.tips h3 {
  margin-top: 0;
  color: #d48806;
}

.tips ul {
  margin: 10px 0;
  padding-left: 20px;
}

.tips li {
  margin: 8px 0;
  line-height: 1.6;
}

.tips code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  color: #c41d7f;
}

h2 {
  color: #1890ff;
}

h3 {
  color: #595959;
  font-size: 16px;
}
</style>
