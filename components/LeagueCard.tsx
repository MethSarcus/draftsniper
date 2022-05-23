import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  StatGroup,
} from '@chakra-ui/react'

type MyProps = { leagueNumTeams: string, leagueName: string, draftState: string };

export default class LeagueCard extends React.Component<MyProps> {
    
constructor(props: MyProps) {
    super(props);
}

    render() {
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
        zIndex={1}>
        <StatLabel>Teams: {this.props.leagueNumTeams}</StatLabel>
        <StatNumber>{this.props.leagueName}</StatNumber>
        <StatHelpText>Currently {this.props.draftState}</StatHelpText>
        </Box>
      </Stat>
      )
    }
  }