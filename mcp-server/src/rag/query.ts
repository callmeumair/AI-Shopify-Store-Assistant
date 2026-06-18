import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

export async function queryStoreKnowledge(query: string, topK = 5) {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const index = pinecone.index(process.env.PINECONE_INDEX!);
  const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
  
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex: index });
  const results = await vectorStore.similaritySearchWithScore(query, topK);
  
  return results.map(([r, score]) => ({
    content: r.pageContent,
    metadata: r.metadata,
    relevance: score
  }));
}
