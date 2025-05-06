import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Sharmaz Portfolio",
  version: "0.1.0",
});

if (!process.env.API_KEY || !process.env.API_URL || !process.env.USER_ID) {
  console.error('API_KEY, API_URL, and USER_ID are required but not set in the environment variables.');
  process.exit(1);
}

const config = {
  apiKey: process.env.API_KEY,
  apiUrl: process.env.API_URL,
  userId: process.env.USER_ID,
};

server.tool(
  'fetch-portfolio',
  'Tool to fetch the portfolio information from the Sharmaz API',
  {
    portfolio: z.string().describe("All elements at the portfolio"),
  },
  async ({ portfolio }) => {
    const data = await fetch(`${config.apiUrl}/api/v1/users/${config.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        api: config.apiKey || '',
      },
    });

    const portfolioData = await data.json();

    if (portfolioData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `The portfolio ${portfolio} not found`
          }
        ]
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(portfolioData, null, 2)
        }
      ]
    }
  }
)

const transport = new StdioServerTransport();
await server.connect(transport);
