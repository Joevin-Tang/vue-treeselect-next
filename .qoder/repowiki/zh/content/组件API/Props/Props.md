# Props参考文档

<cite>
**本文档中引用的文件**
- [Treeselect.vue](file://src/components/Treeselect.vue)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [VirtualList.vue](file://src/components/VirtualList.vue)
- [LargeDataExample.vue](file://src/examples/LargeDataExample.vue)
- [Props.spec.js](file://test/unit/specs/Props.spec.js)
- [VirtualScroll.spec.js](file://test/unit/specs/VirtualScroll.spec.js)
- [Searching.spec.js](file://test/unit/specs/Searching.spec.js)
- [package.json](file://package.json)
</cite>

## 目录
1. [简介](#简介)
2. [核心功能Props](#核心功能props)
3. [交互控制Props](#交互控制props)
4. [树形结构处理Props](#树形结构处理props)
5. [搜索功能Props](#搜索功能props)
6. [性能优化Props](#性能优化props)
7. [异步加载Props](#异步加载props)
8. [样式与布局Props](#样式与布局props)
9. [事件与回调Props](#事件与回调props)
10. [最佳实践与配置示例](#最佳实践与配置示例)

## 简介

Vue Treeselect是一个功能强大的多选树形选择器组件，提供了丰富的配置选项来满足各种复杂的业务需求。本文档详细介绍了所有公开的props，包括它们的类型、默认值、可选值和具体用途。

## 核心功能Props

### value
- **类型**: `Array | String | Number | Object`
- **默认值**: `null`
- **描述**: 控制组件的值，单选模式下为节点ID或节点对象，多选模式下为节点ID或节点对象的数组。其格式取决于`valueFormat` prop的设置。

### options
- **类型**: `Array`
- **必需**: `true`
- **描述**: 可用选项数组，每个选项必须包含`id`和`label`属性，可以包含`children`属性实现树形结构。

### multiple
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否启用多选模式，设置为`true`时允许选择多个选项。

### placeholder
- **类型**: `String`
- **默认值**: `'Select...'`
- **描述**: 当没有选择任何值时显示的占位符文本。

### required
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否应用HTML5的`required`属性，当值为空时触发验证。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L596-L602)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L474-L481)

## 交互控制Props

### searchable
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 是否启用搜索功能，允许用户通过输入文本过滤选项。

### clearable
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 是否显示清除按钮，点击后可以清空当前选择的值。

### disabled
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否禁用整个组件，禁用状态下无法进行任何交互操作。

### autoFocus
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 组件挂载时是否自动聚焦到搜索输入框。

### tabIndex
- **类型**: `Number`
- **默认值**: `0`
- **描述**: 控制元素的tab索引顺序，决定Tab键导航的顺序。

### openOnClick
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 点击控件时是否自动打开下拉菜单。

### openOnFocus
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 获得焦点时是否自动打开下拉菜单。

### alwaysOpen
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否始终保持菜单打开状态，即使失去焦点也不会关闭。

### appendToBody
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否将菜单追加到`body`元素，解决定位问题。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L110-L121)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L197-L203)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L293-L298)

## 树形结构处理Props

### flat
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否启用扁平模式，扁平模式下父子节点的选择不会级联影响。

### disableBranchNodes
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否禁止选择分支节点，只能选择叶子节点。

### branchNodesFirst
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否将分支节点优先显示在前面。

### defaultExpandLevel
- **类型**: `Number`
- **默认值**: `0`
- **描述**: 默认展开的层级数，设置为`Infinity`时会展开所有节点。

### autoSelectAncestors
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 自动选择父节点，仅在扁平模式下有效。

### autoSelectDescendants
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 自动选择子节点，仅在扁平模式下有效。

### autoDeselectAncestors
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 自动取消选择父节点，仅在扁平模式下有效。

### autoDeselectDescendants
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 自动取消选择子节点，仅在扁平模式下有效。

### allowSelectingDisabledDescendants
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否允许选择被禁用的后代节点。

### allowClearingDisabled
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否允许清除包含禁用节点的值。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L307-L317)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L284-L290)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L81-L90)

## 搜索功能Props

### disableFuzzyMatching
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否禁用模糊匹配功能，启用后只能进行精确匹配。

### searchNested
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否在祖先节点中也进行搜索，支持跨层级查找。

### flattenSearchResults
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否只显示直接匹配的节点，不显示其祖先节点。

### matchKeys
- **类型**: `Array`
- **默认值**: `['label']`
- **描述**: 用于搜索匹配的节点属性列表，默认只匹配`label`属性。

### cacheOptions
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 是否缓存每次搜索请求的结果，提升重复搜索的性能。

### searchPromptText
- **类型**: `String`
- **默认值**: `'Type to search...'`
- **描述**: 搜索输入框的提示文本。

### noResultsText
- **类型**: `String`
- **默认值**: `'No results found...'`
- **描述**: 没有搜索结果时显示的文本。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L300-L306)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L274-L282)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L374-L379)

## 性能优化Props

### virtualScroll
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否启用虚拟滚动，用于大数据量场景下的性能优化。

### optionHeight
- **类型**: `Number`
- **默认值**: `40`
- **描述**: 虚拟滚动模式下每个选项的高度（像素），影响渲染性能。

### maxHeight
- **类型**: `Number`
- **默认值**: `300`
- **描述**: 菜单的最大高度（像素），超过此高度会显示滚动条。

### openDirection
- **类型**: `String`
- **默认值**: `'auto'`
- **可选值**: `'auto'`, `'top'`, `'bottom'`, `'above'`, `'below'`
- **描述**: 强制指定菜单打开的方向。

### zIndex
- **类型**: `Number | String`
- **默认值**: `999`
- **描述**: 菜单的z-index层级，确保正确覆盖其他元素。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L641-L656)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L380-L387)
- [VirtualList.vue](file://src/components/VirtualList.vue#L18-L25)

## 异步加载Props

### async
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否启用异步搜索模式，需要配合`loadOptions`函数使用。

### loadOptions
- **类型**: `Function`
- **必需**: `async`为`true`时必需
- **描述**: 加载选项的回调函数，用于动态加载数据。

### defaultOptions
- **类型**: `Boolean | Array`
- **默认值**: `false`
- **描述**: 默认显示的选项，在异步搜索模式下使用。

### autoLoadRootOptions
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 组件挂载时是否自动加载根选项。

### noOptionsText
- **类型**: `String`
- **默认值**: `'No options available.'`
- **描述**: 没有可用选项时显示的文本。

### loadingText
- **类型**: `String`
- **默认值**: `'Loading...'`
- **描述**: 加载过程中显示的文本。

### retryText
- **类型**: `String`
- **默认值**: `'Retry?'`
- **描述**: 加载失败时显示的重试按钮文本。

### retryTitle
- **类型**: `String`
- **默认值**: `'Click to retry'`
- **描述**: 重试按钮的标题提示。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L107-L113)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L365-L372)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L420-L426)

## 样式与布局Props

### delimiter
- **类型**: `String`
- **默认值**: `','`
- **描述**: 多选模式下连接多个值的分隔符。

### joinValues
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否将多个值连接成单一字符串（传统模式）。

### name
- **类型**: `String`
- **描述**: 生成隐藏字段的表单名称。

### showCount
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 是否在分支节点旁边显示子节点数量。

### showCountOf
- **类型**: `String`
- **默认值**: `'ALL_CHILDREN'`
- **可选值**: `'ALL_CHILDREN'`, `'ALL_DESCENDANTS'`, `'LEAF_CHILDREN'`, `'LEAF_DESCENDANTS'`
- **描述**: 显示哪种类型的子节点数量。

### sortValueBy
- **类型**: `String`
- **默认值**: `'ORDER_SELECTED'`
- **可选值**: `'ORDER_SELECTED'`, `'LEVEL'`, `'INDEX'`
- **描述**: 多选模式下值的排序方式。

### valueFormat
- **类型**: `String`
- **默认值**: `'id'`
- **可选值**: `'id'`, `'object'`
- **描述**: `value`属性的格式，支持ID或完整对象。

### valueConsistsOf
- **类型**: `String`
- **默认值**: `'BRANCH_PRIORITY'`
- **可选值**: `'ALL'`, `'BRANCH_PRIORITY'`, `'LEAF_PRIORITY'`, `'ALL_WITH_INDETERMINATE'`
- **描述**: 多选模式下值包含哪些节点。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L266-L272)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L596-L602)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L621-L631)

