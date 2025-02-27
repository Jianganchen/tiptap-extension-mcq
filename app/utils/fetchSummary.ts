import { HfInference } from "@huggingface/inference";

const hf = new HfInference(`${process.env.API_KEY}` || " ");

export async function fetchSummary(inputText: string) {
  const response = await hf.summarization({
    model: "facebook/bart-large-cnn",
    inputs: inputText,
    parameters: {
      min_length: 20,
      max_length: 100,
      do_sample: false,
    },
  });

  return response.summary_text.trim();
}
