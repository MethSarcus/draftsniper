import React from 'react';
import { LeagueSettings } from '../interfaces/sleeper_api/LeagueSettings';
import LeagueCard from './LeagueCard';
import {StatGroup} from '@chakra-ui/react'

type MyProps = { leagues: LeagueSettings[] };
export default class LeagueCarousel extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);
    }
    
    render() {
        return (
        <div>
            <StatGroup>{this.props.leagues.map((league) => {
            return <LeagueCard key={league.league_id} leagueName={league.name} leagueNumTeams={league.total_rosters.toString()} draftState={league.status} draftId={league.draft_id}></LeagueCard>
        })}</StatGroup>
        </div>
        )
    }
}