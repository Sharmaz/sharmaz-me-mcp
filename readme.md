# Sharmaz Portfolio MCP Server
An MCP Server implementation that integrates [sharmaz portfolio](https://sharmaz.github.io/me/) API.

## Tools
Fetch:
- Portfolio

Create, update, and delete:
- Profile
- Jobs
- Projects


## Configuration

### Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:

### NPX

```json
"portfolio": {
  "command": "npx",
  "args": [
    "-y",
    "[your local directory]/sharmaz-me-mcp/bin/cli.js"
  ],
  "env": {
    "API_KEY": "****************",
    "API_URL": "****************",
    "USER_ID": "****************",
    "USER_EMAIL": "****************",
    "USER_PASSWORD": "****************" 
  }
}
```
