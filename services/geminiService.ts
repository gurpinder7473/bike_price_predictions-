import { GoogleGenAI } from "@google/genai";
import type { BikeData, Prediction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const modelInstruction = `You are an expert vehicle valuation AI specializing in used motorcycles in India.
Your task is to predict the price of a used bike based on its features.
Based on the bike's details, provide a JSON object with the following structure:
{
  "price_min": number,
  "price_max": number,
  "condition": "Bad" | "Fair" | "Good" | "Very Good" | "Excellent"
}
- "price_min" and "price_max" should be the estimated price range in INR. Ensure price_min is less than price_max. The range should be reasonable, typically 5-10% of the value.
- "condition" should be your assessment of the bike's condition based on its age, kms driven, and owner history, unless a specific condition is provided.

Provide only the raw JSON object as the response, without any extra text, formatting, or code blocks.
`;


export const predictBikePrice = async (data: BikeData, conditionOverride?: string): Promise<Prediction> => {
  
  let prompt = `Predict the price for the following motorcycle.`;

  if (conditionOverride) {
    prompt += ` Assume the bike is in "${conditionOverride}" condition.`
  }

  prompt += `

    Bike details:
    - Kilometers Driven: ${data.kms_driven}
    - Model Year: ${data.model_year}
    - Location: "${data.location}"
    - Owner: "${data.owner}"
    - Mileage (kmpl): ${data.mileage}
    - Power (bhp): ${data.power}
    - Model Name: "${data.model_name}"

    JSON response:
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
     config: {
        systemInstruction: modelInstruction,
        responseMimeType: "application/json",
     }
  });

  try {
    const text = response.text.trim();
    const result = JSON.parse(text);

    // Basic validation
    if (
      typeof result.price_min !== 'number' ||
      typeof result.price_max !== 'number' ||
      typeof result.condition !== 'string'
    ) {
      throw new Error("Invalid data types in model response.");
    }
    
    if (conditionOverride) {
        result.condition = conditionOverride;
    }

    return result as Prediction;

  } catch (error) {
    console.error("Failed to parse JSON from Gemini response:", response.text, error);
    throw new Error("Invalid JSON format received from the model.");
  }
};
