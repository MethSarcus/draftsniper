import { DraftPick } from "../sleeper/DraftPick"
import { DraftSettings } from "../sleeper/DraftSettings"
import { LeagueSettings } from "../sleeper/LeagueSettings"

interface MockDraftUser {
    username: string
    userId: string
    userPicks: DraftPick[]
    userDrafts: DraftSettings[]
    mockDraftSettings: LeagueSettings


    getProjectedPick(draftedPlayers: DraftPick[], leagueSettings: LeagueSettings): DraftPick;
    getMostSimilarDraft(userLeagues: LeagueSettings[], draftSettings: LeagueSettings): LeagueSettings;

}

export default MockDraftUser