import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepsContent = ['Bike Info', 'Usage Details', 'Specifications'];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {stepsContent.map((label, index) => {
          const step = index + 1;
          const isActive = currentStep === step;
          const isCompleted = currentStep > step;
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center w-1/3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                    isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                    isActive ? 'bg-blue-500 border-blue-500 text-white' : 
                    'bg-transparent border-gray-500 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step}
                </div>
                <p className={`mt-2 text-xs font-medium ${isCompleted || isActive ? 'text-white' : 'text-gray-400'}`}>
                  {label}
                </p>
              </div>
              {step < totalSteps && <div className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${isCompleted ? 'bg-blue-600' : 'bg-gray-500'}`}></div>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};