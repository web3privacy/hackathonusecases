import type { NextApiRequest, NextApiResponse } from 'next'
import ideas from '../../public/ideas/expert-ideas.json'

// TypeScript interfaces for the API
interface RequestBody {
  keywords?: string
}

interface ErrorResponse {
  error: string
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  model: string
  messages: ChatMessage[]
}

interface ChatChoice {
  message: {
    content: string
  }
}

interface ChatResponse {
  choices?: ChatChoice[]
}

// API Configuration
const input_json = JSON.stringify(ideas)
const system_prompt = `You are human tasked with coming up with privacy focused project ideas for hackathons. Here is a list of example: ${input_json} Do not return any of these example right away, but you are alowed to combine them into new ideas. If you use any of the example as inspiration, add the list in output as 'basedOn'. Only print the result in the same format as the example inputs`
const url = process.env.CHAT_API_URL || 'https://chatapi.akash.network/api/v1/chat/completions'
const chatApiKey = process.env.CHAT_API_KEY
const model = process.env.CHAT_API_MODEL || 'Meta-Llama-3-1-8B-Instruct-FP8'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  if (!chatApiKey || chatApiKey === '') {
    res.status(500).json({ error: 'Internal Server Error' })
    return
  }

  const body = req.body as RequestBody

  if (!body) {
    res.status(400).json({ error: 'Missing request body' })
    return
  }

  if (!body.keywords) {
    res.status(400).json({ error: 'missing keywords' })
    return
  }

  const main_prompt = `Provide an idea based on keywords: ${body.keywords}; (ignore: ${new Date()})`

  const data: ChatRequest = {
    model: model,
    messages: [
      {
        role: 'system',
        content: system_prompt,
      },
      {
        role: 'user',
        content: main_prompt,
      },
    ],
  }

  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${chatApiKey}`,
      },
    })

    if (response.status !== 200) {
      res.status(500).json({ error: 'request to backend failed' })
      return
    }

    const respBody: ChatResponse = await response.json()

    if (
      !respBody.choices ||
      !respBody.choices[0] ||
      !respBody.choices[0].message ||
      !respBody.choices[0].message.content
    ) {
      res.status(500).json({ error: 'failed to parse response from backend' })
      return
    }

    try {
      const parsedContent = JSON.parse(respBody.choices[0].message.content)
      res.status(200).json(parsedContent)
    } catch (parseError) {
      res.status(500).json({ error: 'failed to parse AI response as JSON' })
    }
  } catch (fetchError) {
    console.error('Error calling AI API:', fetchError)
    res.status(500).json({ error: 'failed to call AI service' })
  }
}
