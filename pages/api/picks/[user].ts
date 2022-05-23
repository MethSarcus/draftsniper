// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { LeagueSettings } from '../../../interfaces/sleeper_api/LeagueSettings'

const cors = Cors({
    methods: ['GET', 'HEAD'],
  })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
        if (result instanceof Error) {
            return reject(result)
        }

        return resolve(result)
        })
    })
}

type Data = {
  picks: any
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    const { user } = req.query
    await runMiddleware(req, res, cors)
    
    fetch(`https://api.sleeper.app/v1/user/${user}/drafts/nfl/2022`).then(response => response.json()).then((data: LeagueSettings[]) => {
        const draftIds = data.map((league) => { return league.draft_id })
        //res.status(200).json({ userId: draftIds })
        Promise.all(data.map((league) => { return makeDraftPromise(league.draft_id)})).then((promData) => res.status(200).json({ picks: promData.flat() }))
        
    });

    //res.status(200).json({ userId: `${user}` })
}

function makeDraftPromise(draftId: string) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.sleeper.app/v1/draft/${draftId}/picks`).then(response => resolve(response.json()))
      })
}