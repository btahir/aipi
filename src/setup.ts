import { Hono } from 'hono'
import OpenAI from 'openai'

const app = new Hono()

interface FunctionRegistry {
  [key: string]: (
    apiKey: string,
    options?: { [key: string]: any }
  ) => Promise<string>
}

const functionRegistry: FunctionRegistry = {}

async function getOpenAIResponse(
  OPENAI_API_KEY: string,
  prompt: string,
  model: string = 'gpt-3.5-turbo',
  options?: { [key: string]: any }
): Promise<string> {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  })
  try {
    const chatCompletion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      ...options,
    })
    return (
      chatCompletion.choices[0]?.message.content || 'No response from OpenAI'
    )
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return 'Error retrieving response from OpenAI'
  }
}

function registerOpenAIFunction(
  name: string,
  prompt: string,
  model: string = 'gpt-3.5-turbo',
  args?: { [key: string]: any }
) {
  console.log(`Registering function ${name}`)
  functionRegistry[name] = async (
    apiKey: string,
    options?: { [key: string]: any }
  ) => {
    const mergedOptions = { ...args, ...options }
    return getOpenAIResponse(apiKey, prompt, model, mergedOptions)
  }
}

export { app, functionRegistry, registerOpenAIFunction }
