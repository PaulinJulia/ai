# AI-tjänst

BODY BALANCE - Your Workout Planner  
Personalized workouts with AI. Get tailored and inspiring workout sessions. With the help of our AI, we create unique workout suggestions that are customized to your level, goals, and preferences—whether you're looking to build muscle, improve your endurance, or simply stay fit. No more guessing what to train; let the workout coach guide you. All you need to do is choose how you want to train, and we'll take care of the rest!

Who is the target group? People who are familiar with working out but want inspiration, a more structured or personalized training plan.

BODY BALANCE promotes a positive, safe and inclusive environment for all users. We avoid pushing extreme fitness goals or unhealthy body ideals, but instead focus on sustainable health and well-being. With the creativity of AI, workouts are customized to meet each individual's unique needs. The platform is in a user-friendly design to cater for a fast quick and easy result.

## How to install

node.js - https://nodejs.org/en/download  
npm - https://www.npmjs.com/

```
git clone https://github.com/PaulinJulia/ai
cd ai
npm install

Create a .env file in the server directory and add the following variables:
MONGODB_URI=<your-connection>
OPENAI_API_KEY=<your-key>

npm run dev
```

## Dependencies and Tools (Frontend)

#### Core Libraries

- React - A JavaScript library for building user interfaces, focusing on component-based architecture for declarative UI development.
- React-Dom - Provides DOM-specific methods for working with React components, allowing them to be rendered to the DOM.

#### HTTP and API Handling

- Axios - A promise-based HTTP client for making API requests, used to handle network requests and interact with backend APIs.

#### Routing and Navigation

- React-Router-Dom - A routing library for React that enables navigation between different pages or views within your React application, allowing for dynamic routing and component rendering based on URL.

#### Icons and UI Components

- React-Icons - A library providing a wide range of customizable icons for React, used to easily include vector icons in your components.

## Dependencies and Tools (Backend)

#### HTTP Handling

- Middleware to enable Cross-Origin Resource Sharing (CORS) in your Express app, allowing your API to handle requests from different domains.
- Express - A minimalist web framework for Node.js, used for creating the backend server and handling HTTP requests.

#### Database Interaction

- Mongoose - An Object Data Modeling (ODM) library for MongoDB, providing schema-based solutions for application data. It allows for the definition of schemas and the creation of models to interact with MongoDB databases.

#### Environment Variables Management

- Dotenv - Loads environment variables from a .env file into process.env, for securely managing sensitive configuration data.

#### Development and Typescript

- Typescript - The TypeScript compiler, used to transpile TypeScript code to JavaScript for production.
- Tsx - A TypeScript execution engine for Node.js that allows running .ts and .tsx files directly without prior compilation.
- Nodemon - A development tool that automatically restarts the server when file changes are detected, improving development workflow.

#### AI Integration

- OpenAI - A library for interacting with OpenAI's GPT models, used to integrate modern AI capabilities into your application, such as generating text or completing tasks with AI-powered responses.

## Usage



## About

This project was undertaken by a single individual as part of an Artificial Intelligence (AI) course, with the aim of using modern AI technology. There are no plans to continue the project after the course ends.

## Support

email: julia.paulin@chasacademy.se
