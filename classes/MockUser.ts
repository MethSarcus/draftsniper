import { DraftPick } from "../interfaces/sleeper_api/DraftPick"
import { Draft } from "../interfaces/sleeper_api/DraftSettings"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"

interface MockDraftUser {
    username: string
    userId: string
    userPicks: DraftPick[]
    userDrafts: Draft[]
    mockDraftSettings: LeagueSettings


    getProjectedPick(draftedPlayers: DraftPick[], leagueSettings: LeagueSettings): DraftPick;
    getMostSimilarDraft(userLeagues: LeagueSettings[], draftSettings: LeagueSettings): LeagueSettings;

}

export default MockDraftUser