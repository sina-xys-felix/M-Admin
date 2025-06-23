import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mockUser from './user'
import mockAnalysis from './analysis'
import mockDict from './dict'
import mockMenu from './menu'
import mockRole from './role'
import mockTable from './table'
import mockMessage from './message'

export function setupProdMockServer() {
  createProdMockServer([
    ...mockUser,
    ...mockAnalysis,
    ...mockDict,
    ...mockMenu,
    ...mockRole,
    ...mockTable,
    ...mockMessage,
  ])
}
