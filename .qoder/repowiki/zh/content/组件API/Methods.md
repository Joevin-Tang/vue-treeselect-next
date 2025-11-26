# Methods

<cite>
**本文档中引用的文件**  
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [Treeselect.vue](file://src/components/Treeselect.vue)
- [Input.vue](file://src/components/Input.vue)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js)
</cite>

## 目录
1. [简介](#简介)
2. [公开实例方法](#公开实例方法)
3. [方法使用示例](#方法使用示例)
4. [使用场景分析](#使用场景分析)

## 简介
Treeselect组件提供了一套完整的编程控制方法，允许开发者通过实例方法控制组件的行为。这些方法涵盖了焦点控制、菜单管理、值操作和节点状态切换等功能，为实现复杂的交互逻辑提供了强大的支持。本文档详细介绍了所有公开的实例方法及其调用方式、参数说明和使用场景。

## 公开实例方法

### focusInput()
将输入框聚焦，使组件获得焦点。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于程序化地将焦点设置到Treeselect组件的输入框上。当组件获得焦点时，通常会触发相关的UI变化，如边框高亮等视觉反馈。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1180-L1182)
- [Input.vue](file://src/components/Input.vue#L68-L74)

### blurInput()
移除输入框的焦点，使组件失去焦点。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于程序化地移除Treeselect组件的焦点。当组件失去焦点时，会触发相关的UI变化和事件处理，如关闭下拉菜单等。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1184-L1186)
- [Input.vue](file://src/components/Input.vue#L76-L78)

### openMenu()
打开下拉菜单。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于程序化地打开Treeselect组件的下拉菜单。只有在组件未被禁用且菜单未打开的情况下才会执行此操作。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1471-L1479)

### closeMenu()
关闭下拉菜单。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于程序化地关闭Treeselect组件的下拉菜单。只有在菜单已打开且组件未被禁用的情况下才会执行此操作。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1462-L1469)

### toggleMenu()
切换下拉菜单的打开/关闭状态。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于切换Treeselect组件下拉菜单的状态。如果菜单已打开，则关闭；如果菜单已关闭，则打开。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1481-L1487)

### clear()
清除组件的当前值。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于清除Treeselect组件的当前选中值。在单选模式下，会清除所有值；在多选模式下，会根据配置决定是否清除禁用选项的值。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1825-L1837)

### removeLastValue()
移除最后一个选中的值（仅适用于多选模式）。

**参数**: 无  
**返回值**: 无  
**功能说明**: 该方法用于移除多选模式下最后一个选中的值。在单选模式下，该方法等同于clear()方法。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1944-L1950)

### toggleExpanded(node)
切换指定节点的展开/折叠状态。

**参数**: 
- `node`: 要切换状态的节点对象  
**返回值**: 无  
**功能说明**: 该方法用于切换指定节点的展开状态。在搜索模式下，会切换节点的搜索展开状态；在正常模式下，会切换节点的常规展开状态。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1489-L1502)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js#L6-L119)

### getNode(id)
根据节点ID获取节点对象。

**参数**: 
- `id`: 节点的唯一标识符  
**返回值**: 节点对象或null  
**功能说明**: 该方法用于根据节点ID获取对应的节点对象。如果ID无效或不存在，会返回null并发出警告。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1358-L1358)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js#L283-L312)

### getMenu()
获取下拉菜单的DOM元素。

**参数**: 无  
**返回值**: 菜单DOM元素或null  
**功能说明**: 该方法用于获取下拉菜单的DOM元素引用。当菜单关闭时返回null，当菜单打开时返回菜单的DOM元素。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1700-L1700)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js#L190-L238)

### setCurrentHighlightedOption(node)
设置当前高亮的选项。

**参数**: 
- `node`: 要高亮的节点对象  
**返回值**: 无  
**功能说明**: 该方法用于设置当前高亮的选项。高亮的选项通常会在键盘导航中作为当前选中的目标。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1431-L1433)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js#L470-L471)

### resetHighlightedOptionWhenNecessary(forceReset)
必要时重置高亮选项。

**参数**: 
- `forceReset`: 是否强制重置  
**返回值**: 无  
**功能说明**: 该方法用于在必要时重置高亮选项。当forceReset为true时，会强制重置为第一个可见选项。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1435-L1457)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js#L555-L613)

## 方法使用示例

### 基本用法
```javascript
// 在Vue组件中通过ref引用调用方法
this.$refs.treeselect.focusInput()
this.$refs.treeselect.blurInput()
this.$refs.treeselect.openMenu()
this.$refs.treeselect.closeMenu()
```

### 复杂交互示例
```javascript
// 组合使用多个方法实现复杂交互
const treeselect = this.$refs.treeselect

// 打开菜单并聚焦输入框
treeselect.openMenu()
treeselect.focusInput()

// 清除当前值并重置搜索
treeselect.clear()
treeselect.resetSearchQuery()

// 切换特定节点的展开状态
const node = treeselect.getNode('node-id')
if (node) {
  treeselect.toggleExpanded(node)
}
```

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L1180-L1983)
- [Treeselect.vue](file://src/components/Treeselect.vue)

## 使用场景分析

### 焦点控制场景
`focusInput()`和`blurInput()`方法主要用于实现自动聚焦和程序化失去焦点的场景。例如，在表单初始化时自动聚焦到第一个输入控件，或者在验证失败时将焦点移回特定的Treeselect组件。

### 菜单管理场景
`openMenu()`、`closeMenu()`和`toggleMenu()`方法适用于需要程序化控制下拉菜单显示状态的场景。例如，在用户完成特定操作后自动打开菜单，或在外部事件触发时关闭所有打开的菜单。

### 值操作场景
`clear()`和`removeLastValue()`方法在实现重置功能和撤销操作时非常有用。`clear()`方法可用于表单重置按钮，而`removeLastValue()`方法可用于实现"撤销上次选择"的功能。

### 节点状态控制场景
`toggleExpanded()`方法在实现树形结构的动态展开/折叠时非常有用。结合`getNode()`方法，可以精确控制特定节点的展开状态，为用户提供更灵活的浏览体验。

### 高级交互场景
组合使用`setCurrentHighlightedOption()`和`resetHighlightedOptionWhenNecessary()`方法可以实现复杂的键盘导航逻辑，为无障碍访问提供支持。这些方法允许开发者完全控制选项的高亮状态，实现自定义的导航行为。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [Methods.spec.js](file://test/unit/specs/Methods.spec.js)