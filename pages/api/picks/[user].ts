// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { DraftPick } from "../../../sleeper/DraftPick";
import { LeagueSettings } from "../../../sleeper/LeagueSettings";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

type Data = {
  picks: DraftPick[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { user } = req.query;
  await runMiddleware(req, res, cors);

  if (user) {
    const picks = await loadPicks(user.toString());
    res.status(200).json({ picks: picks.flat() });
  } else {
    res.status(401).json({picks: []});
  }

  
}

// -------------------------------------------------------------------
// these functions retrieve all draft picks for all a user
// -------------------------------------------------------------------
function getDrafts(userId: string) {
  // get drafts a user has participated in
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          fetch(
            `https://api.sleeper.app/v1/user/${userId}/drafts/nfl/2022`
          ).then((response) => response.json())
        ),
      200
    );
  });
}

function getPicks(draftId: string) {
  // get draft picks for the given draft id
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(fetch(`https://api.sleeper.app/v1/draft/${draftId}/picks`)),
      200
    );
  });
}

async function loadPicks(userId: string) {
  const drafts = await getDrafts(userId);

  // instead of awaiting this call, create an array of Promises
  const promises = (drafts as any).map((draftSettings: LeagueSettings) => {
    return getPicks(draftSettings.draft_id).then((picks) => {
      return (picks as any).json();
    });
  });

  // use await on Promise.all so the Promises execute in parallel
  const draftPicks = await Promise.all(promises);

  return draftPicks;
}
