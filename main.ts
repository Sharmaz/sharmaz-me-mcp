import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Sharmaz Portfolio",
  version: "0.1.0",
});

if (!process.env.API_KEY || !process.env.API_URL || !process.env.USER_ID || !process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
  console.error('API_KEY, API_URL, USER_ID, USER_EMAIL, and USER_PASSWORD are required but not set in the environment variables.');
  process.exit(1);
}

const config = {
  apiKey: process.env.API_KEY,
  apiUrl: process.env.API_URL,
  userId: process.env.USER_ID,
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
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
);

server.tool(
  'create-project',
  'Tool to create a project at portfolio using the Sharmaz API',
  {
    name: z.string().describe("Name of the project to create"),
    description: z.string().describe("Description of the project to create"),
    demoLink: z.string().describe("Demo link of the project to create"),
    githubLink: z.string().describe("Github link of the project to create"),
    imageLink: z.string().describe("Image link of the project to create"),
    tagList: z.array(z.string()).describe("Tags of the project to create"),
  },

  async ({ name, description, demoLink, githubLink, imageLink, tagList }) => {
    const loginData = {
      email: config.userEmail,
      password: config.userPassword,
    }

    const data = await fetch(`${config.apiUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const userData = await data.json();

    if (userData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `user data not found`
          }
        ]
      }
    }

    const createProject = await fetch(`${config.apiUrl}/api/v1/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        githubLink,
        demoLink,
        imageLink,
        tags: {
          list: tagList,
        }
      }),
    });

    const createdProjectData = await createProject.json();

    if (createdProjectData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `The project ${name} was not created`
          }
        ]
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(createdProjectData, null, 2)
        }
      ]
    }
  }
);

server.tool(
  'update-project',
  'Tool to update a project at portfolio using the Sharmaz API',
  {
    name: z.string().describe("Name of the project to create"),
    description: z.string().describe("Description of the project to create"),
    demoLink: z.string().describe("Demo link of the project to create"),
    githubLink: z.string().describe("Github link of the project to create"),
    imageLink: z.string().describe("Image link of the project to create"),
    tagList: z.array(z.string()).describe("Tags of the project to create"),
    projectId: z.string().describe("ID of the project to update"),
  },

  async ({ name, description, demoLink, githubLink, imageLink, tagList, projectId }) => {
    const loginData = {
      email: config.userEmail,
      password: config.userPassword,
    }

    const data = await fetch(`${config.apiUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const userData = await data.json();

    if (userData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `user data not found`
          }
        ]
      }
    }

    const updatedProject = await fetch(`${config.apiUrl}/api/v1/projects/${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        name,
        description,
        githubLink,
        demoLink,
        imageLink,
        tags: {
          list: tagList,
        }
      }),
    });

    const updatedProjectData = await updatedProject.json();

    if (updatedProjectData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `The project ${name} was not updated`
          }
        ]
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(updatedProjectData, null, 2)
        }
      ]
    }
  }
);

server.tool(
  'delete-project',
  'Tool to delete a project at portfolio using the Sharmaz API',
  {
    name: z.string().describe("Name of the project to create"),
    projectId: z.string().describe("ID of the project to delete"),
  },

  async ({ name, projectId }) => {
    const loginData = {
      email: config.userEmail,
      password: config.userPassword,
    }

    const data = await fetch(`${config.apiUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const userData = await data.json();

    if (userData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `user data not found`
          }
        ]
      }
    }

    const deletedProject = await fetch(`${config.apiUrl}/api/v1/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      }
    });

    const deletedProjectData = await deletedProject.json();

    if (deletedProjectData.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `The project ${name} was not deleted`
          }
        ]
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `The project ${name} was deleted`
        }
      ]
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
