const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
	organization: "org-F7SXRReqSxQTFxm9L339rXco",
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// add cors to express


//create a simple express api that calls the function above

const app = express();
const port = 3080;

app.post("/", async (req, res) => {
	const { message } = req.body;
	console.log(message);
	// const response = await openai.createCompletion({
	// 	model: "text-davinci-003",
	// 	prompt: "Say this is a test",
	// 	max_tokens: 7,
	// 	temperature: 0,
	// });
	// console.log(response.data.choices[0].text)
	res.json({
		// data: response.data
		data: message,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
