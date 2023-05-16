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
	loading: boolean
	memberData: Map<string, SleeperUser> | undefined
}

const PositionalTableGroup = (props: MyProps) => {
	let positionalPickMap = new Map<POSITION, AdpPick[]>()
	for (let [key, value] of props.picks) {
		let adp = value.map((pick) => pick.pick_no).reduce((a, b) => a + b, 0) / value.length
		let pos = value[0].metadata.position as POSITION
		let drafted_by = new Map<string, number>()
		value.forEach((pick) => {
			if (drafted_by.has(pick.picked_by)) {
				drafted_by.set(pick.picked_by, drafted_by.get(pick.picked_by)! + 1)
			} else {
				drafted_by.set(pick.picked_by, 1)
			}
		})

		if (positionalPickMap.has(pos)) {
			positionalPickMap.get(pos)?.push({
				adp: adp,
				player_id: value[0].player_id,
				drafted_by: drafted_by,
				metadata: value[0].metadata,
			})
		} else {
			positionalPickMap.set(pos, [
				{
					adp: adp,
					player_id: value[0].player_id,
					drafted_by: drafted_by,
					metadata: value[0].metadata,
				},
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
					loading={props.loading}
					memberData={props.memberData}
				/>
			</Box>
		</VStack>
	)
}

export default PositionalTableGroup
