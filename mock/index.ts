import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import mockModules from './user'; // 导入所有 Mock 文件

export function setupProdMockServer() {
  createProdMockServer([...mockModules]);
}