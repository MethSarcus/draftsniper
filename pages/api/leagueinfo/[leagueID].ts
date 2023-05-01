import {NextApiRequest, NextApiResponse} from 'next'
import { DraftSettings } from '../../../sleeper/DraftSettings'
import { LeagueSettings } from '../../../sleeper/LeagueSettings'
import { SleeperUser } from '../../../sleeper/SleeperUser'

type Data = {
	drafts: DraftSettings[] | undefined
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const {leagueID} = req.query
	//Find the absolute path of the json directory
	if (leagueID) {
		const leagueUsers = (await getLeagueMembers(leagueID.toString())) as SleeperUser[]
        const leagueDetails = (await getLeague(leagueID.toString())) as LeagueSettings
		const drafts = leagueUsers.map((user) => {
			return getMemberDraftDetails(user.user_id, leagueDetails?.season)
		})
		let uniqueDrafts = new Set<string>()
		await Promise.all(drafts).then((values) => {
			values.forEach((drafts) => {
				drafts.filter(dr => dr.status != DRAFT_STATUS.PRE_DRAFT).forEach((draft) => {
					uniqueDrafts.add(JSON.stringify(draft))
				})
			})
			res
				.status(200)
				.json({
					drafts: Array.from(uniqueDrafts).map((draft) =>
						JSON.parse(draft)
					) as any,
				})
		})
	} else {
		res.status(401).json({
			drafts: [],
		})
	}
}

export function getMemberDraftDetails(
	memberId: string,
	season: number | string
): Promise<DraftSettings[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					fetch(
						`https://api.sleeper.app/v1/user/${memberId}/drafts/nfl/${season}`
					).then((response) => response.json())
				),
			200
		)
	})
}

// -------------------------------------------------------------------
// Gets all members of a league
// -------------------------------------------------------------------
export function getDraft(draftId: string) {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					fetch(`https://api.sleeper.app/v1/draft/${draftId}/picks`).then(
						(response) => response.json()
					)
				),
			200
		)
	})
}

export function getLeague(leagueId: string) {
	// gets league details
	return new Promise((resolve) => {
	  setTimeout(
		() =>
		  resolve(
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/`).then(
			  (response) => response.json()
			)
		  ),
		200
	  );
	});
  }
  
  // -------------------------------------------------------------------
  // Gets all members of a league
  // -------------------------------------------------------------------
  export function getLeagueMembers(leagueId: string) {
	return new Promise((resolve) => {
	  setTimeout(
		() =>
		  resolve(
			fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`).then(
			  (response) => response.json()
			)
		  ),
		200
	  );
	});
  }

enum DRAFT_STATUS {
	PRE_DRAFT = 'pre_draft',
}