import { z } from 'zod';
import { DataType } from '@shopify/shopify-api';
import { shopifyClient } from '../../clients/shopify.js';

export const getProductsTool = {
  name: 'get_products',
  description: 'Retrieve products from the Shopify store. Supports filtering by title, status, and collection.',
  inputSchema: {
    shape: {
      limit: z.number().optional().default(10).describe('Number of products to retrieve'),
      status: z.enum(['active', 'draft', 'archived']).optional().describe('Filter by status'),
      title: z.string().optional().describe('Filter by title'),
      collection_id: z.string().optional().describe('Filter by collection ID'),
    }
  },
  handler: async (input: any) => {
    const params = new URLSearchParams();
    params.append('limit', String(input.limit || 10));
    if (input.status) params.append('status', input.status);
    if (input.title) params.append('title', input.title);
    if (input.collection_id) params.append('collection_id', input.collection_id);
    
    try {
      const response = await shopifyClient.get({ path: 'products', query: Object.fromEntries(params) });
      return {
        products: response.body.products,
        count: Array.isArray(response.body.products) ? response.body.products.length : 0,
      };
    } catch (err: any) {
      throw new Error(`Failed to get products: ${err.message}`);
    }
  }
};

export const getProductByIdTool = {
  name: 'get_product_by_id',
  description: 'Fetch single product with all variants',
  inputSchema: {
    shape: {
      id: z.string().describe('Product ID'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.get({ path: `products/${input.id}` });
      return response.body.product;
    } catch (err: any) {
      throw new Error(`Failed to get product: ${err.message}`);
    }
  }
};

export const createProductTool = {
  name: 'create_product',
  description: 'Create new product with title, description, price, images, variants',
  inputSchema: {
    shape: {
      title: z.string().describe('Product title'),
      body_html: z.string().optional().describe('Product description'),
      vendor: z.string().optional().describe('Product vendor'),
      product_type: z.string().optional().describe('Product type'),
      variants: z.array(z.object({
        price: z.string(),
        sku: z.string().optional()
      })).optional().describe('Product variants'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.post({
        path: 'products',
        data: { product: input },
        type: DataType.JSON
      });
      return response.body.product;
    } catch (err: any) {
      throw new Error(`Failed to create product: ${err.message}`);
    }
  }
};

export const updateProductTool = {
  name: 'update_product',
  description: 'Update any product field',
  inputSchema: {
    shape: {
      id: z.string().describe('Product ID'),
      title: z.string().optional().describe('Product title'),
      body_html: z.string().optional().describe('Product description'),
      status: z.enum(['active', 'draft', 'archived']).optional().describe('Product status'),
    }
  },
  handler: async (input: any) => {
    const { id, ...data } = input;
    try {
      const response = await shopifyClient.put({
        path: `products/${id}`,
        data: { product: { id, ...data } },
        type: DataType.JSON
      });
      return response.body.product;
    } catch (err: any) {
      throw new Error(`Failed to update product: ${err.message}`);
    }
  }
};

export const deleteProductTool = {
  name: 'delete_product',
  description: 'Delete a product',
  inputSchema: {
    shape: {
      id: z.string().describe('Product ID'),
    }
  },
  handler: async (input: any) => {
    try {
      await shopifyClient.delete({ path: `products/${input.id}` });
      return { success: true };
    } catch (err: any) {
      throw new Error(`Failed to delete product: ${err.message}`);
    }
  }
};

export const getInventoryLevelsTool = {
  name: 'get_inventory_levels',
  description: 'Get current inventory for all products',
  inputSchema: {
    shape: {
      location_ids: z.string().optional().describe('Comma-separated list of location IDs'),
      inventory_item_ids: z.string().optional().describe('Comma-separated list of inventory item IDs'),
    }
  },
  handler: async (input: any) => {
    try {
      const query: Record<string, string> = {};
      if (input.location_ids) query.location_ids = input.location_ids;
      if (input.inventory_item_ids) query.inventory_item_ids = input.inventory_item_ids;
      
      const response = await shopifyClient.get({ path: 'inventory_levels', query });
      return response.body.inventory_levels;
    } catch (err: any) {
      throw new Error(`Failed to get inventory levels: ${err.message}`);
    }
  }
};

export const updateInventoryTool = {
  name: 'update_inventory',
  description: 'Update inventory levels at specific location',
  inputSchema: {
    shape: {
      location_id: z.string().describe('Location ID'),
      inventory_item_id: z.string().describe('Inventory item ID'),
      available: z.number().describe('New available quantity'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.post({
        path: 'inventory_levels/set',
        data: input,
        type: DataType.JSON
      });
      return response.body.inventory_level;
    } catch (err: any) {
      throw new Error(`Failed to update inventory: ${err.message}`);
    }
  }
};
