import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface SharmazMcpConfig {
  apiKey: string;
  apiUrl: string;
  userId: string;
  userEmail: string;
  userPassword: string;
}

export async function registerSharmazMcp(server: McpServer, config: SharmazMcpConfig) {
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
    'create-profile',
    'Tool to create a profile at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the profile to create"),
      profilePic: z.string().describe("Profile picture of the profile to create"),
      about: z.string().describe("About of the profile to create"),
      blog: z.string().describe("Blog of the profile to create"),
      github: z.string().describe("Github of the profile to create"),
      linkedIn: z.string().describe("Linkedin of the profile to create"),
      twitter: z.string().describe("Twitter of the profile to create"),
      resume: z.string().describe("Resume of the profile to create"),
    },
  
    async ({ name, profilePic, about, blog, github, linkedIn, twitter, resume }) => {
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
  
      const createProfile = await fetch(`${config.apiUrl}/api/v1/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          name,
          profilePic,
          about,
          blog,
          github,
          linkedIn,
          twitter,
          resume,
        }),
      });
  
      const createdProfileData = await createProfile.json();
  
      if (createdProfileData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The profile ${name} was not created`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(createdProfileData, null, 2)
          }
        ]
      }
    }
  );
  
  server.tool(
    'update-profile',
    'Tool to update a profile at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the profile to update"),
      profilePic: z.string().describe("Profile picture of the profile to update"),
      about: z.string().describe("About of the profile to update"),
      blog: z.string().describe("Blog of the profile to update"),
      github: z.string().describe("Github of the profile to update"),
      linkedIn: z.string().describe("Linkedin of the profile to update"),
      twitter: z.string().describe("Twitter of the profile to update"),
      resume: z.string().describe("Resume of the profile to update"),
      profileId: z.string().describe("ID of the profile to update"),
    },
  
    async ({ name, profilePic, about, blog, github, linkedIn, twitter, resume, profileId }) => {
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
  
      const updatedProfile = await fetch(`${config.apiUrl}/api/v1/profiles/${profileId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          name,
          profilePic,
          about,
          blog,
          github,
          linkedIn,
          twitter,
          resume,
        }),
      });
  
      const updatedProfileData = await updatedProfile.json();
  
      if (updatedProfileData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The profile ${name} was not updated`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(updatedProfileData, null, 2)
          }
        ]
      }
    }
  );
  
  server.tool(
    'delete-profile',
    'Tool to delete a profile at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the portfolio to delete"),
      profileId: z.string().describe("ID of the portfolio to delete"),
    },
  
    async ({ name, profileId }) => {
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
  
      const deletedProfile = await fetch(`${config.apiUrl}/api/v1/profiles/${profileId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        }
      });
  
      const deletedProfileData = await deletedProfile.json();
  
      if (deletedProfileData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The profile ${name} was not deleted`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: `The profile ${name} was deleted`
          }
        ]
      }
    }
  );
  
  server.tool(
    'create-job',
    'Tool to create a job at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the job to create"),
      dateStarted: z.string().describe("Date started of the job to create"),
      dateEnded: z.string().describe("Date ended of the job to create"),
      description: z.string().describe("Description of the job to create"),
      role: z.string().describe("Role of the job to create"),
      detailList: z.array(z.string()).describe("Tags of the job to create"),
    },
  
    async ({ name, description, dateStarted, dateEnded, role, detailList }) => {
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
  
      const createJob = await fetch(`${config.apiUrl}/api/v1/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          name,
          description,
          dateStarted,
          dateEnded,
          role,
          details: {
            list: detailList,
          }
        }),
      });
  
      const createdJobData = await createJob.json();
  
      if (createdJobData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The job ${name} was not created`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(createdJobData, null, 2)
          }
        ]
      }
    }
  );
  
  server.tool(
    'update-job',
    'Tool to update a job at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the job to update"),
      dateStarted: z.string().describe("Date started of the job to update"),
      dateEnded: z.string().describe("Date ended of the job to update"),
      description: z.string().describe("Description of the job to update"),
      role: z.string().describe("Role of the job to update"),
      detailList: z.array(z.string()).describe("Tags of the job to update"),
      jobId: z.string().describe("ID of the job to update"),
    },
  
    async ({ name, description, dateStarted, dateEnded, role, detailList, jobId }) => {
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
  
      const updatedJob = await fetch(`${config.apiUrl}/api/v1/jobs/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          name,
          description,
          dateStarted,
          dateEnded,
          role,
          details: {
            list: detailList,
          }
        }),
      });
  
      const updatedJobData = await updatedJob.json();
  
      if (updatedJobData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The job ${name} was not updated`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(updatedJobData, null, 2)
          }
        ]
      }
    }
  );
  
  server.tool(
    'delete-job',
    'Tool to delete a job at portfolio using the Sharmaz API',
    {
      name: z.string().describe("Name of the job to delete"),
      jobId: z.string().describe("ID of the job to delete"),
    },
  
    async ({ name, jobId }) => {
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
  
      const deletedJob = await fetch(`${config.apiUrl}/api/v1/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        }
      });
  
      const deletedJobData = await deletedJob.json();
  
      if (deletedJobData.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `The job ${name} was not deleted`
            }
          ]
        }
      }
  
      return {
        content: [
          {
            type: "text",
            text: `The job ${name} was deleted`
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
      name: z.string().describe("Name of the project to update"),
      description: z.string().describe("Description of the project to update"),
      demoLink: z.string().describe("Demo link of the project to update"),
      githubLink: z.string().describe("Github link of the project to update"),
      imageLink: z.string().describe("Image link of the project to update"),
      tagList: z.array(z.string()).describe("Tags of the project to update"),
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
      name: z.string().describe("Name of the project to delete"),
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
}
