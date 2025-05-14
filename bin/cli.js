#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSharmazMcp } from "../dist/index.js";

const config = {
  apiKey: process.env.API_KEY || "",
  apiUrl: process.env.API_URL || "",
  userId: process.env.USER_ID || "",
  userEmail: process.env.USER_EMAIL || "",
  userPassword: process.env.USER_PASSWORD || "",
};

if (!config.apiKey || !config.apiUrl || !config.userId || !config.userEmail || !config.userPassword) {
  console.error("Missing required config. Set API_KEY, API_URL, USER_ID, USER_EMAIL, USER_PASSWORD as env vars.");
  process.exit(1);
}

const server = new McpServer({
  name: "Sharmaz Portfolio",
  version: "1.0.0",
});

await registerSharmazMcp(server, config);

const transport = new StdioServerTransport();
await server.connect(transport);
