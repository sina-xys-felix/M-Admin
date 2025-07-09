type TargetContext = '_self' | '_parent' | '_blank' | '_top'

export const openWindow = (url: string, opts?: { target?: TargetContext; [key: string]: unknown }) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(',')
  )
}

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
)

/**
 * 在给定的树状结构中，递归地查找并返回指定名称的节点的所有父节点。
 * 函数接受一棵树、目标节点名称以及一个可选的父母节点数组（默认为空）和索引（默认为 0）作为参数。
 * 如果在树中找到目标节点，函数将返回包含从根节点到目标节点的所有父节点的数组。如果树中不存在目标节点，则返回 null。
 *
 * @param tree - 要搜索的树状结构。
 * @param targetKey - 要查找的目标节点key。
 * @param parents - 已经遍历过的当前节点的父节点数组。
 * @param index - 当前遍历的索引，用于遍历 tree 数组。
 * @returns 包含目标节点的所有父节点的数组，如果没有找到则返回 null。
 */
export function findParentsTailRecursive(tree: any, targetKey: string | number, parents = [], index = 0) {
  if (index >= tree.length) {
    return null
  }

  const currentNode = tree[index]
  const updatedParents = parents.concat(currentNode)

  if (currentNode.key === targetKey) {
    return updatedParents
  }

  if (currentNode.children) {
    const result = findParentsTailRecursive(currentNode.children, targetKey, updatedParents) as any
    if (result) {
      return result || [] // 这里直接返回递归调用的结果
    }
  }
  return findParentsTailRecursive(tree, targetKey, parents, index + 1)
}

export default null
