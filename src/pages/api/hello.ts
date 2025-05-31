// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface HelloResponse {
  name: string
  message: string
  timestamp: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<HelloResponse>) {
  res.status(200).json({
    name: 'Privacy Idea Generator API',
    message: 'Hello from the Web3Privacy Now idea generator!',
    timestamp: new Date().toISOString(),
  })
}
