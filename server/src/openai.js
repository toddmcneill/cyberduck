const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

/*
  Engines:
  text-davinci-002
  text-curie-001
  text-babbage-001
  text-ada-001
*/

async function invoke(prompt) {
  const response = await openai.createCompletion('text-curie-001', {
    prompt,
    max_tokens: Math.floor(Math.random() * 200 + 50),
    temperature: 0.9,
  })
  return response.data.choices[0].text
}

module.exports = {
  invoke,
}
