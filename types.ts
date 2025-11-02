export interface BikeData {
  model_name: string;
  model_year: number;
  kms_driven: number;
  owner: string;
  location: string;
  mileage: number;
  power: number;
}

export interface Prediction {
  price_min: number;
  price_max: number;
  condition: 'Bad' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
}
