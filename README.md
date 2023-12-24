# Real-Time Chat Application

## Features


- Set up the basic Node.js project with Express.js, Socket.IO, and other necessary NPM packages.

- Created a simple web interface using HTML, CSS, and JavaScript to allow users to join chat rooms and send messages.

- Implemented server-side logic using Node.js and Socket.IO to manage chat rooms, user connections, and message broadcasting.

- Implemented the following Socket.IO events on the server-side:

    - connection: Handle a new user connection.

    - join: Add a user to a specific chat room.

    - message: Broadcast a message to all users in a chat room.

    - disconnect: Handle user disconnections and clean up user data.

- Implement corresponding Socket.IO event listeners on the client-side using JavaScript to update the user interface in real-time.

- Implement proper error handling for invalid chat room names, user names, and other potential issues.

- Test the chat application using multiple browser instances to simulate multiple users.

## Installation

To expose the endpoints into local, run the following commands.

```sh
npm install
node /src/index.js or nodemon
```

## License

Free ! enjoy :)
