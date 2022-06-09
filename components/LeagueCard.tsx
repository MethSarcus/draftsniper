import {
  Box, Button, Stat, StatHelpText, StatLabel,
  StatNumber
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type MyProps = { leagueNumTeams: string, leagueName: string, draftState: string, draftId: string };


const LeagueCard = (props: MyProps) => {
  const router = useRouter();

function onSub(e: React.SyntheticEvent) {
  
  e.preventDefault();
  router.push({pathname: '/user/' + router.query.username + '/draft/' + props.draftId})
}

      return (
      <Stat size="sm">
        <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={'white.800'}
        boxShadow={'md'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        >
        <StatLabel>Teams: {props.leagueNumTeams}</StatLabel>
        <StatNumber>{props.leagueName}</StatNumber>
        <StatHelpText>Currently {props.draftState}</StatHelpText>
        <Button onClick={onSub} variant='outline' colorScheme='teal' size='xs'>
          View Draft
        </Button>
        </Box>
      </Stat>
      )
  }

  export default LeagueCard;