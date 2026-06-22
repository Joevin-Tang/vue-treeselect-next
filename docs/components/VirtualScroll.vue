<template>
  <div class="virtual-scroll-demo">
    <div class="demo-panel">
      <treeselect
        v-model="value"
        :options="options"
        :multiple="multiple"
        :virtual-scroll="virtualScroll"
        :option-height="optionHeight"
        :max-height="maxHeight"
        :default-expand-level="defaultExpandLevel"
        :flatten-search-results="flattenSearchResults"
        :cache-options="cacheOptions"
        :disable-fuzzy-matching="disableFuzzyMatching"
        :searchable="searchable"
        :show-count="showCount"
        :always-open="alwaysOpen"
        placeholder="Select options..."
        />
    </div>

    <treeselect-value :value="value" />

    <div class="config-section">
      <h4>⚙️ Virtual Scroll Configuration</h4>
      <p>
        <label>
          <input type="checkbox" v-model="virtualScroll">
          <strong>Enable Virtual Scroll</strong>
          <span class="hint">(Required for large datasets >1000 items)</span>
        </label>
      </p>

      <p v-if="virtualScroll">
        <label>
          <span>Option Height:</span>
          <input
            type="range"
            v-model.number="optionHeight"
            min="24"
            max="56"
            step="2"
            >
          <strong>{{ optionHeight }}px</strong>
          <span class="hint">(Must match actual CSS height)</span>
        </label>
      </p>

      <p v-if="virtualScroll">
        <label>
          <span>Max Height:</span>
          <input
            type="range"
            v-model.number="maxHeight"
            min="200"
            max="600"
            step="50"
            >
          <strong>{{ maxHeight }}px</strong>
        </label>
      </p>

      <p>
        <label>
          <span>Default Expand Level:</span>
          <input
            type="range"
            v-model.number="defaultExpandLevel"
            min="0"
            max="3"
            step="1"
            >
          <strong>{{ defaultExpandLevel }}</strong>
          <span class="hint">(Set to 0 for better performance)</span>
        </label>
      </p>

      <h4>🔍 Search & Performance Options</h4>
      <p>
        <label><input type="checkbox" v-model="flattenSearchResults">Flatten Search Results</label>
        <label><input type="checkbox" v-model="cacheOptions">Cache Options</label>
        <label><input type="checkbox" v-model="disableFuzzyMatching">Disable Fuzzy Matching</label>
      </p>

      <h4>🎨 General Options</h4>
      <p>
        <label><input type="checkbox" v-model="multiple">Multi-select</label>
        <label><input type="checkbox" v-model="searchable">Searchable</label>
        <label><input type="checkbox" v-model="showCount">Show Count</label>
        <label><input type="checkbox" v-model="alwaysOpen">Always Open</label>
      </p>

      <div class="stats">
        <p><strong>Total Items:</strong> {{ totalCount }}</p>
        <p><strong>Mode:</strong> {{ virtualScroll ? '✅ Virtual Scroll' : '❌ Normal Render' }}</p>
        <p><strong>Selected:</strong> {{ Array.isArray(value) ? value.length : (value ? 1 : 0) }} items</p>
      </div>
    </div>

    <div class="tips-section">
      <h4>💡 Tips for Virtual Scroll</h4>
      <ul>
        <li><code>option-height</code> must match the actual CSS height of each option</li>
        <li>Set <code>default-expand-level="0"</code> for large datasets to improve initial performance</li>
        <li>Enable <code>flatten-search-results</code> to simplify search result rendering</li>
        <li>Use <code>cache-options</code> to cache search results and improve search performance</li>
        <li>Consider <code>disable-fuzzy-matching</code> for faster exact-match searching</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        multiple: true,
        virtualScroll: true,
        optionHeight: 32,
        maxHeight: 300,
        defaultExpandLevel: 0,
        flattenSearchResults: true,
        cacheOptions: true,
        disableFuzzyMatching: false,
        searchable: true,
        showCount: false,
        alwaysOpen: true,
        options: [],
        totalCount: 0,
      }
    },

    watch: {
      multiple(newValue) {
        if (newValue) {
          this.value = this.value ? [ this.value ] : []
        } else {
          this.value = Array.isArray(this.value) ? this.value[0] : this.value
        }
      },
    },

    created() {
      this.options = this.generateLargeDataset(500, 4)
    },

    methods: {
      /**
       * Generate large dataset for testing virtual scroll
       * @param {number} rootCount - Number of root nodes
       * @param {number} maxDepth - Maximum depth of the tree
       */
      generateLargeDataset(rootCount, maxDepth) {
        let nodeId = 0
        this.totalCount = 0

        const generateNode = (parentId, depth, index) => {
          this.totalCount++
          const id = `node-${nodeId++}`
          const hasChildren = depth < maxDepth && Math.random() > 0.4

          return {
            id,
            label: `${parentId ? parentId + ' > ' : ''}Option ${index + 1}`,
            children: hasChildren
              ? Array.from(
                { length: Math.floor(Math.random() * 6) + 2 },
                (_, i) => generateNode(id, depth + 1, i),
              )
              : undefined,
          }
        }

        return Array.from({ length: rootCount }, (_, i) =>
          generateNode(null, 0, i),
        )
      },
    },
  }
</script>

<style scoped>
.virtual-scroll-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-panel {
  margin-bottom: 20px;
}

.config-section {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 6px;
  margin: 20px 0;
}

.config-section h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #333;
  font-size: 14px;
}

.config-section p {
  margin: 8px 0;
}

.config-section label {
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  font-size: 13px;
}

.config-section input[type="checkbox"] {
  margin-right: 6px;
}

.config-section input[type="range"] {
  margin: 0 10px;
  vertical-align: middle;
}

.config-section strong {
  color: #1890ff;
  margin-left: 5px;
}

.hint {
  color: #999;
  font-size: 12px;
  margin-left: 8px;
}

.stats {
  background: #e6f7ff;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
  border-left: 3px solid #1890ff;
}

.stats p {
  margin: 5px 0;
  font-size: 13px;
}

.tips-section {
  background: #fffbe6;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #faad14;
}

.tips-section h4 {
  margin-top: 0;
  color: #d48806;
}

.tips-section ul {
  margin: 10px 0;
  padding-left: 25px;
}

.tips-section li {
  margin: 8px 0;
  line-height: 1.6;
  font-size: 13px;
}

.tips-section code {
  background: #fff;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: monospace;
  color: #c41d7f;
}
</style>
