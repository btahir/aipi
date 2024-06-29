import { registerOpenAIFunction, registerFunction } from './setup'

// Define AI functions
const aiFunctionDefinitions = {
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

// Define normal functions
const normalFunctionDefinitions = {
  Greet: {
    func: async (options?: { name?: string }) => {
      const name = options?.name || 'Guest'
      return `Hello, ${name}!`
    },
  },
  Farewell: {
    func: async (options?: { name?: string }) => {
      const name = options?.name || 'Guest'
      return `Goodbye, ${name}!`
    },
  },
}

// Function to register the AI functions
function registerAIFunctions(definitions: {
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

// Function to register the normal functions
function registerNormalFunctions(definitions: {
  [key: string]: {
    func: (options?: { [key: string]: any }) => Promise<string>
  }
}) {
  for (const [name, { func }] of Object.entries(definitions)) {
    registerFunction(name, func)
  }
}

// Register the defined functions
registerAIFunctions(aiFunctionDefinitions)
registerNormalFunctions(normalFunctionDefinitions)
