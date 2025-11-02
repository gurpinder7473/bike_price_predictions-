import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { ownerOptions, locationOptions } from '../constants';
import type { BikeData } from '../types';
import { ProgressBar } from './ui/ProgressBar';

interface BikePredictionFormProps {
  onPredict: (data: BikeData) => void;
  isLoading: boolean;
}

const TOTAL_STEPS = 3;

export const BikePredictionForm: React.FC<BikePredictionFormProps> = ({ onPredict, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BikeData>({
    model_name: 'Royal Enfield Classic 350cc',
    location: 'delhi',
    model_year: new Date().getFullYear() - 3,
    kms_driven: 15000,
    owner: 'first owner',
    mileage: 35,
    power: 19.8,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (e.target.type === 'number' && value !== '') ? parseFloat(value) : value
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === TOTAL_STEPS) {
      onPredict(formData);
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <Input
              label="Model Name"
              name="model_name"
              value={formData.model_name}
              onChange={handleChange}
              placeholder="e.g., Royal Enfield Classic 350cc"
              required
            />
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              options={locationOptions}
              required
            />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <Input
              label="Model Year"
              name="model_year"
              type="number"
              value={formData.model_year}
              onChange={handleChange}
              placeholder="e.g., 2018"
              required
              min="1950"
              max={new Date().getFullYear()}
            />
            <Input
              label="Kilometers Driven"
              name="kms_driven"
              type="number"
              value={formData.kms_driven}
              onChange={handleChange}
              placeholder="e.g., 15000"
              required
              min="0"
            />
            <Select
              label="Owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              options={ownerOptions}
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <Input
              label="Mileage (kmpl)"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="e.g., 35"
              required
              min="0"
              step="0.1"
            />
            <Input
              label="Power (bhp)"
              name="power"
              type="number"
              value={formData.power}
              onChange={handleChange}
              placeholder="e.g., 19.8"
              required
              min="0"
              step="0.1"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      
      {renderStep()}

      <div className="pt-4 flex items-center gap-4">
        {step > 1 && (
          <Button type="button" onClick={prevStep} className="w-1/3 bg-gray-600 hover:bg-gray-700">
            Back
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="flex-grow">
          {step === TOTAL_STEPS ? (isLoading ? 'Analyzing...' : 'Predict Price') : 'Next'}
        </Button>
      </div>
    </form>
  );
};