import React from 'react';
import { Loader } from './ui/Loader';
import { Button } from './ui/Button';
import { ValueMeterIcon } from './ui/ValueMeterIcon';
import { ConditionSelector } from './ui/ConditionSelector';
import type { Prediction, BikeData } from '../types';

interface PredictionResultProps {
  loading: boolean;
  error: string | null;
  prediction: Prediction | null;
  bikeData: BikeData | null;
  onReset: () => void;
  onConditionChange: (condition: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const PredictionResult: React.FC<PredictionResultProps> = ({ loading, error, prediction, bikeData, onReset, onConditionChange }) => {
  if (loading && !prediction) { // Initial loading state
    return (
      <div className="flex flex-col items-center justify-center text-center h-64">
        <Loader />
        <p className="mt-4 text-lg text-gray-300">Our AI is crunching the numbers...</p>
        <p className="text-sm text-gray-400">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center h-64 flex flex-col justify-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-red-400">Prediction Failed</h3>
        <p className="mt-2 text-gray-300">{error}</p>
         <button
          onClick={onReset}
          className="mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 w-full max-w-xs mx-auto"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (prediction && bikeData) {
    const { price_min, price_max, condition } = prediction;
    
    return (
      <div className="animate-fade-in space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-32 h-32 flex-shrink-0">
            <ValueMeterIcon condition={condition} />
          </div>
          <div className={`flex-grow w-full text-center sm:text-left transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            <p className="text-md text-gray-300">
              {`A ${bikeData.model_name} from a ${bikeData.owner} in `}<strong>{condition}</strong>{` condition is valued at`}
            </p>
            <p className="text-3xl sm:text-4xl font-bold my-1 text-orange-400">
              {formatPrice(price_min)} - {formatPrice(price_max)}*
            </p>
             <p className="text-xs text-gray-400">*This is an AI-generated estimate. Actual prices may vary.</p>
          </div>
        </div>
        
        <ConditionSelector 
          currentCondition={condition}
          onConditionChange={onConditionChange}
          disabled={loading}
        />
        
        <div className="pt-4">
          <Button onClick={onReset} className="bg-white/10 hover:bg-white/20">
            Check Another Price
          </Button>
        </div>
      </div>
    );
  }

  return <div className="h-64"></div>; // Placeholder to maintain height
};
