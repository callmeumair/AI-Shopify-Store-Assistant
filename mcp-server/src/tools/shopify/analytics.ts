import { z } from 'zod';
import { shopifyClient } from '../../clients/shopify.js';

export const getStoreAnalyticsTool = {
  name: 'get_store_analytics',
  description: 'Revenue, orders, customers (last 30 days)',
  inputSchema: {
    shape: {
      days: z.number().optional().default(30).describe('Number of days to analyze'),
    }
  },
  handler: async (input: any) => {
    try {
      // Shopify Admin API doesn't have a single /analytics endpoint for this
      // We will aggregate it by fetching recent orders
      const dateMin = new Date();
      dateMin.setDate(dateMin.getDate() - input.days);
      
      const ordersResponse = await shopifyClient.get({ 
        path: 'orders', 
        query: { created_at_min: dateMin.toISOString(), status: 'any', limit: '250' } 
      });
      
      const orders = ordersResponse.body.orders as any[];
      let revenue = 0;
      
      orders.forEach(order => {
        revenue += parseFloat(order.total_price);
      });
      
      return {
        revenue,
        orders_count: orders.length,
        period: `${input.days} days`
      };
    } catch (err: any) {
      throw new Error(`Failed to get analytics: ${err.message}`);
    }
  }
};

export const getTopProductsTool = {
  name: 'get_top_products',
  description: 'Best selling products by revenue (approximation from recent orders)',
  inputSchema: {
    shape: {
      limit: z.number().optional().default(5).describe('Number of products to return'),
    }
  },
  handler: async (input: any) => {
    try {
      const ordersResponse = await shopifyClient.get({ 
        path: 'orders', 
        query: { status: 'any', limit: '250' } 
      });
      
      const productRevenue: Record<string, { title: string, revenue: number, quantity: number }> = {};
      
      const orders = ordersResponse.body.orders as any[];
      orders.forEach(order => {
        if (!order.line_items) return;
        order.line_items.forEach((item: any) => {
          if (!productRevenue[item.product_id]) {
            productRevenue[item.product_id] = { title: item.title, revenue: 0, quantity: 0 };
          }
          productRevenue[item.product_id].revenue += parseFloat(item.price) * item.quantity;
          productRevenue[item.product_id].quantity += item.quantity;
        });
      });
      
      const topProducts = Object.values(productRevenue)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, input.limit);
        
      return { top_products: topProducts };
    } catch (err: any) {
      throw new Error(`Failed to get top products: ${err.message}`);
    }
  }
};

export const getAbandonedCheckoutsTool = {
  name: 'get_abandoned_checkouts',
  description: 'List abandoned carts',
  inputSchema: {
    shape: {
      limit: z.number().optional().default(10).describe('Number of abandoned checkouts to retrieve'),
    }
  },
  handler: async (input: any) => {
    try {
      const response = await shopifyClient.get({ path: 'checkouts', query: { limit: String(input.limit) } });
      return { abandoned_checkouts: response.body.checkouts };
    } catch (err: any) {
      throw new Error(`Failed to get abandoned checkouts: ${err.message}`);
    }
  }
};
