
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl text-center">
      <div className="flex items-center justify-center gap-4">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.5 2c-3.14 0-6.14 1.15-8.5 3.12V3H8v4h4V5h-1.6c1.9-1.5 4.3-2.5 6.6-2.5 4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5c-2.31 0-4.4-1.04-5.83-2.71l-1.46 1.46C12.89 20.37 15.54 21.5 18.5 21.5c5.25 0 9.5-4.25 9.5-9.5S23.75 2 18.5 2zM5.6 11.5c0-1.29.31-2.5.86-3.58L5 6.48C4.05 7.92 3.5 9.61 3.5 11.5c0 2.3.93 4.4 2.46 5.94l1.44-1.44C6.18 14.78 5.6 13.23 5.6 11.5zM2 11.5C2 9.01 2.89 6.73 4.4 5.08l1.45 1.45C4.64 7.82 4 9.57 4 11.5c0 1.79.56 3.44 1.52 4.8l-1.45 1.45C2.53 16.32 2 14.02 2 11.5z"/>
         </svg>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
          AI Bike Price Predictor
        </h1>
      </div>
    </header>
  );
};
