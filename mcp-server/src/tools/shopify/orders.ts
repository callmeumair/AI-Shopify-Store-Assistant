import { z } from 'zod';
import { DataType } from '@shopify/shopify-api';
import { shopifyClient } from '../../clients/shopify.js';

export const getOrdersTool = {
  name: 'get_orders',
  description: 'List orders with filters (status, date range, customer)',
  inputSchema: {
    shape: {
      status: z.enum(['open', 'closed', 'cancelled', 'any']).optional().default('any').describe('Filter by order status'),
      limit: z.number().optional().default(10).describe('Number of orders to retrieve'),
      customer_id: z.string().optional().describe('Filter by customer ID'),
      created_at_min: z.string().optional().describe('Minimum creation date (ISO 8601)'),
    }
  },
  handler: async (input: any) => {
    try {
      const query: Record<string, string> = { status: input.status, limit: String(input.limit) };
      if (input.customer_id) query.customer_id = input.customer_id;
      if (input.created_at_min) query.created_at_min = input.created_at_min;

      const response = await shopifyClient.get({ path: 'orders', query });
      return { orders: response.body.orders };
    } catch (err: any) {
      throw new Error(`Failed to get orders: ${err.message}`);
    }
  }
};

export const getOrderByIdTool = {
  name: 'get_order_by_id',
  description: 'Full order details with line items, shipping, customer',
  inputSchema: {
    shape: {
      id: z.string().describe('Order ID'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.get({ path: `orders/${input.id}` });
      return response.body.order;
    } catch (err: any) {
      throw new Error(`Failed to get order: ${err.message}`);
    }
  }
};

export const updateOrderStatusTool = {
  name: 'update_order_status',
  description: 'Mark orders as fulfilled or cancelled. Note: to cancel pass action="cancel".',
  inputSchema: {
    shape: {
      id: z.string().describe('Order ID'),
      action: z.enum(['cancel', 'close', 'open']).describe('Action to perform'),
    }
  },
  handler: async (input: any) => {
    try {
      const path = `orders/${input.id}/${input.action}`;
      const response = await shopifyClient.post({ path, type: DataType.JSON, data: {} });
      return response.body.order;
    } catch (err: any) {
      throw new Error(`Failed to update order status: ${err.message}`);
    }
  }
};

export const createFulfillmentTool = {
  name: 'create_fulfillment',
  description: 'Create fulfillment with tracking info',
  inputSchema: {
    shape: {
      order_id: z.string().describe('Order ID'),
      location_id: z.string().describe('Location ID where the fulfillment happened'),
      tracking_number: z.string().optional().describe('Tracking number'),
      tracking_urls: z.array(z.string()).optional().describe('Tracking URLs'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.post({
        path: `orders/${input.order_id}/fulfillments`,
        data: {
          fulfillment: {
            location_id: input.location_id,
            tracking_number: input.tracking_number,
            tracking_urls: input.tracking_urls,
          }
        },
        type: DataType.JSON
      });
      return response.body.fulfillment;
    } catch (err: any) {
      throw new Error(`Failed to create fulfillment: ${err.message}`);
    }
  }
};

export const getOrderCountTool = {
  name: 'get_order_count',
  description: 'Count orders by status',
  inputSchema: {
    shape: {
      status: z.enum(['open', 'closed', 'cancelled', 'any']).optional().default('any').describe('Status to count'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.get({ path: 'orders/count', query: { status: input.status } });
      return { count: response.body.count };
    } catch (err: any) {
      throw new Error(`Failed to get order count: ${err.message}`);
    }
  }
};
