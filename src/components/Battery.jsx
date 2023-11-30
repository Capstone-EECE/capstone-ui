// Battery.jsx
import React from 'react';
import { Box } from '@mui/material';
import BatteryBar from './BatteryBar';

const Battery = ({ batteryState }) => {
  const colors = ['red', 'yellow', 'green', 'green'];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: 5, borderRadius: 10 }}>
      {colors.map((color, index) => (
        <BatteryBar key={index} color={color} isOn={index < batteryState} />
      ))}
    </Box>
  );
};

export default Battery;
