import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading
} from '@chakra-ui/react'
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { DraftPick } from '../sleeper/DraftPick'
import { DraftSettings } from '../sleeper/DraftSettings'
import { LeagueSettings } from '../sleeper/LeagueSettings'
import { SleeperUser } from '../sleeper/SleeperUser'
import DraftSniperPickTable from './DraftSniperPickTable'
import DraftTableFilterTabs from './DraftTableFilterTabs'

interface MyProps {
	leagueMembers: SleeperUser[] | undefined
	drafts: DraftSettings[] | undefined
	picks: DraftPick[] | undefined
	league: LeagueSettings | undefined
}
const DraftSniperLeaguePage = (props: MyProps) => {
	const [drafts, setDrafts] = useState(new Map())
	const [leagueMemberInfo, setLeagueMemberInfo] = useState(new Map())
	const [picks, setPicks] = useState(props.picks?.flat() ?? [])
	const [disabledMembers, setDisabledMembers] = useState([] as string[])

	function toggleMember(checkbox: any) {
		if (
			checkbox.currentTarget.checked &&
			disabledMembers.includes(checkbox.currentTarget.value)
		) {
			const index = disabledMembers.indexOf(checkbox.currentTarget.value, 0)
			if (index > -1) {
				const nextState = produce(disabledMembers, (draftState: string[]) => {
					draftState.splice(index, 1)
				})

				setDisabledMembers(nextState)
			}
		} else {
			const nextState = produce(disabledMembers, (draftState: string[]) => {
				draftState.push(checkbox.currentTarget.value)
			})

			setDisabledMembers(nextState)
		}
	}

	useEffect(() => {
		let memberMap = new Map()
		props.leagueMembers?.forEach((user: SleeperUser) => {
			memberMap.set(user.user_id, user)
		})
		setLeagueMemberInfo(memberMap)
		let draftSettingsMap = new Map()
		props.drafts?.forEach((draftSettings: DraftSettings) => {
			draftSettingsMap.set(draftSettings.draft_id, draftSettings)
		})
		setDrafts(draftSettingsMap)
		setPicks(props.picks?.flat() ?? [])
	}, [props.drafts, props.leagueMembers, props.picks])

	const desktopGrid = `"header header header"
    "filter_tabs filter_tabs filter_tabs"
    "draft_board draft_board draft_board"`

	const mobileGrid = `"header"
  "filter_tabs"
  "draft_board"`

	return (
		<Box bg={'surface.6'} overflow={'clip'} w={'100vw'} h={'100vh'}>
			<Grid
				gap={3}
				px={4}
				color={'white'}
				templateAreas={[mobileGrid, desktopGrid]}
				gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
			>
				<GridItem gridArea={'header'} py={4}>
					<Heading size={'md'}>{props.league?.name}</Heading>
				</GridItem>
				<GridItem gridArea={'filter_tabs'} overflowX={'clip'}>
					{leagueMemberInfo.size > 0 &&
						drafts.size > 0 &&
						props.leagueMembers != undefined && drafts != undefined && (
							<DraftTableFilterTabs
								users={props.leagueMembers}
								onClick={toggleMember as any}
							/>
						)}
				</GridItem>
				<GridItem gridArea={'draft_board'}>
					<Container
						overflowX={'hidden'}
						overflowY={'auto'}
						backgroundColor={'surface.0'}
                        padding={0}
                        margin={0}
						className='rs-theme-dark'
					>
						{picks.length > 0 && leagueMemberInfo.size > 0 && (
							<DraftSniperPickTable
								picks={picks}
								memberData={leagueMemberInfo}
								disabledMembers={disabledMembers}
								allowExternalMemberPicks={false}
							/>
						)}
					</Container>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default DraftSniperLeaguePage
