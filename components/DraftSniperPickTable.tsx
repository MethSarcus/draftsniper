import { Table, HeaderCell, Column, Cell } from 'rsuite-table';
import { DraftPick } from '../sleeper/DraftPick';
import { useState } from 'react';
import { Avatar, Whisper, Popover } from 'rsuite';
import { SleeperUser } from '../sleeper/SleeperUser';
import { Center, HStack, Text} from '@chakra-ui/react';

interface MyProps {
	picks: DraftPick[]
  memberData: Map<string, SleeperUser> | undefined
  disabledMembers: string[]
  allowExternalMemberPicks: boolean
}

const defaultColumns = [
  {
    pick_no: 1,
    name: 'Person',
    position: 'Manager',
    picked_by: 'Person'
  }
]

const DraftSniperPickTable = (props: MyProps) => {
  const [memberData, setMemberData] = useState(props.memberData)
  const draftPicks = props.picks.filter((pick) => {
    if (props.allowExternalMemberPicks) {
      return !props.disabledMembers.includes(pick.picked_by) && pick.picked_by != ""
    } else {
      return !props.disabledMembers.includes(pick.picked_by) && pick.picked_by != "" && memberData?.has(pick.picked_by)
    }
    
  }).sort((a: DraftPick, b: DraftPick) => a.pick_no - b.pick_no)
  const UserImageCell = ({ rowData, dataKey, ...props }: {rowData: any, dataKey: any}) => {
    const speaker = (
      <Popover title={`${memberData?.get(rowData[dataKey])?.display_name}`}/>
    );
    return(<Cell {...props} style={{paddingTop: 8}}>
      <Whisper placement="top" speaker={speaker}>
      <Avatar  src={`https://sleepercdn.com/avatars/thumbs/${memberData?.get(rowData[dataKey])?.avatar ?? '8eb8f8bf999945d523f2c4033f70473e'}`} size='sm' />
      </Whisper>
    </Cell>)
  }  

  const PlayerImageCell = ({ rowData, dataKey, ...props }: {rowData: any, dataKey: any}) => {
    const srcString = rowData[dataKey]

    return(<Cell {...props}  style={{paddingTop: 0, paddingBottom: 0}}>
      <HStack>
      <Avatar alt={rowData["metadata"]["first_name"]} src={/\d/.test(srcString) ? `https://sleepercdn.com/content/nfl/players/${srcString}.jpg` : `https://sleepercdn.com/images/team_logos/nfl/${srcString.toLowerCase()}.png`} size='sm' circle style={{ background: 'none'}} />
      <Text>{`${rowData.metadata.first_name} ${rowData.metadata.last_name}`}</Text>
      </HStack>
      
    </Cell>)
  };

  return (
<Table virtualized height={400} data={draftPicks} headerHeight={30}
          rowHeight={30}>
      <Column flexGrow={0} align="center" fixed>
        <HeaderCell style={{padding: 4}}>Pick</HeaderCell>
        <Cell style={{padding: 4}} dataKey="pick_no" />
      </Column>
      <Column flexGrow={3}>
        <HeaderCell style={{padding: 4}}>Player</HeaderCell>
        <PlayerImageCell dataKey="player_id" rowData={(rowData: any) => rowData}/>
      </Column>

      {/* <Column flexGrow={2}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="metadata.name">{rowData => {
          return `${rowData.metadata.first_name} ${rowData.metadata.last_name}`}}</Cell>
      </Column> */}

      <Column flexGrow={0}>
        <HeaderCell style={{padding: 4}}>position</HeaderCell>
        <Cell dataKey="metadata.position" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell style={{padding: 4}}>Picked By</HeaderCell>
        <UserImageCell dataKey="picked_by" rowData={(rowData: any) => rowData}/>
      </Column>
    </Table>
  )
}



export default DraftSniperPickTable
