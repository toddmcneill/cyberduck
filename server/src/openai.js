const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function invoke(prompt) {
  const response = await openai.createCompletion('text-davinci-002', {
    prompt,
    max_tokens: 100,
  })
  return response.data.choices[0].text
}

module.exports = {
  invoke,
}
