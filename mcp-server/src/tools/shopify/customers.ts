import { z } from 'zod';
import { DataType } from '@shopify/shopify-api';
import { shopifyClient } from '../../clients/shopify.js';

export const getCustomersTool = {
  name: 'get_customers',
  description: 'List customers with search',
  inputSchema: {
    shape: {
      query: z.string().optional().describe('Search query'),
      limit: z.number().optional().default(10).describe('Number of customers to retrieve'),
    }
  },
  handler: async (input: any) => {
    try {
      if (input.query) {
        const response = await shopifyClient.get({ path: 'customers/search', query: { query: input.query, limit: String(input.limit) } });
        return { customers: response.body.customers };
      }
      const response = await shopifyClient.get({ path: 'customers', query: { limit: String(input.limit) } });
      return { customers: response.body.customers };
    } catch (err: any) {
      throw new Error(`Failed to get customers: ${err.message}`);
    }
  }
};

export const getCustomerByIdTool = {
  name: 'get_customer_by_id',
  description: 'Customer details + order history',
  inputSchema: {
    shape: {
      id: z.string().describe('Customer ID'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.get({ path: `customers/${input.id}` });
      const customer = response.body.customer;
      
      // Also fetch their orders
      const ordersResponse = await shopifyClient.get({ path: 'orders', query: { customer_id: input.id } });
      customer.orders = ordersResponse.body.orders;
      
      return customer;
    } catch (err: any) {
      throw new Error(`Failed to get customer: ${err.message}`);
    }
  }
};

export const createCustomerTool = {
  name: 'create_customer',
  description: 'Add new customer',
  inputSchema: {
    shape: {
      first_name: z.string().describe('First name'),
      last_name: z.string().describe('Last name'),
      email: z.string().email().describe('Email address'),
      phone: z.string().optional().describe('Phone number'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.post({
        path: 'customers',
        data: { customer: input },
        type: DataType.JSON
      });
      return response.body.customer;
    } catch (err: any) {
      throw new Error(`Failed to create customer: ${err.message}`);
    }
  }
};

export const updateCustomerTool = {
  name: 'update_customer',
  description: 'Update customer details',
  inputSchema: {
    shape: {
      id: z.string().describe('Customer ID'),
      first_name: z.string().optional().describe('First name'),
      last_name: z.string().optional().describe('Last name'),
      email: z.string().email().optional().describe('Email address'),
      phone: z.string().optional().describe('Phone number'),
    }
  },
  handler: async (input: any) => {
    const { id, ...data } = input;
    try {
      const response = await shopifyClient.put({
        path: `customers/${id}`,
        data: { customer: { id, ...data } },
        type: DataType.JSON
      });
      return response.body.customer;
    } catch (err: any) {
      throw new Error(`Failed to update customer: ${err.message}`);
    }
  }
};
