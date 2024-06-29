import { registerOpenAIFunction } from './setup'

// Define functions
const functionDefinitions = {
  HelloWorld: {
    prompt: 'Say Hello, World!',
    model: 'gpt-3.5-turbo',
    args: { temperature: 0.7 },
  },
  TellJoke: {
    prompt: 'Tell me a joke',
    model: 'gpt-3.5-turbo',
    args: { temperature: 0.9 },
  },
}

// Function to register the functions from the object
function registerFunctions(definitions: {
  [key: string]: {
    prompt: string
    model?: string
    args?: { [key: string]: any }
  }
}) {
  for (const [name, { prompt, model, args }] of Object.entries(definitions)) {
    registerOpenAIFunction(name, prompt, model, args)
  }
}

// Register the defined functions
registerFunctions(functionDefinitions)
