import {Table, HeaderCell, Column, Cell} from 'rsuite-table'
import {DraftPick} from '../sleeper/DraftPick'
import {SetStateAction, useState} from 'react'
import {Avatar, Whisper, Popover, AvatarGroup, Badge} from 'rsuite'
import {SleeperUser} from '../sleeper/SleeperUser'
import {Box, HStack, useMediaQuery} from '@chakra-ui/react'
import NumPicksAvatarGroup from './NumPicksAvatarGroup'

interface MyProps {
	picks: DraftPick[]
	memberData: Map<string, SleeperUser> | undefined
	disabledMembers: string[]
	disabledDrafts: string[]
	allowExternalMemberPicks: boolean
	rookieDraftsOnly: boolean
}

interface adpPick {
	picks: DraftPick[]
	adp: number
	player_id: string
	drafted_by: Map<string, number>
}

const DraftSniperADPTable = (props: MyProps) => {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
		ssr: true,
		fallback: false, // return false on the server, and re-evaluate on the client side
	})
	const [memberData, setMemberData] = useState(props.memberData)
	const [sortColumn, setSortColumn] = useState()
	const [sortType, setSortType] = useState()
	const [loading, setLoading] = useState(memberData == undefined ? true : false)
	const pickMap = new Map<string, DraftPick[]>()

	props.picks
		.filter((pick) => {
			if (props.allowExternalMemberPicks) {
				return (
					!props.disabledMembers.includes(pick.picked_by) &&
					pick.picked_by != ''
				)
			} else {
				return (
					!props.disabledMembers.includes(pick.picked_by) &&
					pick.picked_by != '' &&
					memberData?.has(pick.picked_by)
				)
			}
		})
		.filter((pick) => {
			return !props.disabledDrafts.includes(pick.draft_id)
		})
		.filter((pick) => {
			if (props.rookieDraftsOnly) {
				return parseInt(pick.metadata.years_exp) < 1
			} else {
				return true
			}
		})
		.forEach((pick) => {
			if (pickMap.has(pick.player_id)) {
				pickMap.get(pick.player_id)?.push(pick)
			} else {
				pickMap.set(pick.player_id, [pick])
			}
		})

	const draftPicks = Array.from(pickMap.values()).map((picks) => {
		let adp =
			picks.map((pick) => pick.pick_no).reduce((a, b) => a + b, 0) /
			picks.length
		let drafted_by = new Map()
		picks.forEach((pick) => {
			if (drafted_by.has(pick.picked_by)) {
				drafted_by.set(pick.picked_by, drafted_by.get(pick.picked_by) + 1)
			} else {
				drafted_by.set(pick.picked_by, 1)
			}
		})
		return {
			picks: picks,
			adp: adp,
			player_id: picks[0].player_id,
			drafted_by: drafted_by,
		} as adpPick
	})

	const getData = () => {
		console.debug(sortColumn, sortType)
		if (sortColumn && sortType) {
			return draftPicks.sort((a: adpPick, b: adpPick) => {
				let x = a[sortColumn]
				let y = b[sortColumn]
				if (sortType === 'asc') {
					return x - y
				} else {
					return y - x
				}
			})
		} else {
			return draftPicks.sort((a: adpPick, b: adpPick) => {
				{
					return a.adp - b.adp
				}
		})}}

	const AvatarGroupCell = ({
		rowData,
		dataKey,
		...props
	}: {
		rowData: any
		dataKey: any
	}) => {
		const drafted_by_ids = rowData['drafted_by'] as Map<string, number>
		return (
			<Cell {...props}>
				<NumPicksAvatarGroup drafted_by_ids={drafted_by_ids} memberData={memberData}/>
			</Cell>
		)
	}

	const PlayerImageCell = ({
		rowData,
		dataKey,
		...props
	}: {
		rowData: any
		dataKey: any
	}) => {
		const srcString = rowData[dataKey]
		return (
			<Cell {...props}>
				<HStack>
					<Avatar
						alt={rowData['picks'][0]['metadata']['first_name']}
						src={
							/\d/.test(srcString)
								? `https://sleepercdn.com/content/nfl/players/${srcString}.jpg`
								: `https://sleepercdn.com/images/team_logos/nfl/${srcString.toLowerCase()}.png`
						}
						size='sm'
						circle
						style={{background: 'none', minWidth: 30, height: 30}}
					/>
					<Box
						whiteSpace={'nowrap'}
						textOverflow={'ellipsis'}
						display={'block'}
						overflow={'hidden'}
						fontSize={"xs"}
					>
						{`${rowData.picks[0].metadata.first_name} ${rowData.picks[0].metadata.last_name}`}
					</Box>
				</HStack>
			</Cell>
		)
	}

	const handleSortColumn = (sortColumn: any, sortType: any) => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setSortColumn(sortColumn)
			setSortType(sortType)
		}, 200)
	}

	return (
		<Table
			virtualized
			height={isLargerThan800 ? 700 : 300}
			data={getData()}
			headerHeight={30}
			rowHeight={60}
			sortColumn={sortColumn}
			sortType={sortType}
			onSortColumn={handleSortColumn}
			loading={loading}
		>
			<Column width={55} align='center' fixed sortable>
				<HeaderCell style={{padding: 4}}>ADP</HeaderCell>
				<Cell dataKey='adp'>{rowData => Math.round(rowData["adp"])}</Cell>
			</Column>
			<Column flexGrow={2}>
				<HeaderCell style={{padding: 4}}>Player</HeaderCell>
				<PlayerImageCell
					dataKey='player_id'
					rowData={(rowData: any) => rowData}
				/>
			</Column>

			<Column flexGrow={1}>
				<HeaderCell style={{padding: 4}}>Picked By</HeaderCell>
				<AvatarGroupCell
					dataKey='drafted_by'
					rowData={(rowData: any) => rowData}
				/>
			</Column>
		</Table>
	)
}

export default DraftSniperADPTable
