# Events

<cite>
**本文档引用的文件**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [Input.vue](file://src/components/Input.vue)
- [Control.vue](file://src/components/Control.vue)
- [Option.vue](file://src/components/Option.vue)
- [Menu.vue](file://src/components/Menu.vue)
- [constants.js](file://src/constants.js)
</cite>

## 目录
1. [简介](#简介)
2. [用户交互事件](#用户交互事件)
3. [搜索相关事件](#搜索相关事件)
4. [异步加载事件](#异步加载事件)
5. [状态变化事件](#状态变化事件)

## 简介
Treeselect组件提供了一套完整的事件系统，用于响应用户交互、搜索操作、异步加载和状态变化。每个事件都携带了相关的参数，允许开发者实现自定义逻辑和状态同步。特别地，所有事件都包含一个`instanceId`参数，用于在复杂页面中识别事件来源。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L850-L893)

## 用户交互事件

### @input 事件
当组件的值发生变化时触发。

- **触发时机**：当用户选择或取消选择选项时，或者通过`v-model`等方式改变值时。
- **参数类型**：
  - `value`：当前选中的值，格式取决于`valueFormat`属性。
  - `instanceId`：组件实例ID，用于在复杂页面中识别事件来源。
- **使用场景**：用于实现双向数据绑定，或者在值变化时执行自定义逻辑。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L854-L856)

### @select 事件
当用户选择一个选项时触发。

- **触发时机**：当用户点击选项标签或复选框时。
- **参数类型**：
  - `node`：被选中的节点对象。
  - `instanceId`：组件实例ID。
- **使用场景**：用于在选项被选中时执行特定逻辑，如更新UI或发送网络请求。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1805-L1807)

### @deselect 事件
当用户取消选择一个选项时触发。

- **触发时机**：当用户点击已选中选项的复选框，或点击值容器中的移除图标时。
- **参数类型**：
  - `node`：被取消选中的节点对象。
  - `instanceId`：组件实例ID。
- **使用场景**：用于在选项被取消选中时执行特定逻辑，如清理相关数据。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1807-L1807)

### @focus 事件
当组件获得焦点时触发。

- **触发时机**：当用户点击输入框或使用Tab键导航到组件时。
- **参数类型**：
  - `instanceId`：组件实例ID。
- **使用场景**：用于在组件获得焦点时执行特定逻辑，如打开菜单或显示提示信息。

**Section sources**
- [Input.vue](file://src/components/Input.vue#L80-L86)

### @blur 事件
当组件失去焦点时触发。

- **触发时机**：当用户点击组件外部或使用Tab键离开组件时。
- **参数类型**：
  - `instanceId`：组件实例ID。
- **使用场景**：用于在组件失去焦点时执行特定逻辑，如关闭菜单或验证输入。

**Section sources**
- [Input.vue](file://src/components/Input.vue#L88-L99)

## 搜索相关事件

### @search-change 事件
当搜索查询发生变化时触发。

- **触发时机**：当用户在搜索框中输入文本时。
- **参数类型**：
  - `query`：当前的搜索查询字符串。
  - `instanceId`：组件实例ID。
- **使用场景**：用于在搜索查询变化时执行自定义逻辑，如记录搜索历史或更新搜索建议。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L891-L893)

### @search-focus 事件
当搜索输入框获得焦点时触发。

- **触发时机**：当用户点击搜索输入框时。
- **参数类型**：
  - `instanceId`：组件实例ID。
- **使用场景**：用于在搜索框获得焦点时执行特定逻辑，如显示搜索提示或清空之前的搜索结果。

**Section sources**
- [Input.vue](file://src/components/Input.vue#L80-L86)

## 异步加载事件

### @load-options 事件
当需要异步加载选项时触发。

- **触发时机**：当组件需要加载根选项或子选项时。
- **参数类型**：
  - `action`：加载动作类型，可以是`LOAD_ROOT_OPTIONS`、`LOAD_CHILDREN_OPTIONS`或`ASYNC_SEARCH`。
  - `callback`：回调函数，用于返回加载结果。
  - `parentNode`：父节点对象（仅在加载子选项时提供）。
  - `searchQuery`：搜索查询字符串（仅在异步搜索时提供）。
  - `instanceId`：组件实例ID。
- **使用场景**：用于实现动态加载选项的功能，如从服务器获取数据。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1748-L1765)

## 状态变化事件

### @open 事件
当菜单打开时触发。

- **触发时机**：当用户点击控制区域或使用键盘快捷键打开菜单时。
- **参数类型**：
  - `instanceId`：组件实例ID。
- **使用场景**：用于在菜单打开时执行特定逻辑，如加载数据或更新UI。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1477-L1477)

### @close 事件
当菜单关闭时触发。

- **触发时机**：当用户点击组件外部、按ESC键或选择选项后（在单选模式下）。
- **参数类型**：
  - `value`：当前选中的值。
  - `instanceId`：组件实例ID。
- **使用场景**：用于在菜单关闭时执行特定逻辑，如保存状态或清理资源。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1467-L1467)