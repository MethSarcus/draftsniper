import {Draft} from 'immer'
import {DraftPick} from '../sleeper/DraftPick'
import {POSITION} from '../utility/rosterFunctions'
import AdpTable, {AdpPick} from './AdpTable'
import {
	Radio,
	RadioGroup,
	SimpleGrid,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Box,
	VStack,
} from '@chakra-ui/react'
import {SleeperUser} from '../sleeper/SleeperUser'
import {useState} from 'react'

interface MyProps {
	picks: Map<string, DraftPick[]>
	memberData: Map<string, SleeperUser> | undefined
}

const PositionalTableGroup = (props: MyProps) => {
	let positionalPickMap = new Map<POSITION, AdpPick[]>()
	for (let [key, value] of props.picks) {
		let adp = value.map((pick) => pick.pick_no).reduce((a, b) => a + b, 0) / value.length
		let pos = value[0].metadata.position as POSITION
		let drafted_by = new Map<string, number>()
		let highestPick = 5000;
		let lowestPick = 0;
		value.forEach((pick) => {
			let id = pick.picked_by
			if (!props.memberData?.has(pick.picked_by)) {
				id='External Member'
			}
			if (drafted_by.has(id)) {
				drafted_by.set(id, drafted_by.get(id)! + 1)
			} else {
				drafted_by.set(id, 1)
			}

			if (pick.pick_no < highestPick) {
				highestPick = pick.pick_no
			}
			if (pick.pick_no > lowestPick) {
				lowestPick = pick.pick_no
			}

		})
		let adpPick = {
			adp: adp,
			player_id: value[0].player_id,
			drafted_by: drafted_by,
			metadata: value[0].metadata,
			highest_pick: highestPick,
			lowest_pick: lowestPick
		}

		if (positionalPickMap.has(pos)) {
			positionalPickMap.get(pos)?.push(adpPick)
		} else {
			positionalPickMap.set(pos, [
				adpPick,
			])
		}
	}
	const [value, setValue] = useState('all')
	return (
		<VStack bg={"surface.0"}>
			<RadioGroup onChange={setValue} value={value} p={3} >
				<Stack direction='row' >
                <Radio size={"lg"} value={"all"}>All</Radio>
					{Array.from(positionalPickMap.keys()).map((position) => {
						return (
							<Radio size={"lg"} key={position} value={position}>
								{position}
							</Radio>
						)
					})}
				</Stack>
			</RadioGroup>
			<Box width={'100%'}>
				<AdpTable
					picks={value != "all" ? positionalPickMap.get(value as POSITION) ?? [] : Array.from(positionalPickMap.values()).flat()}
					memberData={props.memberData}
				/>
			</Box>
		</VStack>
	)
}

export default PositionalTableGroup
