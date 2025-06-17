import { ServerRouteRecordRaw } from '@/router/routes/types'
/**
 * @name 处理树形结构
 * */

/**
 * 获取树形节点
 * @param {Array} tree
 * @param {String} value
 * @returns {Object}
 *
 * */
export const findTreeNode = (tree, value, fieds = { value: 'value', label: 'name', children: 'children' }) => {
  const val = value ? value.toString() : ''
  if (tree && tree instanceof Array && tree.length > 0) {
    for (const item in tree) {
      if (tree[item][fieds.value] === val || tree[item][fieds.value] === Number(value)) {
        return tree[item][fieds.label]
      }
      if (
        tree[item][fieds.children] &&
        tree[item][fieds.children] instanceof Array &&
        tree[item][fieds.children].length > 0
      ) {
        const node = findTreeNode(tree[item][fieds.children], val)
        if (node) {
          return node[fieds.label] || node
        }
      }
    }
  }
}

/**
 * 获取下拉选项
 * @param {Array} options
 * @param {String} val
 * @returns {String}
 *
 * */
export const findSelectOption = (options, val) => {
  let str = '--'
  if (options && options instanceof Array && options.length > 0) {
    const arg = options.find((item) => item.value.toString() === val.toString())
    str = arg?.name || arg?.label
  }
  return str
}

/**
 * @description 根据后台返回的ids，来判断路由菜单的显示
 * @param {Array} list 所有的静态路由  ServerRouteRecordRaw
 * @param {Object} menuIds 后端返回的路由ids
 * */
export const getRoutes = (list: ServerRouteRecordRaw[], menuIds: string[] = []): ServerRouteRecordRaw[] => {
  if (menuIds && menuIds.length === 1 && menuIds[0] === '0') {
    return list
  } else {
    const fixedRoutes: ServerRouteRecordRaw[] = []
    const allRoutes: ServerRouteRecordRaw[] = []

    for (const router of list) {
      const { requiresAuth, ...rest } = router // 解构需要的部分

      // 如果路由元信息中requiresAuth为false，则该路由不需要验证，将其添加到fixedRoutes中
      if (requiresAuth === false) {
        fixedRoutes.push(rest)
      }

      // 如果路由元信息中requiresAuth为true或者没有定义requiresAuth，并且meta.id存在于menuIds中，则该路由需要进行验证
      if (requiresAuth === true || menuIds.includes(rest.meta?.id)) {
        // 如果router有子路由，则递归处理子路由
        if (rest.children) rest.children = getRoutes(rest.children, menuIds)
        allRoutes.push(rest)
      }
    }
    return [...fixedRoutes, ...allRoutes]
  }
}
