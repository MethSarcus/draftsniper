import { Cell, Column, HeaderCell, Table } from "rsuite-table"
import { DraftPick, SnakeMetadata } from "../sleeper/DraftPick"
import PlayerImageCell from "./PlayerImageCell"
import NumPicksAvatarGroup from "./NumPicksAvatarGroup"
import { useMediaQuery } from "@chakra-ui/react"
import { useState } from "react"
import { SleeperUser } from "../sleeper/SleeperUser"

interface MyProps {
    picks: AdpPick[]
    memberData: Map<string, SleeperUser> | undefined
 }

 

const AdpTable = (myProps: MyProps) => {
    const [loading, setLoading] = useState(false)
    const [sortColumn, setSortColumn] = useState()
	const [sortType, setSortType] = useState()
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
		ssr: true,
		fallback: false, // return false on the server, and re-evaluate on the client side
	})

    const handleSortColumn = (sortColumn: any, sortType: any) => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setSortColumn(sortColumn)
			setSortType(sortType)
		}, 200)
	}
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
				<NumPicksAvatarGroup drafted_by_ids={drafted_by_ids} memberData={myProps.memberData}/>
			</Cell>
		)
	}

    const getData = () => {
		if (sortColumn && sortType) {
			return myProps.picks.sort((a: AdpPick, b: AdpPick) => {
				let x = a[sortColumn]
				let y = b[sortColumn]
				if (sortType === 'asc') {
					return x - y
				} else {
					return y - x
				}
			})
		} else {
			return myProps.picks.sort((a: AdpPick, b: AdpPick) => {
				{
					return a.adp - b.adp
				}
		})}}
return (<Table
    virtualized
    height={isLargerThan800 ? 700 : 300}
    data={getData()}
    headerHeight={30}
    rowHeight={60}
	hover={false}
    sortColumn={sortColumn}
    sortType={sortType}
    onSortColumn={handleSortColumn}
    loading={loading}
>
    <Column width={55} flexGrow={.5} align='center' fixed sortable>
        <HeaderCell style={{padding: 4}}>ADP</HeaderCell>
        <Cell dataKey='adp'>{rowData => Math.round(rowData["adp"])}</Cell>
    </Column>
    <Column flexGrow={2} fixed>
        <HeaderCell style={{padding: 4}}>Player</HeaderCell>
        <PlayerImageCell
            dataKey='player_id'
            rowData={(rowData: any) => rowData}
        />
    </Column>

    <Column flexGrow={2}>
        <HeaderCell style={{padding: 4}}>Picked By</HeaderCell>
        <AvatarGroupCell
            dataKey='drafted_by'
            rowData={(rowData: any) => rowData}
        />
    </Column>
	<Column align='center' flexGrow={.5}>
        <HeaderCell style={{padding: 4}}>Range</HeaderCell>
        <Cell dataKey='range'>{rowData => `${rowData["highest_pick"]} - ${rowData["lowest_pick"]}`}</Cell>
    </Column>
</Table>)
}


export interface AdpPick {
	adp: number
	player_id: string
	drafted_by: Map<string, number>
    metadata: SnakeMetadata
	highest_pick: number
	lowest_pick: number
}


export default AdpTable