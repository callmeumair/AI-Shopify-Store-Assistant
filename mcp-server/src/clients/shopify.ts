import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || 'dummy',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || 'dummy',
  apiVersion: ApiVersion.October24,
  isCustomStoreApp: true,
  adminApiAccessToken: process.env.SHOPIFY_ACCESS_TOKEN || '',
  isEmbeddedApp: false,
  hostName: process.env.SHOPIFY_SHOP_DOMAIN || 'dummy-store.myshopify.com',
  restResources,
});

const session = shopify.session.customAppSession(process.env.SHOPIFY_SHOP_DOMAIN || 'dummy-store.myshopify.com');
export const shopifyClient = new shopify.clients.Rest({ session });
