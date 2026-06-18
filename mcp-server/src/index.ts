import dotenv from 'dotenv';
dotenv.config();

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { shopifyTools } from './tools/shopify/index.js';
import { ragTools } from './tools/rag.js';
import express from 'express';
import cors from 'cors';

const server = new McpServer({
  name: 'shopify-agent',
  version: '1.0.0',
});

// Register tools
const allTools = [...shopifyTools, ...ragTools];
for (const tool of allTools) {
  server.tool(
    tool.name, 
    tool.description, 
    tool.inputSchema.shape, 
    async (args: any) => {
      const result = await tool.handler(args);
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}

// Since the client asks for an HTTP server on port 3001
const app = express();
app.use(cors());
app.use(express.json());

app.get('/tools', (req, res) => {
  const toolsInfo = allTools.map(t => ({
    name: t.name,
    description: t.description,
    input_schema: {
      type: "object",
      properties: Object.fromEntries(
        Object.entries(t.inputSchema.shape).map(([k, v]: [string, any]) => {
            const def = v._def;
            return [k, { type: def.typeName.replace('Zod', '').toLowerCase(), description: def.description }];
        })
      )
    }
  }));
  res.json(toolsInfo);
});

// We can also support HTTP POST to execute tools if the client prefers
app.post('/tools/:name', async (req, res) => {
  const toolName = req.params.name;
  const tool = allTools.find(t => t.name === toolName);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  
  try {
    const result = await tool.handler(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MCP HTTP Server running on port ${PORT}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
