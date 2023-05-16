import {Table, HeaderCell, Column, Cell} from 'rsuite-table'
import {DraftPick} from '../sleeper/DraftPick'
import {SetStateAction, useState} from 'react'
import {Avatar, Whisper, Popover, AvatarGroup, Badge} from 'rsuite'
import {SleeperUser} from '../sleeper/SleeperUser'
import {Box, HStack, useMediaQuery} from '@chakra-ui/react'
import NumPicksAvatarGroup from './NumPicksAvatarGroup'
import PlayerImageCell from './PlayerImageCell'
import { AdpPick } from './AdpTable'

interface MyProps {
	picks: DraftPick[]
	memberData: Map<string, SleeperUser> | undefined
	disabledMembers: string[]
	disabledDrafts: string[]
	allowExternalMemberPicks: boolean
	rookieDraftsOnly: boolean
}

const DraftSniperADPTable = (props: MyProps) => {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
		ssr: true,
		fallback: false, // return false on the server, and re-evaluate on the client side
	})
	const pickMap = new Map<string, DraftPick[]>()
	const adpMap = new Map<string, number>()
	const filterPickRules = {
		allowExternalMemberPicks: props.allowExternalMemberPicks,
		disabledMembers: props.disabledMembers,
		disabledDrafts: props.disabledDrafts,
		rookieDraftsOnly: props.rookieDraftsOnly
	}


	//A function to evaluate whether a draft pick should be filtered
	function evaluatePick(pick: DraftPick, filterPickRules: any) {
		let allowPick = true
		
		if (filterPickRules.allowExternalMemberPicks && (filterPickRules.disabledMembers.includes(pick.picked_by) || pick.picked_by == '')) {
			allowPick = false
		}

		if (filterPickRules.rookieDraftsOnly && (parseInt(pick.metadata.years_exp) >= 1)) {
			allowPick = false
		}

		if (filterPickRules.disabledDrafts && filterPickRules.disabledDrafts.includes(pick.draft_id)) {
			allowPick = false
		}
		if (filterPickRules.memberData && filterPickRules.memberData?.has(pick.picked_by)) {
			allowPick = false
		}	
	}

	props.picks.filter((pick) => {
		return evaluatePick(pick, filterPickRules)
	}).forEach((pick) => {
			if (pickMap.has(pick.player_id)) {
				pickMap.get(pick.player_id)?.push(pick)
			} else {
				pickMap.set(pick.player_id, [pick])
			}
		})
}



export function convertToAdvancedPick(pickMap: Map<string, DraftPick[]>){
	return Array.from(pickMap.values()).map((picks) => {
		let adp = picks.map((pick) => pick.pick_no).reduce((a, b) => a + b, 0) / picks.length
		let drafted_by = new Map<string, number>()
		picks.forEach((pick) => {
			if (drafted_by.has(pick.picked_by)) {
				drafted_by.set(pick.picked_by, drafted_by.get(pick.picked_by)! + 1)
			} else {
				drafted_by.set(pick.picked_by, 1)
			}
		})
		return {
			adp: adp,
			player_id: picks[0].player_id,
			drafted_by: drafted_by,
			metadata: picks[0].metadata // gives the number of times a member drafted a player
		} as AdpPick
	})
} 

export default DraftSniperADPTable
