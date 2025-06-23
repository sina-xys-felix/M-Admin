export interface Pageable {
  current: number
  pageSize: number
  total: number
}

export interface TableStateProps {
  tableData: any[]
  pageable: Pageable
  searchParam: {
    [key: string]: unknown
  }
  searchInitParam: {
    [key: string]: unknown
  }
  totalParam: {
    [key: string]: unknown
  }
  icon?: {
    [key: string]: unknown
  }
}
