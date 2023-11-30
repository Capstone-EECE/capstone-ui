import io from 'socket.io-client';

let socket = null;

export const getSocketInstance = () => {
  return socket;
};

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5235", {
      transport: ['websocket'],
      cors: {
        origin: "http://localhost:3000/"
      },
      reconnection: true,
      reconnectionAttempts: 5,  
      reconnectionDelay: 1000,  
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; 
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
};
