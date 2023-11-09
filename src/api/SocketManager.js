import io from 'socket.io-client';
import { config } from "../config";


const socket = io("localhost:5000", {
    transport: ['websocket'],
    cors: {
      origin: "http://localhost:3000/"
    }
  });

/**
 * Built in socket connect event handler (Signature Doesnt allow a callback variable)
 * @param {*} callback 
 */
 export const onSocketConnect = (callback) => {
    socket.on('connect', (data) => {
      if (callback) {
        callback(); // Call the callback function on socket connection
      }
    });
  }; 

//emits a custom event
export const triggerCustomEvent = () => {
    console.log("Executing request")
    socket.emit('hello', "world")
};

/**
 * Event listener for response event emmited from server
 * @param {*} callback Call the callback function from App.js on socket connection
 */
export const onCustomEventResponse = (callback) => {
    socket.on('response', (data) => {
      console.log("ME?", data); // Log the response data
      if (callback) {
        callback(data); // 
      }
    });
  }; 

export const disconnectSocket = () => {
  socket.disconnect();
};
