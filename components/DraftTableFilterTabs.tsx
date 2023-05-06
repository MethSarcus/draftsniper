import {Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid, Box, HStack, Spinner} from '@chakra-ui/react'
import {SleeperUser} from '../sleeper/SleeperUser'
import DraftSniperMemberToggleCard from './DraftSniperMemberToggleCard'
import {DraftSettings} from '../sleeper/DraftSettings'
import DraftSettingsCard from './DraftSettingsCard'

interface DraftTableFilterTabsProps {
	users: SleeperUser[] | undefined | null
	drafts: DraftSettings[]
	onMemberClick: () => any
	onDraftClick: () => any
}

const DraftTableFilterTabs = (props: DraftTableFilterTabsProps) => {
	return (
		<Tabs isFitted size={'sm'} variant='soft-rounded' align='center'>
			<TabList>
				<Tab>Members</Tab>
				<Tab>Drafts</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<Box overflowX={'auto'}>
						{props.users != undefined && (
							<SimpleGrid
								width={'-moz-max-content'}
								columns={Math.round(props.users.length / 4)}
								spacing={2}
								paddingY={2}>
								{props.users &&
									props.users.map((user, index) => {
										return (
											<DraftSniperMemberToggleCard
												key={user.user_id}
												name={user.display_name}
												avatar={user.avatar}
												teamName={user.metadata.team_name ?? 'No Team Name'}
												member_id={user.user_id}
												onClick={props.onMemberClick}
											/>
										)
									})}
							</SimpleGrid>
						)}
					</Box>
				</TabPanel>
				<TabPanel>
					<Box overflowX={'auto'}>
						{props.drafts != undefined && (
							<SimpleGrid
								width={'-moz-max-content'}
								columns={Math.round(props.drafts?.length / 4)}
								spacing={2}
								paddingY={2}>
								{[...new Set(props.drafts)].map((draft) => {
									return (
										<DraftSettingsCard
											onClick={props.onDraftClick}
											key={draft.league_id + '_' + draft.draft_id + '_draft'}
											draft={draft}
											leagueUsers={props.users?.map((user) => user.user_id) ?? []}
										/>
									)
								})}
							</SimpleGrid>
						)}
					</Box>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

interface Member {
	name: string
	member_id: string
	number_of_drafts: number
	image_url: string
}

export default DraftTableFilterTabs
