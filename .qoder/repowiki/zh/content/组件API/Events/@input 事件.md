# @input 事件

<cite>
**本文档中引用的文件**  
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js)
- [Treeselect.vue](file://src/components/Treeselect.vue)
- [Props.spec.js](file://test/unit/specs/Props.spec.js)
- [Events.spec.js](file://test/unit/specs/Events.spec.js)
- [Selecting.spec.js](file://test/unit/specs/Selecting.spec.js)
</cite>

## 目录
1. [简介](#简介)
2. [@input 事件详解](#input-事件详解)
3. [单选与多选模式下的参数差异](#单选与多选模式下的参数差异)
4. [与 v-model 的等价关系](#与-v-model-的等价关系)
5. [使用示例](#使用示例)
6. [自定义状态管理逻辑](#自定义状态管理逻辑)

## 简介
`@input` 事件是 Treeselect 组件中用于响应值变化的核心事件。每当用户选择或取消选择选项时，该事件都会被触发，并携带更新后的值作为参数。此事件是实现双向数据绑定（如 `v-model`）的基础机制，同时也支持手动监听以实现更灵活的状态管理。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L850-L856)

## @input 事件详解
`@input` 事件在 Treeselect 组件的值发生变化时触发。其触发逻辑位于 `treeselectMixin.js` 中的 `internalValue` 监听器中。当组件内部值（`internalValue`）发生实际变化时，会通过 `this.$emit('input', this.getValue(), this.getInstanceId())` 发出事件。

该事件携带两个参数：
1. **更新后的值**：根据 `valueFormat` 和 `multiple` 属性的不同，格式有所不同
2. **实例 ID**：用于标识事件来源的组件实例

事件仅在值真正发生变化时才被触发，避免了浅相等但无实际变化时的冗余触发。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L850-L856)

## 单选与多选模式下的参数差异
`@input` 事件的参数格式根据组件的单选/多选模式而有所不同：

### 单选模式
在单选模式下（`multiple: false`），事件参数为：
- 被选中节点的 ID（字符串或数字）
- 或 `null`（当没有选中任何值时）

### 多选模式
在多选模式下（`multiple: true`），事件参数为：
- 包含所有选中节点 ID 的数组
- 空数组（当没有选中任何值时）

这种设计确保了在不同模式下都能准确传递当前选中状态。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L971-L980)
- [Props.spec.js](file://test/unit/specs/Props.spec.js#L2823-L2856)

## 与 v-model 的等价关系
`@input` 事件与 `v-model` 指令存在直接的等价关系。`v-model` 本质上是语法糖，它自动完成了以下两个操作：
1. 将组件的 `value` 属性绑定到指定的数据
2. 监听 `@input` 事件并更新该数据

因此，使用 `v-model`：
```vue
<treeselect v-model="selectedValue" />
```

等价于：
```vue
<treeselect :value="selectedValue" @input="selectedValue = $event" />
```

这种等价关系使得开发者既可以使用简洁的 `v-model` 语法，也可以在需要更精细控制时手动处理 `@input` 事件。

**Section sources**
- [Props.spec.js](file://test/unit/specs/Props.spec.js#L2823-L2974)
- [Basic.spec.js](file://test/unit/specs/Basic.spec.js#L782-L815)

## 使用示例

### 使用 v-model 进行双向绑定
```vue
<template>
  <div>
    <treeselect v-model="selectedValue" :options="options" />
    <p>当前选中值: {{ selectedValue }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      options: [
        { id: 'a', label: '选项A' },
        { id: 'b', label: '选项B' }
      ]
    }
  }
}
</script>
```

### 手动监听 @input 事件
```vue
<template>
  <div>
    <treeselect :value="selectedValue" @input="handleInput" :options="options" />
    <p>当前选中值: {{ selectedValue }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      options: [
        { id: 'a', label: '选项A' },
        { id: 'b', label: '选项B' }
      ]
    }
  },
  methods: {
    handleInput(newValue) {
      this.selectedValue = newValue
      // 可以在此处添加额外的业务逻辑
      console.log('值已更新:', newValue)
    }
  }
}
</script>
```

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L850-L856)
- [Props.spec.js](file://test/unit/specs/Props.spec.js#L2823-L2974)

## 自定义状态管理逻辑
通过手动监听 `@input` 事件，可以实现比 `v-model` 更复杂的自定义状态管理逻辑：

```vue
<template>
  <treeselect @input="handleCustomInput" :options="options" />
</template>

<script>
export default {
  data() {
    return {
      options: [
        { id: 'a', label: '选项A' },
        { id: 'b', label: '选项B' }
      ],
      selectionHistory: []
    }
  },
  methods: {
    handleCustomInput(newValue) {
      // 记录选择历史
      this.selectionHistory.push({
        value: newValue,
        timestamp: Date.now()
      })
      
      // 根据业务规则处理新值
      if (this.isValidSelection(newValue)) {
        this.updateSelection(newValue)
      } else {
        this.showValidationError()
      }
    },
    
    isValidSelection(value) {
      // 自定义验证逻辑
      return value !== null
    },
    
    updateSelection(value) {
      // 更新状态
      this.$store.commit('updateSelection', value)
    },
    
    showValidationError() {
      // 显示验证错误
      this.$message.error('无效的选择')
    }
  }
}
</script>
```

这种方式允许在值更新时执行额外的业务逻辑，如验证、日志记录、状态同步等。

**Section sources**
- [treeselectMixin.js](file://src/mixins/treeselectMixin.js#L850-L856)
- [Events.spec.js](file://test/unit/specs/Events.spec.js#L1-L66)