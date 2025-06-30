import { AnyObject } from '@/common/types/global'
import { ref } from 'vue'

/**
 * @description 表格多选数据操作
 * @param {String} selectId 当表格可以多选时，所指定的 id
 * */
export const useSelection = (selectId = 'id') => {
  // 是否选中数据
  const isSelected = ref<boolean>(false)
  // 选中的数据列表
  const selectedList = ref([])
  // 选中数据的rowKey
  const selectedListIds = ref([])

  // 获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
  const getRowKeys = (row: AnyObject) => {
    return row[selectId] as string
  }

  /**
   * @description 多选操作
   * @param {Array} record 当前选择行的所有数据
   * @return void
   */
  const selectionChange = (rowKeys: (string | number)[] ) => {
    selectedListIds.value = rowKeys
    rowKeys.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
  }

  /**
   * @description 清空选中的行
   * @returns void
   * */
  const clearSelection = () => {
    selectedList.value = []
    selectedListIds.value = []
    isSelected.value = false
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
    getRowKeys,
    clearSelection,
  }
}
