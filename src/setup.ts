import { Hono } from 'hono'
import OpenAI from 'openai'

const app = new Hono()

interface FunctionRegistry {
  [key: string]: (
    apiKey?: string,
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
  console.log(`Registering AI function ai_${name}`)
  functionRegistry[`ai_${name}`] = async (
    apiKey?: string,
    options?: { [key: string]: any }
  ) => {
    if (!apiKey) {
      throw new Error('API key is required for AI functions')
    }
    const mergedOptions = { ...args, ...options }
    return getOpenAIResponse(apiKey, prompt, model, mergedOptions)
  }
}

function registerFunction(
  name: string,
  func: (options?: { [key: string]: any }) => Promise<string>
) {
  console.log(`Registering function ${name}`)
  functionRegistry[name] = async (
    apiKey?: string,
    options?: { [key: string]: any }
  ) => {
    return func(options)
  }
}

export { app, functionRegistry, registerOpenAIFunction, registerFunction }
