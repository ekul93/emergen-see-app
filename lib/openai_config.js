import OpenAI from "openai";

console.log("called");
const openai = new OpenAI({
  apiKey:
    "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",
});
//const openai = new OpenAIApi(configuration);

export default openai;
