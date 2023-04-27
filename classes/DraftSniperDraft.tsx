import { DraftPick } from "../sleeper/DraftPick"
import { DraftSettings } from "../sleeper/DraftSettings"


export default class DraftSniperDraft {
	picks: DraftPick[] = []
	settings: DraftSettings
	constructor(picks: DraftPick[], draftSettings: DraftSettings) {
        this.picks = picks
		this.settings = draftSettings
    }
}