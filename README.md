## Blog Functionality

A modern blog application built with React and Vite, designed to demonstrate core CRUD operations (Create, Read, Update, Delete) for blog posts. The project uses React Router for navigation, Axios for data handling (API calls or local JSON), and standard React hooks for state management and lifecycle control.

## Project Overview

This project serves as a foundation for building a complete blog platform. It allows users to:

View a list of all blog posts

View individual post details

Create new posts

Edit or delete existing posts

## Tech Stack

| Category               | Technology                                              | Purpose                                       |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------- |
| **Frontend Framework** | React (via Vite)                                        | Fast SPA development                          |
| **Routing**            | react-router-dom                                        | Page navigation (Home, Post, Create, Edit)    |
| **HTTP Client**        | axios                                                   | Fetching data from mock or backend API        |
| **State Management**   | React hooks (`useState`, `useEffect`)                   | Local state and lifecycle control             |
| **Styling**            | CSS / Tailwind / Styled Components (depending on setup) | UI styling                                    |
| **Build Tool**         | Vite                                                    | Lightning-fast development server and bundler |



## Dependencies
"dependencies": {
  "axios": "^1.6.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "react-router-dom": "^6.22.0"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.0.0",
  "vite": "^5.0.0"
}

## Routing Setup

All routes are managed with react-router-dom


 ## Component Logic
 
| Component          | Description                                      | Key Methods / Hooks        |
| ------------------ | ------------------------------------------------ | -------------------------- |
| **Header.jsx**     | Navigation links between Home, Create Post, etc. | —                          |
| **PostList.jsx**   | Displays all posts fetched from API              | `useEffect`, `map()`       |
| **PostCard.jsx**   | Displays summary (title, excerpt, date)          | Props passing              |
| **PostForm.jsx**   | Handles new post creation/editing                | `handleSubmit`, `useState` |
| **PostDetail.jsx** | Shows full post, comments                        | `useParams`, `axios.get()` |
| **CommentBox.jsx** | Adds local comments                              | `useState`, `setComments`  |


## Demo




https://github.com/user-attachments/assets/02ed5735-190f-495e-8f3b-9d888bf67826




