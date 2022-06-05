import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"

export const getAllLeaguePositions = (leagues: LeagueSettings[]) => {
	var positions: POSITION[][] = []
	leagues.forEach((league) => {
		league.roster_positions?.forEach((slot) => {
			positions.push(getRosterSlotPositions(slot))
		})
	})

	return [...new Set(positions.flat())]
}

//A function that takes in a sleeper roster slot designation and returns an array of positions that can fill that slot
export const getRosterSlotPositions = (slotId: string) => {
	switch (slotId) {
		case POSITION.QB: {
			return [POSITION.QB]
		}
		case POSITION.RB: {
			return [POSITION.RB]
		}
		case POSITION.WR: {
			return [POSITION.WR]
		}
		case POSITION.TE: {
			return [POSITION.TE]
		}
		case POSITION.DEF: {
			return [POSITION.DEF]
		}
		case POSITION.K: {
			return [POSITION.K]
		}
		case POSITION.DL: {
			return [POSITION.DL]
		}
		case POSITION.LB: {
			return [POSITION.LB]
		}
		case POSITION.DB: {
			return [POSITION.DB]
		}
		case "FLEX": {
			return [POSITION.RB, POSITION.WR, POSITION.TE]
		}
		case "WRRB_FLEX": {
			return [POSITION.RB, POSITION.WR]
		}
		case "REC_FLEX": {
			return [POSITION.WR, POSITION.TE]
		}
		case "SUPER_FLEX": {
			return [POSITION.QB, POSITION.RB, POSITION.WR, POSITION.TE]
		}

		case "IDP_FLEX": {
			return [POSITION.DL, POSITION.LB, POSITION.DB]
		}

		default: {
			return [];
		}
	}
}

export enum POSITION {
	QB = "QB",
	RB = "RB",
	WR = "WR",
	TE = "TE",
	DEF = "DEF",
	K = "K",
	DL = "DL",
	LB = "LB",
	DB = "DB",
}