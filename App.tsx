import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { BikePredictionForm } from './components/BikePredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { predictBikePrice } from './services/geminiService';
import type { BikeData, Prediction } from './types';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [currentBikeData, setCurrentBikeData] = useState<BikeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handlePredict = useCallback(async (data: BikeData) => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setCurrentBikeData(data);
    setShowResult(true);
    try {
      const result = await predictBikePrice(data);
      setPrediction(result);
    } catch (err) {
      setError('Failed to get a prediction. The model might be overloaded. Please try again in a moment.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handlePredictWithCondition = useCallback(async (condition: string) => {
    if (!currentBikeData) return;
    setLoading(true);
    setError(null);
    setPrediction(null);
    try {
      const result = await predictBikePrice(currentBikeData, condition);
      setPrediction(result);
    } catch (err) {
       setError('Failed to update prediction for the new condition. Please try again.');
       console.error(err);
    } finally {
        setLoading(false);
    }
  }, [currentBikeData]);


  const handleReset = useCallback(() => {
    setShowResult(false);
    setPrediction(null);
    setError(null);
    setCurrentBikeData(null);
  }, []);

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed text-white p-4 sm:p-6 lg:p-8"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <Header />
        <main className="w-full max-w-2xl mt-8 flex-grow">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
             <div className="p-6 sm:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Predict Your Bike's Value</h2>
              <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
                {showResult ? "Here's the estimated value based on your input." : "Fill in the details step-by-step to get an estimated market price."}
              </p>
              
              {showResult ? (
                <PredictionResult 
                  loading={loading} 
                  error={error} 
                  prediction={prediction} 
                  bikeData={currentBikeData}
                  onReset={handleReset}
                  onConditionChange={handlePredictWithCondition}
                />
              ) : (
                <BikePredictionForm onPredict={handlePredict} isLoading={loading} />
              )}
             </div>
          </div>
        </main>
        <footer className="w-full text-center py-4 mt-8">
            <p className="text-gray-400 text-sm">Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;