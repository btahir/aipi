import { app, functionRegistry } from './setup'
import './functions' // Import the functions to register them
import { env } from 'hono/adapter'

app.get('/', (c) => c.text('Hello Hono!'))

app.post('/call/:functionName', async (c) => {
  try {
    const { functionName } = c.req.param()
    const body: any = await c.req.parseBody()
    const envVars = env<{ OPENAI_API_KEY: string }>(c)
    const OPENAI_API_KEY = envVars.OPENAI_API_KEY || ''

    let func = functionRegistry[functionName]

    if (!func) {
      func = functionRegistry[`ai_${functionName}`]
      if (!func) {
        return c.text(`Function ${functionName} not found`, 404)
      }

      if (!OPENAI_API_KEY) {
        return c.text('OPENAI_API_KEY is required for AI functions', 400)
      }
    }

    const response = await func(OPENAI_API_KEY, body.options)
    return c.json({ response })
  } catch (error) {
    console.error('Error processing request:', error)
    return c.text('Invalid JSON input', 400)
  }
})

export default app
