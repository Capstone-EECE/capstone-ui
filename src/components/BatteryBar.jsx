// BatteryBar.jsx
import React from 'react';
import { LinearProgress } from '@mui/material';

const BatteryBar = ({ color, isOn }) => {
  return (
    <LinearProgress
      variant="determinate"
      value={isOn ? 100 : 0}
      sx={{
        height: '100%',
        borderRadius: 5,
        backgroundColor: isOn ? color : 'lightgrey',
        border: '1px solid #ccc', 
      }}
    />
  );
};

export default BatteryBar;
