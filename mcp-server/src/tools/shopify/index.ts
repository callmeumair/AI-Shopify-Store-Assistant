import { 
  getProductsTool, 
  getProductByIdTool, 
  createProductTool, 
  updateProductTool, 
  deleteProductTool, 
  getInventoryLevelsTool, 
  updateInventoryTool 
} from './products.js';

import { 
  getOrdersTool, 
  getOrderByIdTool, 
  updateOrderStatusTool, 
  createFulfillmentTool, 
  getOrderCountTool 
} from './orders.js';

import { 
  getCustomersTool, 
  getCustomerByIdTool, 
  createCustomerTool, 
  updateCustomerTool 
} from './customers.js';

import { 
  getStoreAnalyticsTool, 
  getTopProductsTool, 
  getAbandonedCheckoutsTool 
} from './analytics.js';

export const shopifyTools = [
  getProductsTool,
  getProductByIdTool,
  createProductTool,
  updateProductTool,
  deleteProductTool,
  getInventoryLevelsTool,
  updateInventoryTool,
  getOrdersTool,
  getOrderByIdTool,
  updateOrderStatusTool,
  createFulfillmentTool,
  getOrderCountTool,
  getCustomersTool,
  getCustomerByIdTool,
  createCustomerTool,
  updateCustomerTool,
  getStoreAnalyticsTool,
  getTopProductsTool,
  getAbandonedCheckoutsTool,
];
