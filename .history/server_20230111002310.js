const { Configuration, OpenAIApi } = require("openai");
const express = require("express"); 
const configuration = new Configuration({
	organization: "org-F7SXRReqSxQTFxm9L339rXco",
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

async function callApi() {
const response = await openai.createCompletion({
	model: "text-davinci-003",
	prompt: "Say this is a test",
	max_tokens: 7,
	temperature: 0,
});
console.log(response.data.choices[0].text)
}
callApi()

//create a simple express api that calls the function above 
 
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
    });

    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    });