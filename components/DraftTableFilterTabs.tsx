import {Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid, Box, HStack} from '@chakra-ui/react'
import DraftSniperDraft from '../classes/DraftSniperDraft'
import { SleeperUser } from '../sleeper/SleeperUser'
import DraftSniperMemberToggleCard from './DraftSniperMemberToggleCard'

interface DraftTableFilterTabsProps {
    drafts: DraftSniperDraft[] | undefined | null
    users: SleeperUser[] | undefined | null
}

const DraftTableFilterTabs = (props: DraftTableFilterTabsProps) => {
	return (
		<Tabs isFitted size={"sm"} variant='soft-rounded' align='center' >
			<TabList >
				<Tab>Members</Tab>
				<Tab>Drafts</Tab>
                <Tab>Positions</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
                    <HStack spacing={2} overflowX={"auto"} paddingY={2}>
                    {props.users && props.users.map((user, index) => {
                        return <DraftSniperMemberToggleCard key={user.user_id} name={user.display_name} avatar={user.avatar} number_of_drafts={5} member_id={user.user_id} onClick={function (): void {
                            throw new Error('Function not implemented.')
                        } }/>
                    })
                    }
                    </HStack>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
                <TabPanel>
					<p>Three</p>
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
