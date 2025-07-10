REAL-TIME CHAT APPLICATION

COMPANY: CODTECH IT SOLUTIONS

NAME: PRIYANSHU YADAV

INTERN ID:CT04DG1336

DOMAIN:FRONT END WEB DEVELOPMENT

DURATION: 4 WEEKS

MENTOR: NEELA SANTOSH

PROJECT: Real-Time Chat Application TOOLS & TECHNOLOGIES USED Frontend Framework: React.js Backend Environment: Node.js Real-Time Communication: Socket.io Editor: Visual Studio Code (VS Code) Version Control & Hosting: Git & GitHub Platform: Linux (Ubuntu-based system used during development) TASK DESCRIPTION The task was to develop a real-time chat application as part of a 4-week internship project under the mentorship of Neela Santosh at CodTech IT Solutions. This application is designed to allow users to communicate instantly in a shared chat interface, which updates dynamically as messages are sent and received. The entire project was developed using the MERN (MongoDB, Express, React, Node.js) stack, although in this particular application, we focused primarily on the React frontend and Node.js backend, connected through Socket.io for real-time data transmission.

On the frontend, the application uses React to create a clean and responsive user interface. A single-page layout was built where users can enter a message in a text input field and send it. Once a message is sent, it is immediately broadcasted to all connected clients using web sockets. The frontend codebase includes essential components, a reusable form, and the chat window which dynamically displays the conversation history. Styling was done using App.css, ensuring a responsive layout across devices.

On the backend, a simple Node.js server was created using Express.js. The Socket.io library is used to handle WebSocket connections. When a client connects to the server, they receive a unique socket ID, and every message sent from one client is emitted to all others. The backend also keeps a temporary history of messages in an array so that new clients joining the chat room can receive previous conversations (message history).

One key challenge was managing the dual-terminal setup—one for running the backend server (node index.js) and one for the frontend (npm start inside the client directory). I also had to understand how to set up web sockets, handle message events, and maintain message history in a temporary state.

During development, multiple issues were encountered such as socket connection errors, vulnerability warnings from npm, and terminal freezing. These were resolved by restarting terminals, killing background processes, and applying commands like npm audit fix --force.

After successful development and testing, the application was pushed to GitHub using Git version control. The repository includes separate folders for the frontend (client) and backend (server) and contains the required dependencies in package.json. Screenshots of the live application were also captured and added for demonstration.

This chat application can be used as a base model for:

Team collaboration tools Customer support chat systems Classroom discussion apps Group messaging within any web-based system It showcases practical implementation of core real-time communication concepts, responsive UI development using React, and fundamental backend setup using Node.js. OUTPUT
![Image](https://github.com/user-attachments/assets/0e263c28-5c1d-4f78-bcf1-604ba7a9165f)
