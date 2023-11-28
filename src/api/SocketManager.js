import io from 'socket.io-client';

let socket = null;

export const connectSocket = () => {
  socket = io("localhost:5235", {
    transport: ['websocket'],
    cors: {
      origin: "http://localhost:3000/"
    },
    reconnection: true,
    reconnectionAttempts: 5,  
    reconnectionDelay: 1000,  
  });
};

export const onSocketConnect = (callback) => {
  if (socket) {
    socket.on('connect', (data) => {
      if (callback) {
        callback();
      }
    });
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
};

export const triggerCustomEvent = () => {
  if (socket) {
    console.log("Executing request");
    socket.emit('connect_drone');
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
};

export function test() {
  if (socket) {
    socket.on('coordinate', (data) => {
      console.log(data)
    });
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
}


export const onCustomEventResponse = (callback) => {
  if (socket) {
    console.log('Adding event listener for coordinate');
    socket.on('coordinate', (data) => {
      console.log('Received coordinate data:', data);
      if (callback) {
        callback(data);
      }
    });
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Reset socket to null after disconnecting
  } else {
    console.error('Socket is not initialized. Call connectSocket() first.');
  }
};
