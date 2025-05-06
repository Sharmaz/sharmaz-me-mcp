import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Sharmaz Portfolio",
  version: "0.1.0",
});

server.tool(
  'fetch-portfolio',
  'Tool to fetch the portfolio information from the Sharmaz API',
  {
    sideProjectName: z.string().describe("The side project name"),
  },
  async ({ sideProjectName }) => {
    return {
      content: [
        {
          type: "text",
          text: `The project ${sideProjectName} is a side project of Sharmaz. It is a portfolio project that showcases the skills and expertise of the developer.`
        }
      ]
    }
  }
)

const transport = new StdioServerTransport();
await server.connect(transport);
