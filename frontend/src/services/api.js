import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default API;

// get token from env
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

export async function generateInterior(prompt) {

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    }
  );

  const result = await response.blob();
  return URL.createObjectURL(result);
}