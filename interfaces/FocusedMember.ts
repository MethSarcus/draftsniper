import axios from "axios";
import useSWR from "swr";
import { POSITION, getRosterSlotPositions } from "../utility/rosterFunctions";
import { DraftPick } from "./sleeper_api/DraftPick";
import { LeagueSettings, MemberDetails } from "./sleeper_api/LeagueSettings";

export default class CurrentMember {
    id: string
    displayName: string
    avatar: string
    username: string

    draftPicks: DraftPick[] = []
    leagues: LeagueSettings[] = []

    constructor(memberData: MemberDetails) {
        this.id = memberData.user_id
        this.displayName = memberData.display_name
        this.avatar = memberData.avatar
        this.username = memberData.username
    }
    
    getLeagues(id: string) {
        return this.leagues
    }

    addLeague(league:LeagueSettings) {
        this.leagues.push(league)
    }

    addDraftPick(pick: DraftPick) {
        this.draftPicks?.push(pick)
    }

    getMemberId(): string {
        return this.id
    }

    getAllLeaguePositions = () => {
        var positions: POSITION[][] = []
        this.leagues.forEach((league) => {
            league.roster_positions?.forEach((slot) => {
                positions.push(getRosterSlotPositions(slot))
            })
        })
    
        return [...new Set(positions.flat())]
    }

    getUserPicks(): DraftPick[] {
        return this.draftPicks.filter((e) => {
            return this.id == e.picked_by
        })
    }

    getPositionPicks(position: POSITION): DraftPick[] {
        return this.draftPicks.filter((e) => {
            return (position == e.metadata.position)
        })
    }

    getUserPositionPicks(position: POSITION): DraftPick[] {
        return this.getUserPicks().filter((e) => {
            return (position == e.metadata.position)
        })
    }

}