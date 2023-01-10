import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	organization: "org-F7SXRReqSxQTFxm9L339rXco",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
