import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { shopifyClient } from '../clients/shopify.js';
import fs from 'fs';
import path from 'path';

export async function ingestStoreData() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(process.env.PINECONE_INDEX!);
  const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
  
  const documents: Document[] = [];

  // 1. Ingest Products
  try {
    const productsRes = await shopifyClient.get({ path: 'products', query: { limit: '250' } });
    const products = productsRes.body.products as any[];
    for (const product of products) {
      documents.push(new Document({
        pageContent: `Product: ${product.title}\nDescription: ${product.body_html}\nPrice: ${product.variants?.[0]?.price}\nTags: ${product.tags}`,
        metadata: { type: 'product', id: product.id, title: product.title }
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch products for ingestion:', err);
  }

  // 2. Ingest Store Policies
  try {
    const policiesRes = await shopifyClient.get({ path: 'policies' });
    const policiesList = policiesRes.body.policies as any[];
    if (policiesList) {
      for (const p of policiesList) {
        if (p && p.body) {
          documents.push(new Document({
            pageContent: `${p.title}: ${p.body}`,
            metadata: { type: 'policy', handle: p.handle || p.title }
          }));
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch policies for ingestion:', err);
  }

  // 3. Ingest custom FAQs
  try {
    const faqsPath = path.join(process.cwd(), 'src/rag/faqs.json');
    const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));
    for (const faq of faqs) {
      documents.push(new Document({
        pageContent: `Q: ${faq.question}\nA: ${faq.answer}`,
        metadata: { type: 'faq', category: faq.category }
      }));
    }
  } catch (err) {
    console.warn('Failed to load FAQs for ingestion:', err);
  }

  if (documents.length === 0) {
    return { ingested: 0, message: 'No documents to ingest.' };
  }

  // Split and embed
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  const chunks = await splitter.splitDocuments(documents);

  await PineconeStore.fromDocuments(chunks, embeddings, { pineconeIndex: index });
  
  return { ingested: chunks.length };
}
