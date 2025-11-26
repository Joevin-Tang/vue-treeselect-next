# 组件API

<cite>
**本文档引用的文件**   
- [Treeselect.vue](file://src/components/Treeselect.vue)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [constants.js](file://src/constants.js)
- [Control.vue](file://src/components/Control.vue)
- [Input.vue](file://src/components/Input.vue)
- [Menu.vue](file://src/components/Menu.vue)
- [README.md](file://README.md)
</cite>

## 目录
1. [简介](#简介)
2. [公开Props](#公开props)
3. [触发Events](#触发events)
4. [可用Slots](#可用slots)
5. [公开Methods](#公开methods)

## 简介
Vue Treeselect是一个支持嵌套选项的多选组件，专为Vue.js设计。该组件提供了丰富的配置选项，支持单选和多选模式，具备模糊匹配、异步搜索、延迟加载等功能。通过详细的API文档，开发者可以全面掌握组件的可编程接口，包括所有公开的props、events、slots和methods。

**Section sources**
- [README.md](file://README.md#L1-L193)

## 公开props
Treeselect组件提供了丰富的props用于配置组件行为和外观。

| 属性名 | 类型 | 默认值 | 可选值 | 说明 |
|-------|------|-------|-------|------|
| allowClearingDisabled | Boolean | false | true, false | 是否允许重置包含禁用选项的值 |
| allowSelectingDisabledDescendants | Boolean | false | true, false | 当祖先节点被选中/取消选中时，是否同时选中/取消选中其禁用的后代节点 |
| alwaysOpen | Boolean | false | true, false | 菜单是否始终保持打开状态 |
| appendToBody | Boolean | false | true, false | 是否将菜单附加到body元素 |
| async | Boolean | false | true, false | 是否启用异步搜索模式 |
| autoFocus | Boolean | false | true, false | 组件挂载后是否自动获得焦点 |
| autoLoadRootOptions | Boolean | true | true, false | 是否在挂载时自动加载根选项 |
| autoDeselectAncestors | Boolean | false | true, false | 取消选择节点时，是否自动取消选择其祖先节点（仅适用于扁平模式） |
| autoDeselectDescendants | Boolean | false | true, false | 取消选择节点时，是否自动取消选择其后代节点（仅适用于扁平模式） |
| autoSelectAncestors | Boolean | false | true, false | 选择节点时，是否自动选择其祖先节点（仅适用于扁平模式） |
| autoSelectDescendants | Boolean | false | true, false | 选择节点时，是否自动选择其后代节点（仅适用于扁平模式） |
| backspaceRemoves | Boolean | true | true, false | 当没有文本输入时，按退格键是否移除最后一个项目 |
| beforeClearAll | Function | constant(true) | - | 处理清除所有输入字段前的函数，返回false可阻止值被清除 |
| branchNodesFirst | Boolean | false | true, false | 是否在叶节点之前显示分支节点 |
| cacheOptions | Boolean | true | true, false | 是否缓存每次搜索请求的结果 |
| clearable | Boolean | true | true, false | 是否显示重置值的"×"按钮 |
| clearAllText | String | "Clear all" | - | 多选模式下"×"按钮的标题 |
| clearOnSelect | Boolean | false | true, false | 选择后是否清除搜索输入（仅适用于多选模式） |
| clearValueText | String | "Clear value" | - | "×"按钮的标题 |
| closeOnSelect | Boolean | true | true, false | 选择选项后是否关闭菜单（仅适用于多选模式） |
| defaultExpandLevel | Number | 0 | - | 加载时应自动展开的分支节点层级数 |
| defaultOptions | Boolean\|Array | false | - | 搜索前显示的默认选项集（用于异步搜索模式） |
| deleteRemoves | Boolean | true | true, false | 当没有文本输入时，按删除键是否移除最后一个项目 |
| delimiter | String | "," | - | 用于连接多个值的分隔符 |
| flattenSearchResults | Boolean | false | true, false | 是否仅显示直接匹配搜索值的节点，排除其祖先节点 |
| disableBranchNodes | Boolean | false | true, false | 是否禁止分支节点被选中 |
| disabled | Boolean | false | true, false | 是否禁用控件 |
| disableFuzzyMatching | Boolean | false | true, false | 是否禁用模糊匹配功能 |
| flat | Boolean | false | true, false | 是否启用扁平模式 |
| instanceId | String\|Number | 自动生成 | - | 将随所有事件传递的标识符，用于识别事件来源 |
| joinValues | Boolean | false | true, false | 是否使用分隔符将多个值连接成单个表单字段（传统模式） |
| limit | Number | Infinity | - | 限制显示的已选选项数量 |
| limitText | Function | (count) => `and ${count} more` | - | 当所选元素超过定义的限制时显示的消息处理函数 |
| loadingText | String | "Loading..." | - | 加载选项时显示的文本 |
| loadOptions | Function | - | - | 用于动态加载选项的函数 |
| matchKeys | Array | ['label'] | - | 要过滤的节点属性 |
| maxHeight | Number | 300 | - | 菜单的最大高度（像素） |
| multiple | Boolean | false | true, false | 是否允许多选 |
| name | String | - | - | 为HTML表单生成隐藏input标签的字段名 |
| noChildrenText | String | "No sub-options." | - | 分支节点没有子节点时显示的文本 |
| noOptionsText | String | "No options available." | - | 没有可用选项时显示的文本 |
| noResultsText | String | "No results found..." | - | 没有匹配的搜索结果时显示的文本 |
| normalizer | Function | identity | - | 用于规范化源数据的函数 |
| openDirection | String | "auto" | "auto", "top", "bottom", "above", "below" | 菜单打开方向 |
| openOnClick | Boolean | true | true, false | 点击控件时是否自动打开菜单 |
| openOnFocus | Boolean | false | true, false | 聚焦控件时是否自动打开菜单 |
| options | Array | - | - | 可用选项数组 |
| placeholder | String | "Select..." | - | 无值时显示的占位符 |
| required | Boolean | false | true, false | 是否应用HTML5 required属性 |
| retryText | String | "Retry?" | - | 提示用户重试加载子选项的文本 |
| retryTitle | String | "Click to retry" | - | 重试按钮的标题 |
| searchable | Boolean | true | true, false | 是否启用搜索功能 |
| searchNested | Boolean | false | true, false | 是否在祖先节点中搜索 |
| searchPromptText | String | "Type to search..." | - | 异步搜索时的提示文本 |
| showCount | Boolean | false | true, false | 是否在每个分支节点标签旁边显示子节点数量 |
| showCountOf | String | ALL_CHILDREN | ALL_CHILDREN, ALL_DESCENDANTS, LEAF_CHILDREN, LEAF_DESCENDANTS | 与showCount结合使用，指定应显示的计数类型 |
| showCountOnSearch | Boolean | null | true, false | 搜索时是否显示子节点数量 |
| sortValueBy | String | ORDER_SELECTED | ORDER_SELECTED, LEVEL, INDEX | 多选模式下已选选项的排序方式 |
| tabIndex | Number | 0 | - | 控件的tab索引 |
| value | Array\|String | - | - | 控件的值 |

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L73-L600)

## 触发events
Treeselect组件在特定操作时会触发相应的事件。

| 事件名 | 触发时机 | 携带参数 | 说明 |
|-------|---------|---------|------|
| input | 值发生变化时 | value, instanceId | 当组件的值发生变化时触发，通常用于v-model绑定 |
| select | 选择一个选项时 | node, instanceId | 当用户选择一个选项时触发，携带选中的节点对象和实例ID |
| deselect | 取消选择一个选项时 | node, instanceId | 当用户取消选择一个选项时触发，携带被取消选择的节点对象和实例ID |
| open | 菜单打开时 | instanceId | 当下拉菜单打开时触发，携带实例ID |
| close | 菜单关闭时 | instanceId | 当下拉菜单关闭时触发，携带实例ID |
| search-change | 搜索查询改变时 | searchQuery, instanceId | 当搜索查询发生变化时触发，携带当前搜索查询和实例ID |

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L855-L892)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1806-L1808)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1478)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1465)

## 可用slots
Treeselect组件提供了多个插槽用于自定义内容。

| 插槽名 | 类型 | 数据结构 | 说明 |
|-------|------|---------|------|
| option-label | 作用域插槽 | { node, shouldShowCount, count, labelClassName, countClassName } | 自定义选项标签的渲染方式 |
| value | 作用域插槽 | { node, shouldShowCount, count, labelClassName, countClassName } | 自定义已选值的渲染方式 |
| before-list | 普通插槽 | - | 在选项列表前插入内容 |
| after-list | 普通插槽 | - | 在选项列表后插入内容 |

**Section sources**
- [Menu.vue](file://src/components/Menu.vue#L92-L107)
- [Control.vue](file://src/components/Control.vue#L140-L150)

## 公开methods
Treeselect组件提供了多个方法用于程序化控制组件。

| 方法名 | 参数 | 说明 |
|-------|------|------|
| focusInput | 无 | 使输入框获得焦点 |
| blurInput | 无 | 使输入框失去焦点 |
| openMenu | 无 | 打开下拉菜单 |
| closeMenu | 无 | 关闭下拉菜单 |
| toggleMenu | 无 | 切换下拉菜单的打开/关闭状态 |
| select | node | 选择指定的节点 |
| clear | 无 | 清除所有已选值 |
| removeLastValue | 无 | 移除最后一个已选值（多选模式下） |
| highlightFirstOption | 无 | 高亮第一个可选项 |
| highlightLastOption | 无 | 高亮最后一个可选项 |
| highlightPrevOption | 无 | 高亮前一个可选项 |
| highlightNextOption | 无 | 高亮后一个可选项 |
| toggleExpanded | node | 切换指定节点的展开/折叠状态 |
| getMenu | 无 | 获取菜单DOM元素 |
| getControl | 无 | 获取控件DOM元素 |
| getInput | 无 | 获取输入框DOM元素 |

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1180-L1837)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1471-L1487)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1825-L1837)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1944-L1950)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1458-L1470)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1519-L1527)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1529-L1537)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1539-L1547)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1549-L1557)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1559-L1567)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1489-L1502)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1569-L1577)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1579-L1587)
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1589-L1597)