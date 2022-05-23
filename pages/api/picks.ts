// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
  })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
        if (result instanceof Error) {
            return reject(result)
        }

        return resolve(result)
        })
    })
}

type Data = {
  userId: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    await runMiddleware(req, res, cors)
    res.status(200).json({ userId: 'John Doe' })
}