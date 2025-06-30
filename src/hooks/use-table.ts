import { TableStateProps } from '@/common/types/table'
import { AnyObject, Pagination } from '@/common/types/global'
import useLoading from '@/hooks/loading'

const { loading, setLoading } = useLoading(false)

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export const useTable = (
  api?: (params: { [key: string]: unknown }) => Promise<any>,
  initParam: { [key: string]: unknown } = {},
  isPageable = true,
  fillRows = false,
  dataCallBack?: (data: AnyObject) => AnyObject
) => {
  const state = reactive<TableStateProps>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      current: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0,
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: initParam,
    // 总参数(包含分页和查询参数)
    totalParam: {},
  })

  /**
   * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
   * */
  const pageParam = computed({
    get: () => {
      return {
        current: state.pageable.current,
        pageSize: state.pageable.pageSize,
      }
    },
    set: (newVal: AnyObject) => {
      console.log('我是分页更新之后的值', newVal)
    },
  })

  /**
   * @description 获取表格数据
   * @return void
   * */
  const getTableList = async () => {
    if (!api) return
    setLoading(true)
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, state.searchInitParam, state.searchParam, isPageable ? pageParam.value : {})
      const params = filterParams(state.totalParam)
      let data = await api!(params)
      const maxRows = isPageable ? state.pageable.pageSize : 15
      // 如果后台有分页数据返回，则在这里进行解构赋值
      if (dataCallBack) {
        data = dataCallBack(data)
        if (fillRows) {
          if (data.list.length >= maxRows) {
            // state.tableData = data?.list
            state.tableData = isPageable ? data?.list : data
          } else {
            const diffValue = maxRows - data?.list.length
            const fillList = new Array(diffValue).fill({})
            state.tableData = [...data?.list, ...fillList]
          }
        } else {
          state.tableData = data?.list
        }

        isPageable &&
          updatePageable({
            current: state.pageable.current,
            pageSize: state.pageable.pageSize,
            total: data?.total ?? 0,
          })
      } else {
        // state.tableData = isPageable ? data?.items : data
        if (fillRows) {
          if (data.items.length >= maxRows) {
            state.tableData = isPageable ? data?.items : data
          } else {
            const diffValue = maxRows - data?.list.length
            const fillList = new Array(diffValue).fill({})
            state.tableData = isPageable ? [...data?.items, ...fillList] : [...data, ...fillList]
          }
        } else {
          state.tableData = isPageable ? data?.items : data
        }

        isPageable &&
          updatePageable({
            current: state.pageable.current,
            pageSize: state.pageable.pageSize,
            total: data?.total ?? 0,
          })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const filterParams = (params: { [key: string]: unknown }) => {
    const obj: { [key: string]: unknown } = {}
    for (const key in params) {
      if (key !== 'current' && key !== 'pageSize') {
        obj[key] = params[key]
      }
    }
    return {
      index: params.current,
      size: params.pageSize,
      ...obj,
    }
  }

  /**
   * @description 更新查询参数
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    const nowSearchParam: { [key: string]: unknown } = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (const key in state.searchParam) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  /**
   * @description 更新分页信息
   * @param {Object} resPageable 后台返回的分页数据
   * @return void
   * */
  const updatePageable = (resPageable: Pagination) => {
    Object.assign(state.pageable, resPageable)
  }

  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    state.pageable.current = 1
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   * */
  const reset = (remember?: boolean) => {
    state.pageable.current = 1
    state.pageable.pageSize = 15
    state.searchParam = {}
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    if (remember) {
      state.searchInitParam = {}
    } else {
      Object.keys(state.searchInitParam).forEach((key) => {
        state.searchParam[key] = state.searchInitParam[key]
      })
    }
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 每页条数改变
   * @param {Number} pageSize 当前条数
   * @return void
   * */
  const handleSizeChange = (pageSize: number) => {
    state.pageable.current = 1
    state.pageable.pageSize = pageSize
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} current 当前页
   * @return void
   * */
  const handleCurrentChange = (current: number) => {
    state.pageable.current = current
    getTableList()
  }

  return {
    ...toRefs(state),
    loading,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  }
}
