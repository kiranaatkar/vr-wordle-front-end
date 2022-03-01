import { useProgress } from '@react-three/drei';
import './LoadingScreen.css';
import React from 'react';

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
        stroke='#99f2c8'
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        fill='#99f2c8'
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
        fill='#1f4037'
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
  return (
    <div className='loadingScreen'>
      <CircularProgress size={250} strokeWidth={20} color='#1f4037' />
    </div>
  );
}
