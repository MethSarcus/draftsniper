import {Table, HeaderCell, Column, Cell} from 'rsuite-table'
import {DraftPick} from '../sleeper/DraftPick'
import {SetStateAction, useState} from 'react'
import {Avatar, Whisper, Popover} from 'rsuite'
import {SleeperUser} from '../sleeper/SleeperUser'
import {Box, Center, HStack, Text} from '@chakra-ui/react'

interface MyProps {
	picks: DraftPick[]
	memberData: Map<string, SleeperUser> | undefined
	disabledMembers: string[]
	allowExternalMemberPicks: boolean
}

const defaultColumns = [
	{
		pick_no: 1,
		name: 'Person',
		position: 'Manager',
		picked_by: 'Person',
	},
]

const DraftSniperPickTable = (props: MyProps) => {
	const [memberData, setMemberData] = useState(props.memberData)
	const [sortColumn, setSortColumn] = useState()
	const [sortType, setSortType] = useState()
	const [loading, setLoading] = useState(false)
	const draftPicks = props.picks
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
		.sort((a: DraftPick, b: DraftPick) => a.pick_no - b.pick_no)

	const getData = () => {
		if (sortColumn && sortType) {
			return draftPicks.sort((a: DraftPick, b: DraftPick) => {
				let x = a[sortColumn]
				let y = b[sortColumn]
				if (sortType === 'asc') {
					return x - y
				} else {
					return y - x
				}
			})
		}
		return draftPicks
	}

	const UserImageCell = ({
		rowData,
		dataKey,
		...props
	}: {
		rowData: any
		dataKey: any
	}) => {
		const speaker = (
			<Popover title={`${memberData?.get(rowData[dataKey])?.display_name}`} />
		)
		return (
			<Cell {...props} style={{paddingTop: 5}}>
				<Whisper placement='top' speaker={speaker}>
					<Avatar
						src={`https://sleepercdn.com/avatars/thumbs/${
							memberData?.get(rowData[dataKey])?.avatar ??
							'8eb8f8bf999945d523f2c4033f70473e'
						}`}
						size='sm'
					/>
				</Whisper>
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
			<Cell {...props} style={{paddingTop: 5, paddingBottom: 5}}>
				<HStack>
					<Avatar
						alt={rowData['metadata']['first_name']}
						src={
							/\d/.test(srcString)
								? `https://sleepercdn.com/content/nfl/players/${srcString}.jpg`
								: `https://sleepercdn.com/images/team_logos/nfl/${srcString.toLowerCase()}.png`
						}
						size='sm'
						circle
						style={{background: 'none', minWidth: 30, height: 30}}
					/>
					<Box  whiteSpace={"nowrap"} textOverflow={'ellipsis'}  display={"block"} overflow={"hidden"}>
						{`${rowData.metadata.first_name} ${rowData.metadata.last_name}`}
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
			height={400}
			data={getData()}
			headerHeight={30}
			rowHeight={40}
			sortColumn={sortColumn}
			sortType={sortType}
			onSortColumn={handleSortColumn}
			loading={loading}
		>
			<Column width={65} align='center' fixed sortable>
				<HeaderCell style={{padding: 4}}>Pick</HeaderCell>
				<Cell style={{padding: 10}} dataKey='pick_no' />
			</Column>
			<Column flexGrow={3}>
				<HeaderCell style={{padding: 4}}>Player</HeaderCell>
				<PlayerImageCell
					dataKey='player_id'
					rowData={(rowData: any) => rowData}
				/>
			</Column>
			<Column width={50}>
				<HeaderCell style={{padding: 4}}>Pos</HeaderCell>
				<Cell style={{padding: 10}} dataKey='metadata.position' />
			</Column>

			<Column flexGrow={1}>
				<HeaderCell style={{padding: 4}}>Picked By</HeaderCell>
				<UserImageCell
					dataKey='picked_by'
					rowData={(rowData: any) => rowData}
				/>
			</Column>
		</Table>
	)
}

export default DraftSniperPickTable
