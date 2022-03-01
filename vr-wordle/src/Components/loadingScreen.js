import { useProgress } from '@react-three/drei';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';

function Loader(props) {
  const { progress } = useProgress();
  const containerStyles = {
    height: 20,
    width: '50vw',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${Math.floor(progress)}%`,
    backgroundColor: '#009038',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  const labelStyles = {
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${Math.floor(progress)}%`}</span>
      </div>
    </div>
  );
}

const CircularProgress = ({ size, strokeWidth, color }) => {
  const { progress } = useProgress();

  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        fill='none'
        stroke='#ccc'
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        fill='none'
        stroke={color}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={[dash, circumference - dash]}
        strokeLinecap='round'
        style={{ transition: 'all 0.5s' }}
      />
      <text
        fill='black'
        fontSize='40px'
        x='50%'
        y='50%'
        dy='20px'
        textAnchor='middle'>
        {`${Math.floor(progress)}%`}
      </text>
    </svg>
  );
};

export default function LoadingScreen() {
  return <CircularProgress size={250} strokeWidth={20} color='green' />;
}

// export default function LoadingScreen() {
//   const { progress } = useProgress();
//   return (
//     <SemiCircleProgressBar percentage={Math.floor(progress)} showPercentValue />
//   );
// }
