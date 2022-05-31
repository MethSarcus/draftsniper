import { Checkbox, Stack } from "@chakra-ui/react"
import axios from "axios"
import React, { useState } from "react"
import { useContext } from "react"
import useSWR from "swr"
import { Context } from "../contexts/Context"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import DraftPickDataTable from "./DraftPickDataTable"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

type MyProps = { leagues: LeagueSettings[] }

const FilterablePickTable = (props: MyProps) => {
	const [context, setContext] = useContext(Context)
	const [includedDrafts, setIncludedDrafts] = useState(
		props.leagues.map((league) => league.draft_id)
	)
	const { data, error } = useSWR(`/api/picks/${context}`, fetcher)
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.checked) {
			let newVar = [...includedDrafts]
			if (newVar.includes(event.target.value)) {
				let ind = newVar.indexOf(event.target.value)
				newVar.splice(ind, 1)
				setIncludedDrafts(newVar)
			}
		} else {
			let newVar = [...includedDrafts]
			if (!newVar.includes(event.target.value)) {
				newVar.push(event.target.value)
				setIncludedDrafts(newVar)
			}
		}
	}

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	return (
		<div>
			<Stack>
				{props.leagues.map((league: LeagueSettings) => {
					return (
						<Checkbox
							key={league.draft_id}
							onChange={handleChange.bind(this)}
							size='sm'
							colorScheme='green'
							value={league.draft_id}
							defaultChecked
						>
							{league.draft_id}
						</Checkbox>
					)
				})}
			</Stack>
			<DraftPickDataTable picks={data.picks} includedDrafts={includedDrafts} />
		</div>
	)
}

export default FilterablePickTable
