// src/mockProd.js
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import mockModules from '../mock/user'; // 导入所有 Mock 文件

export function setupProdMockServer() {
  createProdMockServer([...mockModules]);
}