## 事件与回调Props

### beforeClearAll
- **类型**: `Function`
- **默认值**: `() => true`
- **描述**: 清除所有值前的回调函数，返回`false`可以阻止清除操作。

### clearAllText
- **类型**: `String`
- **默认值**: `'Clear all'`
- **描述**: 多选模式下清除按钮的标题。

### clearValueText
- **类型**: `String`
- **默认值**: `'Clear value'`
- **描述**: 单选模式下清除按钮的标题。

### clearOnSelect
- **类型**: `Boolean`
- **默认值**: `false`
- **描述**: 多选模式下选择选项后是否清除搜索输入框。

### closeOnSelect
- **类型**: `Boolean`
- **默认值**: `true`
- **描述**: 多选模式下选择选项后是否关闭菜单。

### limit
- **类型**: `Number`
- **默认值**: `Infinity`
- **描述**: 多选模式下最多可以选择的选项数量。

### limitText
- **类型**: `Function`
- **默认值**: `(count) => \`and \${count} more\``
- **描述**: 当选择数量超过限制时显示的文本。

### normalizer
- **类型**: `Function`
- **默认值**: `identity`
- **描述**: 用于标准化原始数据的函数。

### instanceId
- **类型**: `String | Number`
- **默认值**: 自动生成的唯一标识符
- **描述**: 组件实例的唯一标识符。

