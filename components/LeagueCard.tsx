import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  StatGroup,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';

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
        onClick={onSub}>
        <StatLabel>Teams: {props.leagueNumTeams}</StatLabel>
        <StatNumber>{props.leagueName}</StatNumber>
        <StatHelpText>Currently {props.draftState}</StatHelpText>
        </Box>
      </Stat>
      )
  }

  export default LeagueCard;