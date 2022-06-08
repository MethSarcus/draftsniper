import { Checkbox, Heading, Stack } from "@chakra-ui/react"
import axios from "axios"
import React, { useState } from "react"
import { useContext } from "react"
import useSWR from "swr"
import { Context } from "../contexts/Context"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { getAllLeaguePositions, POSITION } from "../utility/rosterFunctions"
import DraftPickDataTable from "./DraftPickDataTable"
import { Divider } from "@chakra-ui/react"
import PositionalPickTableGroup from "./PositionalPickTableGroup"
import { PicksContext } from "../contexts/PicksContext"



type MyProps = { leagues: LeagueSettings[] }

const FilterablePickTable = (props: MyProps) => {
	const [context, setContext] = useContext(Context)
	const [picksContext, setPicksContext] = useContext(PicksContext);
	const fetcher = (url: string) => axios.get(url).then((res) => res.data)
	const [includedDrafts, setIncludedDrafts] = useState(
		props.leagues.map((league) => league.draft_id)
	)

	const { data, error } = useSWR(`/api/picks/${context.id}`, fetcher)
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

	const [includedPositions, setIncludedPositions] = useState(
		getAllLeaguePositions(props.leagues)
	)

	const handlePositionChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.checked) {
			let newVar = [...includedPositions]
			if (newVar.includes(event.target.value as POSITION)) {
				let ind = newVar.indexOf(event.target.value as POSITION)
				newVar.splice(ind, 1)
				setIncludedPositions(newVar)
			}
		} else {
			let newVar = [...includedPositions]
			if (!newVar.includes(event.target.value as POSITION)) {
				newVar.push(event.target.value as POSITION)
				setIncludedPositions(newVar)
			}
		}
	}

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>
	if(data) {
		setPicksContext(data.picks)
	}

	return (
		<div>
			<Heading as='h6' size='xs'>
				Leagues
			</Heading>
			<Stack direction='row'>
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
							{league.name}
						</Checkbox>
					)
				})}
			</Stack>
			<Divider />
			<Heading as='h6' size='xs'>
				Positions
			</Heading>
			<Stack direction='row'>
				{getAllLeaguePositions(props.leagues).map(
					(position: string) => {
						return (
							<Checkbox
								key={position}
								onChange={handlePositionChange.bind(this)}
								size='sm'
								colorScheme='green'
								value={position}
								defaultChecked
							>
								{position}
							</Checkbox>
						)
					}
				)}
			</Stack>
			<DraftPickDataTable
				picks={data.picks}
				includedDrafts={includedDrafts}
				includedPositions={includedPositions}
			/>
		</div>
	)
}

export default FilterablePickTable
