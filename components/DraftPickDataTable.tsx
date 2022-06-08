import DataTable, {
	ExpanderComponentProps,
	TableColumn,
} from "react-data-table-component"
import {
	CombinedDraftPick,
	DraftPick,
} from "../interfaces/sleeper_api/DraftPick"
import React from "react"
import { useContext } from "react"
import { Context } from "../contexts/Context"

type MyProps = {
	picks: DraftPick[]
	includedDrafts: string[]
	includedPositions: string[]
}

interface DataRow {
	id: string
	pick: number
	player: string
	picked_by: string
	draft_id: string
}

const columns: TableColumn<DataRow>[] = [
	{
		name: "Pick",
		selector: (row) => row.pick,
		sortable: true,
	},
	{
		name: "Player",
		selector: (row) => row.player,
		sortable: true,
	},
]

const DraftPickDataTable = (props: MyProps): JSX.Element => {
	const [context] = useContext(Context)
	// data provides access to your row data

	const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
		data,
	}) => {
		return (
			<pre>
				{JSON.stringify(
					data,
					["pick", "player", "picked_by", "draft_id"],
					2
				)}
			</pre>
		)
	}
	const conditionalRowStyles = [
		{
			when: (row: any) => row.id.includes(context.id),
			style: {
				backgroundColor: "green",
				color: "white",
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
	]

	return (
		<DataTable
			columns={columns}
			data={props.picks
				.filter((e) => {
					return props.includedDrafts.includes(e.draft_id)
				})
				.filter((e) => {
					return props.includedPositions.includes(e.metadata.position)
				})
				.map((pick: DraftPick) => formatPickForTable(pick))}
			conditionalRowStyles={conditionalRowStyles}
			expandableRows
			expandableRowsComponent={ExpandedComponent}
			dense
		/>
	)
}

function formatPickForTable(pick: DraftPick): DataRow {
	return {
		id: pick.picked_by + "_" + pick.player_id + "_" + pick.draft_id,
		pick: pick.pick_no,
		player: pick.metadata.first_name + " " + pick.metadata.last_name,
		picked_by: pick.picked_by,
		draft_id: pick.draft_id,
	}
}

export default DraftPickDataTable
