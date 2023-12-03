import { useEffect, useState } from 'react';
import BatteryGauge from 'react-battery-gauge';
import { getSocketInstance } from '../api/SocketManager';

const BatteryComponent = ({ droneConnected }) => {
  const [batteryLevel, setBatteryLevel] = useState(0);

  useEffect(() => {
    const socket = getSocketInstance();
    if (socket) {
      socket.on('battery', (data) => {
        setBatteryLevel(data);
      });
    } else {
      console.error('Socket is not initialized. Call connectSocket() first.');
    }

  }, [droneConnected]);

  const customizationOptions = {
    batteryMeter: {
      fill: 'green',
      lowBatteryValue: 20,
      lowBatteryFill: 'red',
      outerGap: 1,
      noOfCells: 4,
      interCellsGap: 1
    },
    readingText: {
      lightContrastColor: '#111',
      darkContrastColor: '#fff',
      lowBatteryColor: 'red',
      fontFamily: 'Helvetica',
      fontSize: 0,
      showPercentage: false
    },
  };
  

  return (
    <BatteryGauge value={batteryLevel} customization={customizationOptions} />
  );
};

export default BatteryComponent;
