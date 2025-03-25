# Synchronous Chat App (MERN Stack)

A synchronous chat web application built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to send Direct Messages (DMs) and participate in group chats.
- Live Demo: [Visit Syncronus Chat App](https://syncronus-chat-app.netlify.app)


## Features
- Real-time chat
- Direct Messaging (DM)
- Group Chat support
- User authentication using JWT
- File upload using Multer
- TailwindCSS for styling
- Responsive UI using Radix UI and TailwindCSS

## Technologies Used
- **MongoDB**: Database for storing user and message data.
- **Express**: Backend server framework.
- **React**: Frontend framework.
- **Node.js**: JavaScript runtime for building the server.
- **Socket.io**: Real-time communication between client and server.
- **JWT (JSON Web Token)**: Authentication mechanism.
- **Multer**: Middleware for handling file uploads.
- **TailwindCSS**: Utility-first CSS framework.
- **Radix UI**: Accessible UI components for building the app.

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (version >=16)
- **MongoDB** (running locally or use MongoDB Atlas)
- **Git**

## Getting Started

Follow these steps to clone and run the application locally.

### 1. Clone the repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/synchronous-chat-app.git
cd synchronous-chat-app

```

### 2. Set up the backend
Install dependencies
Navigate to the backend folder (server) and install the necessary dependencies:
```bash
cd server
npm install

```
Configure environment variables
Copy the .env.example file and rename it to .env in the server folder. Then, update the variables in the .env file:

```bash
PORT=8747
JWT_KEY="your_jwt_secret_key"
ORIGIN="http://localhost:5173"  # Make sure this is the correct frontend URL
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/your_database_name"
```

- Set PORT to the port on which the backend will run.

- Set JWT_KEY to a secret key for signing JWT tokens.

- Set ORIGIN to the frontend URL for handling CORS.

- Set DATABASE_URL to your MongoDB connection URL (either local or MongoDB Atlas).

Start the backend server

Start the backend server by running:

```bash
npm run dev
```
The backend server will run on http://localhost:8747.

### 3. Set up the frontend
Install dependencies
Now, navigate to the frontend folder (frontend) and install the necessary dependencies:
```bash
cd frontend
npm install
```
Configure environment variables
Create a .env file in the frontend folder and add the following content:

```bash
VITE_SERVER_URL="http://localhost:8747"
```
This environment variable will point the frontend to the backend server.

Start the frontend server
Start the frontend server by running:
```bash
npm run dev
```
The frontend will run on http://localhost:5173.

### 4. Testing
Once both the frontend and backend servers are running, you can visit the frontend at 
http://localhost:5173 and interact with the chat application.

- Sign up and log in to access your account.

- Send Direct Messages (DMs) and join Group Chats.

- Messages should be delivered in real-time.

- You can also upload files using Multer, which will be handled by the backend.

### Deployment
#### Frontend Deployment
For deploying the frontend, you can use platforms like Vercel or Netlify.

- For Vercel, simply link the repository and follow the setup instructions.

- For Netlify, connect the repository and set the build command to npm run build and the publish directory to dist.

### Backend Deployment
For deploying the backend, you can use platforms like Heroku, DigitalOcean, or Render.

- For Heroku, install the Heroku CLI and follow the steps to deploy the backend.

- Make sure to configure the environment variables on the deployment platform.

### MongoDB Deployment
If you are using MongoDB Atlas, you can use their cloud database. Just make sure to update your DATABASE_URL in the .env file with the correct connection string.

