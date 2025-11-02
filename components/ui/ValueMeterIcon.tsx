import React from 'react';

interface ValueMeterIconProps {
  condition: 'Bad' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
}

const conditionToRotation: Record<ValueMeterIconProps['condition'], number> = {
  'Bad': -65,
  'Fair': -35,
  'Good': 0,
  'Very Good': 35,
  'Excellent': 65,
};

export const ValueMeterIcon: React.FC<ValueMeterIconProps> = ({ condition }) => {
  const rotation = conditionToRotation[condition] || 0;

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Motorcycle Body */}
      <path
        d="M86.1,66.3c-1.2-1.7-3-2.8-5-3.3l-8.8-2.2c-1.1-0.3-2.2-0.4-3.3-0.4H31.1c-1.5,0-2.9,0.5-4.1,1.4L16.3,71.2 c-0.8,0.6-1.5,1.4-2,2.3L9.8,82.8c-0.6,1.1-0.9,2.3-0.9,3.6V90h7.5v-3.6c0-0.5,0.1-0.9,0.4-1.3l4.5-6.7c0.3-0.4,0.7-0.8,1.2-1 l10.6-4.4c0.5-0.2,1-0.3,1.5-0.3h40.1c0.5,0,1,0.1,1.5,0.2l8.8,2.2c1,0.2,1.9,0.7,2.7,1.4c1.6,1.4,2.6,3.4,2.6,5.6v3.7H95 V82.8C95,76,91.5,69.9,86.1,66.3z M24.8,87.5c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5s7.5,3.4,7.5,7.5S28.9,87.5,24.8,87.5z M75.2,87.5c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5s7.5,3.4,7.5,7.5S79.3,87.5,75.2,87.5z"
        fill="#fb923c"
      />
      <path
        d="M62,35.3H38.1c-1.5,0-2.8,1-3.2,2.4L27,59.2c-0.4,1.4,0.5,2.8,1.9,3.2c0.3,0.1,0.6,0.1,0.9,0.1h42.4 c1.5,0,2.8-1.2,2.8-2.8v-21C75,36.5,73.5,35.3,72,35.3H62z"
        fill="#fb923c"
      />

      {/* Meter Background */}
      <circle cx="50" cy="48" r="18" fill="rgba(255,255,255,0.1)" />
      
      {/* Meter Arcs */}
      <path d="M35 55 A 15 15 0 0 1 42 38" fill="none" stroke="#ef4444" strokeWidth="4" />
      <path d="M42 38 A 15 15 0 0 1 58 38" fill="none" stroke="#facc15" strokeWidth="4" />
      <path d="M58 38 A 15 15 0 0 1 65 55" fill="none" stroke="#4ade80" strokeWidth="4" />

      {/* Needle */}
      <g transform={`rotate(${rotation}, 50, 48)`}>
        <path d="M50 55 L50 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="48" r="2" fill="white" />
      </g>
    </svg>
  );
};
