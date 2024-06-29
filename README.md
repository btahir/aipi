# AIPI

A simple Hono API that wraps OpenAI API calls into a friendly abstraction for LLM-based functions with a prompt input and a response.

## Example

```javascript
HelloWorld: {
  prompt: 'Say Hello, World!',
  model: 'gpt-3.5-turbo',
  args: { temperature: 0.7 },
}
```

Access this at /call/HelloWorld.

## Customization

You can adjust parameters like temperature for desired outputs.

To add your functions, just update functionDefinitions in functions.ts.

Example

```javascript
TellJoke: {
  prompt: 'Tell me a joke',
  model: 'gpt-3.5-turbo',
  args: { temperature: 0.9 },
},
```

## How To Run

```
npm i && npm run dev
```

You can deploy this on Cloudflare Worker as well.

## Deployment

If you have a Cloudflare account, you can deploy to Cloudflare. In package.json, make sure $npm_execpath is set to your package manager of choice.

```
npm run deploy
```
