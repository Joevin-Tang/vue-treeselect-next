# vue-treeselect-next

[English](./README.md) | 中文文档

> 一个支持嵌套选项的 Vue.js 多选组件

## 🔔 项目介绍

这是原始 [vue-treeselect](https://github.com/riophae/vue-treeselect) 项目（由 [Riophae Lee](https://github.com/riophae) 创建）的社区维护 Fork。由于原项目不再被积极维护，这个 Fork 旨在继续其开发和维护工作。

**维护者:** [Joevin](https://github.com/Joevin-Tang)  
**原始作者:** [Riophae Lee](https://github.com/riophae)  
**原始仓库:** https://github.com/riophae/vue-treeselect

### 主要改进

- Bug 修复和改进
- 更新依赖版本
- 性能优化
- 持续维护和支持

![Vue-Treeselect 截图](https://raw.githubusercontent.com/riophae/vue-treeselect/master/screenshot.png)

### 功能特性

- 支持单选和多选，包括嵌套选项支持
- 模糊匹配搜索
- 异步搜索
- 延迟加载（仅在需要时加载深层级选项数据）
- 键盘支持（使用 <kbd>↑</kbd> & <kbd>↓</kbd> 方向键导航，使用 <kbd>Enter</kbd> 键选择选项等）
- 丰富的选项和高度可定制
- 支持广泛的浏览器（见下文）
- RTL 支持

*需要 Vue 2.2+*

### 快速开始

建议通过 npm 安装 vue-treeselect，并使用 [webpack](https://webpack.js.org/) 等打包工具构建应用。

```bash
npm install --save @joevin-tang/vue-treeselect-next
```

以下示例展示如何在你的 [Vue SFC](https://vuejs.org/v2/guide/single-file-components.html) 中集成 vue-treeselect。

```vue
<!-- Vue SFC -->
<template>
  <div id="app">
    <treeselect v-model="value" :multiple="true" :options="options" />
  </div>
</template>

<script>
  // 导入组件
  import Treeselect from '@joevin-tang/vue-treeselect-next'
  // 导入样式
  import '@joevin-tang/vue-treeselect-next/dist/vue-treeselect.css'

  export default {
    // 注册组件
    components: { Treeselect },
    data() {
      return {
        // 定义默认值
        value: null,
        // 定义选项
        options: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        } ],
      }
    },
  }
</script>
```

如果你不想使用 webpack 或任何其他打包工具，也可以直接在页面中包含 UMD 版本。在这种情况下，请确保在 vue-treeselect 之前已引入 Vue 作为依赖。

```html
<html>
  <head>
    <!-- 包含 Vue 2.x -->
    <script src="https://cdn.jsdelivr.net/npm/vue@^2"></script>
    <!-- 包含 vue-treeselect 及其样式。你可以更改版本标签以满足你的需求。 -->
    <script src="https://cdn.jsdelivr.net/npm/@joevin-tang/vue-treeselect-next@^0.4.1/dist/vue-treeselect.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@joevin-tang/vue-treeselect-next@^0.4.1/dist/vue-treeselect.min.css">
  </head>
  <body>
    <div id="app">
      <treeselect v-model="value" :multiple="true" :options="options" />
    </div>
  </body>
  <script>
    // 注册组件
    Vue.component('treeselect', VueTreeselect.Treeselect)

    new Vue({
      el: '#app',
      data: {
        // 定义默认值
        value: null,
        // 定义选项
        options: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        } ],
      },
    })
  </script>
</html>
```

### 文档

有关详细的文档，请参考仍然适用于此 Fork 的[原始文档](https://vue-treeselect.js.org/)。

有关此 Fork 特有的最新更新和更改，请查看 [GitHub 仓库](https://github.com/Joevin-Tang/vue-treeselect-next)。

### 浏览器兼容性

- Chrome
- Edge
- Firefox
- IE ≥ 9
- Safari

在 IE9 上应该能正常运行，但由于某些相对较新的 CSS 功能（如 `transition` 和 `animation`）缺乏支持，样式可能略有破损。尽管如此，在现代浏览器上的显示效果应该相似度达到 90%。

### 报告错误

如果你遇到任何错误，请在 [GitHub 仓库](https://github.com/Joevin-Tang/vue-treeselect-next/issues/new)上提交 issue。

### 贡献

欢迎贡献！如果你想贡献代码：

1. 从 https://github.com/Joevin-Tang/vue-treeselect-next Fork 并克隆仓库
2. 通过 `yarn` 或 `npm install` 安装依赖
3. 检出一个新分支
4. 运行 `npm run dev` 并开始 hack
5. 确保 `npm test` 通过
6. 推送你的更改并提交 Pull Request

### 致谢

这个项目灵感来自 [vue-multiselect](https://github.com/monterail/vue-multiselect)、[react-select](https://github.com/JedWatson/react-select) 和 [Ant Design](https://github.com/ant-design/ant-design/)。特别感谢这些项目的作者！

本项目使用的一些图标：

  - [Smashicons](https://www.flaticon.com/authors/smashicons) 制作的 "link" 图标，遵循 [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/) 许可证
  - [SpinKit](https://github.com/tobiasahlin/SpinKit) 中的 "spinner" 图标，遵循 [MIT 许可证](https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE)
  - [Dave Gandy](https://www.flaticon.com/authors/dave-gandy) 制作的 "caret" 图标，遵循 [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/) 许可证
  - [Freepik](https://www.flaticon.com/authors/freepik) 制作的 "delete" 图标，遵循 [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/) 许可证
  - [Catalin Fertu](https://www.flaticon.com/authors/catalin-fertu) 制作的 "checkmark symbol" & "minus symbol" 图标，遵循 [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/) 许可证

### 许可证

根据 [MIT 许可证](https://github.com/Joevin-Tang/vue-treeselect-next/blob/master/LICENSE)发布。

### 鸣谢

这个项目是由 [Riophae Lee](https://github.com/riophae) 创建的原始 [vue-treeselect](https://github.com/riophae/vue-treeselect) 项目的 Fork。

原始版权 (c) 2017-2020 Riophae Lee。  
Fork 由 [Joevin](https://github.com/Joevin-Tang) 维护 (c) 2025-present。
