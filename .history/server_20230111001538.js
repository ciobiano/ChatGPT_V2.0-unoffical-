const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	organization: "org-F7SXRReqSxQTFxm9L339rXco",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
	model: "text-davinci-003",
	prompt: "Say this is a test",
	max_tokens: 7,
	temperature: 0,
});
