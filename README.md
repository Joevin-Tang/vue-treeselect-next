# vue-treeselect-next

[中文文档](./README.zh_CN.md) | English

> A multi-select component with nested options support for Vue.js

## 🔔 Project Overview

This is a community-maintained fork of the original [vue-treeselect](https://github.com/riophae/vue-treeselect) by [Riophae Lee](https://github.com/riophae). The original project is no longer actively maintained, so this fork aims to continue its development and maintenance.

**Maintainer:** [Joevin](https://github.com/Joevin-Tang) (joevintom@gmail.com)  
**Original Author:** [Riophae Lee](https://github.com/riophae)  
**Original Repository:** https://github.com/riophae/vue-treeselect

### Improvements & Updates
- Bug fixes and improvements
- Updated dependencies
- Performance optimizations
- Continued maintenance and support

![Vue-Treeselect Screenshot](https://raw.githubusercontent.com/riophae/vue-treeselect/master/screenshot.png)

### Features

- Single & multiple select with nested options support
- Fuzzy matching
- Async searching
- Delayed loading (load data of deep level options only when needed)
- Keyboard support (navigate using <kbd>Arrow Up</kbd> & <kbd>Arrow Down</kbd> keys, select option using <kbd>Enter</kbd> key, etc.)
- Rich options & highly customizable
- Supports a wide range of browsers (see [below](#browser-compatibility))
- RTL support

*Requires Vue 2.2+*

### Getting Started

It's recommended to install vue-treeselect via npm, and build your app using a bundler like [webpack](https://webpack.js.org/).

```bash
npm install --save @joevin/vue-treeselect-next
```

This example shows how to integrate vue-treeselect with your [Vue SFCs](https://vuejs.org/v2/guide/single-file-components.html).

```vue
<!-- Vue SFC -->
<template>
  <div id="app">
    <treeselect v-model="value" :multiple="true" :options="options" />
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@joevin/vue-treeselect-next'
  // import the styles
  import '@joevin/vue-treeselect-next/dist/vue-treeselect.css'

  export default {
    // register the component
    components: { Treeselect },
    data() {
      return {
        // define the default value
        value: null,
        // define options
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

If you just don't want to use webpack or any other bundlers, you can simply include the standalone UMD build in your page. In this way, make sure Vue as a dependency is included before vue-treeselect.

```html
<html>
  <head>
    <!-- include Vue 2.x -->
    <script src="https://cdn.jsdelivr.net/npm/vue@^2"></script>
    <!-- include vue-treeselect & its styles. you can change the version tag to better suit your needs. -->
    <script src="https://cdn.jsdelivr.net/npm/@joevin/vue-treeselect-next@^0.5.0/dist/vue-treeselect.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@joevin/vue-treeselect-next@^0.5.0/dist/vue-treeselect.min.css">
  </head>
  <body>
    <div id="app">
      <treeselect v-model="value" :multiple="true" :options="options" />
    </div>
  </body>
  <script>
    // register the component
    Vue.component('treeselect', VueTreeselect.Treeselect)

    new Vue({
      el: '#app',
      data: {
        // define the default value
        value: null,
        // define options
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

### Documentation

For detailed documentation, please refer to the [original documentation](https://vue-treeselect.js.org/) which is still applicable to this fork.

For the latest updates and changes specific to this fork, please check the [GitHub repository](https://github.com/Joevin-Tang/vue-treeselect-next).

### Browser Compatibility

- Chrome
- Edge
- Firefox
- IE ≥ 9
- Safari

It should function well on IE9, but the style can be slightly broken due to the lack of support of some relatively new CSS features, such as `transition` and `animation`. Nevertheless it should look 90% same as on modern browsers.

### Bugs

If you encounter any bugs, please [open an issue](https://github.com/Joevin-Tang/vue-treeselect-next/issues/new) on the GitHub repository.

### Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork & clone the repo from https://github.com/Joevin-Tang/vue-treeselect-next
2. Install dependencies by `yarn` or `npm install`
3. Check out a new branch
4. `npm run dev` & hack
5. Make sure `npm test` passes
6. Push your changes & file a pull request

### Credits

This project is inspired by [vue-multiselect](https://github.com/monterail/vue-multiselect), [react-select](https://github.com/JedWatson/react-select) and [Ant Design](https://github.com/ant-design/ant-design/). Special thanks go to their respective authors!

Some icons used in this project:

  - "link" icon made by [Smashicons](https://www.flaticon.com/authors/smashicons) is licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/)
  - "spinner" icon from [SpinKit](https://github.com/tobiasahlin/SpinKit) is licensed under the [MIT License](https://github.com/tobiasahlin/SpinKit/blob/master/LICENSE)
  - "caret" icon made by [Dave Gandy](https://www.flaticon.com/authors/dave-gandy) is licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/)
  - "delete" icon made by [Freepik](https://www.flaticon.com/authors/freepik) is licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/)
  - "checkmark symbol" & "minus symbol" icons made by [Catalin Fertu](https://www.flaticon.com/authors/catalin-fertu) are licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/)

### License

Released under the [MIT License](https://github.com/Joevin-Tang/vue-treeselect-next/blob/master/LICENSE).

### Acknowledgments

This project is a fork of the original [vue-treeselect](https://github.com/riophae/vue-treeselect) created by [Riophae Lee](https://github.com/riophae).

Original Copyright (c) 2017-2020 Riophae Lee.  
Fork maintained by [Joevin](https://github.com/Joevin-Tang) (c) 2025-present.
