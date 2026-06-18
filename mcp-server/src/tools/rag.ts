import { z } from 'zod';
import { queryStoreKnowledge } from '../rag/query.js';
import { ingestStoreData } from '../rag/ingest.js';

export const searchStoreKnowledgeTool = {
  name: 'search_store_knowledge',
  description: 'Semantic search over policies, FAQs, product descriptions',
  inputSchema: {
    shape: {
      query: z.string().describe('Search query'),
      top_k: z.number().optional().default(5).describe('Number of results to return'),
    }
  },
  handler: async (input: any) => {
    try {
      return await queryStoreKnowledge(input.query, input.top_k);
    } catch (err: any) {
      throw new Error(`Failed to search knowledge base: ${err.message}`);
    }
  }
};

export const ingestStoreDataTool = {
  name: 'ingest_store_data',
  description: 'Re-index store data into vector DB (products, policies, faqs)',
  inputSchema: {
    shape: {}
  },
  handler: async (input: any) => {
    try {
      return await ingestStoreData();
    } catch (err: any) {
      throw new Error(`Failed to ingest data: ${err.message}`);
    }
  }
};

export const ragTools = [
  searchStoreKnowledgeTool,
  ingestStoreDataTool,
];
