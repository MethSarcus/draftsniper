import {Button, Text, Stack, Spacer, ButtonGroup, Box, Checkbox, Center, Link} from '@chakra-ui/react'
import router, {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import {getLeagueReceptionScoringType} from '../utility/rosterFunctions'
import ScoringPopover from './DraftPopover'
import useSWR from 'swr'
import axios from 'axios'
import {LeagueSettings} from '../sleeper/LeagueSettings'
import {DraftSettings} from '../sleeper/DraftSettings'
import {Whisper, Popover, Badge, Avatar, AvatarGroup} from 'rsuite'
import {SleeperUser} from '../sleeper/SleeperUser'
import DraftSettingsPopover from './DraftPopover'

type MyProps = {
	leagueUsers: string[]
	draft: DraftSettings
	onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const DraftSettingsCard = (props: MyProps) => {
	const fetcher = (url: string) => axios.get(url).then((res) => res.data)
	const [commonUsers, setCommonUsers] = React.useState([])
	const {data: leagueData, error: leagueDataError} = useSWR(
		props.draft?.league_id != undefined ? `https://api.sleeper.app/v1/league/${props.draft.league_id}` : null,
		fetcher
	)

	const {data: draftUsers, error: draftUsersError} = useSWR(
		props.draft?.league_id != undefined
			? `https://api.sleeper.app/v1/league/${props.draft.league_id}/users`
			: null,
		fetcher
	)

	useEffect(() => {
		if (draftUsers != undefined) {
			const commonUsers = draftUsers.filter((user: SleeperUser) => props.leagueUsers?.includes(user.user_id))
			setCommonUsers(commonUsers)
		}
	}, [draftUsers, props.leagueUsers])

	if ((leagueData as LeagueSettings)?.scoring_settings == undefined || leagueData?.settings == undefined) {
		return <Box>Null League</Box>
	}
	const scoringType = getLeagueReceptionScoringType(leagueData as LeagueSettings)
	return (
		<Stack
			spacing={1}
			direction='column'
			
			boxShadow={'lg'}
			p={2}
			minH={110}
			minW={'200px'}
			maxW={'250px'}
			alignContent={'center'}
			alignItems={'center'}
			rounded={'md'}
			bg='surface.1'
			textColor={'textTheme.highEmphasis'}>
			<Stack direction={'row'} textColor={'textTheme.mediumEmphasis'}>
				<Text fontSize='xs'>{scoringType.leagueTypeString}</Text>
				<Spacer />
				<Text fontSize='xs'>{scoringType.numQbString}</Text>
				<Spacer />
				<Text fontSize='xs'>{scoringType.pprString}</Text>
				<Spacer />
			</Stack>
			<Center as='b' fontSize='sm' textAlign={'center'}>
				<Checkbox
					mr={1}
					size={'md'}
					colorScheme={'primary'}
					id={props.draft.league_id}
					defaultChecked
					value={props.draft.draft_id}
					onChange={props.onClick}
				/>
				<Text noOfLines={1}>{leagueData.name}</Text>
			</Center>

			<Stack direction={'row'} textColor={'textTheme.mediumEmphasis'}>
				<Spacer />
				<Text fontSize='xs'>{props.draft.type}</Text>
				<Spacer />
				<Text fontSize='xs'>{props.draft.settings.rounds} Round</Text>
				<Spacer />
			</Stack>

			<ButtonGroup spacing={1}>
				<Button variant='outline' colorScheme='primary_google' size='xs'>
					<Link
						style={{textDecoration: 'none', color: 'inherit'}}
						color={'inherit'}
						textDecoration={'none'}
						isExternal
						rel='noreferrer'
						href={`/draft/${props.draft.draft_id}`}>
						View Draft
					</Link>
				</Button>
				<DraftSettingsPopover draft={props.draft} league={leagueData} />
			</ButtonGroup>
			<Spacer />
			<Box overflowX={'auto'}>
				<AvatarGroup stack>
					{commonUsers.map((user: SleeperUser) => {
						const speaker = <Popover title={`${user?.display_name}`} />
						return (
							<Whisper
								key={`${user.display_name}_${props.draft.draft_id}_whisper`}
								placement='top'
								speaker={speaker}>
								<Avatar
									src={`https://sleepercdn.com/avatars/thumbs/${
										user.avatar ?? '8eb8f8bf999945d523f2c4033f70473e'
									}`}
									size='sm'
								/>
							</Whisper>
						)
					})}
				</AvatarGroup>
			</Box>
		</Stack>
	)
}

export default DraftSettingsCard