**节来源**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L170-L180)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L204-L222)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L346-L356)

## 最佳实践与配置示例

### 基础配置示例

```javascript
// 基础单选配置
const basicSingleConfig = {
  options: treeData,
  placeholder: '请选择一个选项',
  searchable: true,
  clearable: true
}

// 多选配置
const multiSelectConfig = {
  options: treeData,
  multiple: true,
  placeholder: '请选择多个选项',
  clearOnSelect: true,
  closeOnSelect: false,
  limit: 5
}
```

### 性能优化配置

```javascript
// 大数据量优化配置
const performanceOptimizedConfig = {
  options: largeDataSet,
  virtualScroll: true,
  optionHeight: 40,
  maxHeight: 400,
  defaultExpandLevel: 1,
  cacheOptions: true,
  flattenSearchResults: true
}
```

### 异步加载配置

```javascript
// 异步搜索配置
const asyncSearchConfig = {
  async: true,
  searchable: true,
  loadOptions: async (params) => {
    const { action, parentNode, callback } = params
    try {
      const response = await api.getOptions(action, parentNode)
      callback(null, response.data)
    } catch (error) {
      callback(error)
    }
  },
  defaultOptions: true
}
```

### 特殊场景配置

```javascript
// 扁平模式配置
const flatModeConfig = {
  flat: true,
  autoSelectAncestors: true,
  autoSelectDescendants: true,
  disableBranchNodes: true
}

// 禁用节点配置
const disabledNodesConfig = {
  options: treeWithDisabledNodes,
  allowSelectingDisabledDescendants: true,
  allowClearingDisabled: true
}
```

### 推荐的性能优化组合

```javascript
// 高性能组合配置
const highPerformanceConfig = {
  // 基础配置
  options: [], // 动态加载
  multiple: true,
  
  // 性能优化
  virtualScroll: true,
  optionHeight: 40,
  cacheOptions: true,
  flattenSearchResults: true,
  disableFuzzyMatching: true,
  
  // 用户体验
  defaultExpandLevel: 0,
  clearOnSelect: true,
  closeOnSelect: false,
  
  // 异步加载
  async: true,
  loadOptions: loadData,
  autoLoadRootOptions: false
}
```

**节来源**
- [LargeDataExample.vue](file://src/examples/LargeDataExample.vue#L23-L38)
- [VirtualScroll.spec.js](file://test/unit/specs/VirtualScroll.spec.js#L105-L120)

## Prop相互影响与注意事项

### 关键字匹配与搜索行为的关系

- `searchable: true` + `disableFuzzyMatching: false`: 启用模糊搜索功能
- `searchable: true` + `disableFuzzyMatching: true`: 启用精确匹配
- `searchNested: true`: 必须配合`searchable: true`才能生效
- `flattenSearchResults: true`: 会忽略`searchNested`的行为

### 性能相关配置的权衡

- `virtualScroll: true` + `optionHeight: 40`: 推荐配置，适用于1000+数据
- `cacheOptions: true`: 适合频繁搜索的场景
- `flattenSearchResults: true`: 可以显著提升搜索性能，但会改变显示逻辑

### 多选模式的特殊配置

- `multiple: true` + `clearOnSelect: true`: 选择后立即清除输入
- `multiple: true` + `closeOnSelect: false`: 保持菜单打开状态
- `valueConsistsOf`的不同值会影响最终的`value`数组内容

### 异步加载的最佳实践

- `async: true` 必须配合 `loadOptions` 函数使用
- `defaultOptions: true` 可以避免空状态
- `autoLoadRootOptions: false` 可以延迟加载以提升首屏性能

这些配置选项提供了极大的灵活性，可以根据具体的业务需求进行组合和调整。建议在实际使用中根据数据量、用户体验要求和性能考虑来选择合适的配置组合。