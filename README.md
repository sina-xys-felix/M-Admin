<div align="center">
    <img style="width: 80px;height: 80px" src="/src/assets/logo.png"/>
    <h1>M-Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 简介

**M-Admin** 是一个基于 Vue3、Vite4、TypeScript、Arco-Design-Vue、Pinia、Echarts5等技术的免费中后台模版，它使用了最新的前端技术栈，内置丰富的组件及全局配置，基于 mock 实现的动态数据展示，开箱即用的模板。

> **M 前缀含义：** M:代表这modules,模块化
>
> M 用来定义全局组件前缀，如 MTable,MDict等

## 特性

- **最新技术栈**：使用 Vue3 / Vite 等前端前沿技术开发，使用高效率的 pnpm 包管理器
- **TypeScript**：应用程序级 JavaScript 的语言
- **主题**：丰富可配置的主题、暗黑模式
- **代码规范**：丰富的规范插件及较高的代码规范

## 文档地址

http://doc.m-admin.cn/

## 预览


| 平台              | 预览地址                                                   |
| ----------------- | ---------------------------------------------------------- |
| **github**        | [M-Admin 预览地址](https://m-admin.cn) |


|        | 账号  | 密码   |
| ------ | ----- | ------ |
| 管理员 | admin | admin |
| 用户   | user  | user |

## 代码仓库


| 平台              | 预览地址                                                                              | 仓库地址                                                                        |
| ----------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **gitee**（码云） | <a href="https://m-admin.cn" target="_blank">M-Admin 预览地址</a>   | <a href="https://gitee.com/sina_xys/m-admin" target="_blank">Gitee  仓库地址</a> |
| **github**        | <a href="https://m-admin.cn" target="_blank">M-Admin 预览地址</a> | <a href="https://github.com/sina-xys-felix/M-Admin" target="_blank">Github 仓库地址</a> |

## 项目示例图

<img src="/src/assets/images/demo/welcome.png" />

<img src="/src/assets/images/demo/welcome-dark.png" />

<img src="/src/assets/images/demo/analysis.png" />

<img src="/src/assets/images/demo/analysis-dark.png" />

<img src="/src/assets/images/demo/basic.png" />

<img src="/src/assets/images/demo/tree.png" />

<img src="/src/assets/images/demo/form.png" />

<img src="/src/assets/images/demo/config.png" />


## 安装使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build:prod 
```

## 常见问题

**为什么安装依赖不成功？**

检查`node`版本，node版本最好是16+,最好使用原生镜像`pnpm`

**为什么选择 Arco 组件库，而不是 Element Plus?**

[Element Plus 对比 Arco design](https://juejin.cn/post/7294219581894705190)

**为什么组件使用m-开头？**

本项目在公用组件中，采用大写`开头 (m-)`命名方式

其他文件命名：`采用横线连接 (kebab-case)`

**为什么 css 类名推荐横线连接 (kebab-case)**

根据大部分前端代码规范，均采用这种形式

**页面显示异常？**

**`页面必须要保留一个根元素！！！`**

## 项目规范


#### 全局组件--命名规范

组件命名：**单文件组件的文件名以m开头，并以横线连接 (kebab-case)**

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

```
m-table
m-form
```

#### 局部组件--命名规范

组件命名：**单文件组件的文件名以横线连接 (kebab-case)**

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

```
add-modal
user-detailed
```

#### 文件夹命名--命名规范 (采用中划线-)

1、文件名建议只使用小写字母，不使用大写字母

2、名称较长时采用半角连接符(-)分隔

```
home/index.vue
user/index.vue
```

#### MTable 使用示例

**MTable继承了a-table的所有属性和配置，但根据实际使用场景新增一些插槽及配置，具体看源码**

<img src="/src/assets/images/demo/m-table.png" />

#### Hooks 目录结构

<img src="/src/assets/images/demo/hooks.png" />

**hooks 下默认存放公共的，非接口请求的 hooks**

```vue
<script setup lang="ts">
import { useLoading } from '@/hooks'

const { loading, setLoading } = useLoading()
</script>
```

#### TSX 方式使用表格

<img src="/src/assets/images/demo/tsx.png" />

#### useTable(hooks) 的使用

<img src="/src/assets/images/demo/use-table.png" />


#### useLoading(hooks) 的使用

<img src="/src/assets/images/demo/loading.png" />


#### CSS 命名规范

建议采用全小写，多单词使用-连接符(参考大部分网站，包括掘金，码云等，都是采用这个规则)

或者采用`BEM`命名规范 [BEM 命名规范](https://getbem.com/naming/)

```css
// 推荐
.header
.footer
.main
.content
.container
.page
.detail
.list
.list-item


// 不推荐
.Header
.listItem
```

```less
.list {
  padding:8px;
  &-item {
    padding: 20px;
    &__value{
        font-size:20px;
    }
  }
}
```

#### 全局 less 变量-命名规范

```less
$@size-none: 0;

@width-full: 100%;

@width-half:50%;

@gap-sm: 10px;

@gap-md: 16px;

@gap-24: 24px;

@font-size-sm: 14px;

@font-size-md: 16px;

@font-size-lg: 18px;

@font-size-xl: 20px;

@font-size-xxl: 24px;

@background-color: var(--color-custom-background);

@table-header-color:  var(--color-custom-header-th);

@modal-header-color: var(--color-custom-modal);

@border-color:var(--color-neutral-3);

@text-color:var(--color-text-1);

@font-weight-600: 600;
```

#### CSS 的命名词汇

```css
前一个    prev
后一个    next
当前的    current

显示的    show
隐藏的    hide
打开的    open
关闭的    close

选中的    selected
有效的    active
默认的    default
反转的    toggle

禁用的    disabled
危险的    danger
主要的    primary
成功的    success
提醒的    info
警告的    warning
出错的    error

大型的    lg
小型的    sm
超小的    xs
```

```css
文档    doc
头部    header(hd)
主体    body
尾部    footer(ft)
主栏    main
侧栏    side
容器    box/container
```

```css
列表    list
列表项  item
表格    table
表单    form
链接    link
标题    caption/heading/title
菜单    menu
集合    group
条      bar
内容    content
结果    result
```

```css
按钮        button(btn)
下拉菜单    dropdown
工具栏      toolbar
分页        page
缩略图      thumbnail
警告框      alert
进度条      progress
导航条      navbar
导航        nav
子导航      subnav
面包屑      breadcrumb(crumb)
标签        label
徽章        badge
巨幕        jumbotron
面板        panel
洼地        well
标签页      tab
提示框      tooltip
弹出框      popover
轮播图      carousel
手风琴      collapse
定位浮标    affix
```

```css
品牌        brand
标志        logo
额外部件    addon
版权        copyright
注册        regist(reg)
登录        login
搜索        search
热点        hot
帮助        help
信息        info
提示        tips
开关        toggle
新闻        news
广告        advertise(ad)
排行        top
下载        download
```

```css
左浮动    fl
右浮动    fr
清浮动    clear
```

#### 其他规范

可参考 Vue2 官网-风格指南: https://v2.cn.vuejs.org/v2/style-guide/

## Vue 相关

<a href="https://cn.vuejs.org/" target="_blank">Vue3 官网</a>

<a href="https://router.vuejs.org/zh/" target="_blank">Vue-Router</a>

<a href="https://cn.vitejs.dev/" target="_blank">Vite</a>

<a href="https://pinia.web3doc.top/" target="_blank">Pinia</a>

## 插件推荐

<a href="https://arco.design/vue/component/button" target="_blank">Arco-Design-Vue 组件库</a>

<a href="https://arco.design/vue/component/button" target="_blank">Arco-Design-Vue 组件库</a>

<a href="http://www.axios-js.com/zh-cn/docs/" target="_blank">Axios 是一个js的请求库</a>

<a href="https://dayjs.fenxianglu.cn/" target="_blank">day.js 一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间 2K 大小</a>

<a href="https://www.lodashjs.com/" target="_blank">Lodash 一个一致性、模块化、高性能的 JavaScript 实用工具库</a>

<a href="https://vueuse.org/" target="_blank">VueUse 一个 Vue3 Hooks 库</a>

## 开源项目集合

<a href="https://vue-admin.cn/admin" target="_blank">Vue3 开源项目集合</a>

<a href="https://react-admin.cn/admin/" target="_blank">React 开源项目集合</a>
