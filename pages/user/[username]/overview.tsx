
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { Grid, GridItem, Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button } from '@chakra-ui/react'
import LeagueCarousel from '../../../components/LeagueCarousel';
import PositionDraftTable from '../../../components/PositionDraftTable';
import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import { LeaguesContext } from '../../../contexts/LeaguesContext';
import { LeagueSettings } from '../../../interfaces/sleeper_api/LeagueSettings';
import AllPicksTable from '../../../components/AllPicksTable'
import FilterablePickTable from '../../../components/FilterablePickTable';
import { PicksContext } from '../../../contexts/PicksContext';
import PositionalPickTableGroup from '../../../components/PositionalPickTableGroup';
import CurrentMember from '../../../interfaces/FocusedMember';

const Overview = () => {
    const router = useRouter();
    const [context, setContext] = useContext(Context);
    const [leaguesContext, setLeaguesContext] = useContext(LeaguesContext);
    const [picksContext, setPicksContext] = useContext(PicksContext);

    const fetcher = (url: string)  => axios.get(url).then(function(res) { 
        setContext(new CurrentMember(res.data));
        return axios.get('https://api.sleeper.app/v1/user/' + res.data.user_id + '/leagues/nfl/2022')
    }).then(res => res.data);
    
    const { data, error } = useSWR('https://api.sleeper.app/v1/user/' + router.query.username, fetcher);
    
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    
    return (
        <div>
            <h1>{context.displayName}</h1>
            <h2>{context.username}</h2>
            <h2>{context.avatar}</h2>
            <h2>{context.id}</h2>
            
                <Box maxHeight={400}><LeagueCarousel leagues={data}></LeagueCarousel></Box>
                <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(12, 1fr)'
                p={4}
                gap={1}>
                    <GridItem rowSpan={2} colSpan={8}>
                    <Box
                    role={'group'}
                    rounded={'lg'}
                    overflowY="auto"
                    maxHeight={800}
                    zIndex={1}>
                        <FilterablePickTable leagues={data}/>
                    </Box>
                </GridItem>
                <GridItem rowSpan={4} colSpan={12}>
                    <Box
                    role={'group'}
                    rounded={'lg'}
                    overflowY="auto"
                    maxHeight={800}
                    zIndex={1}>
                        {/* {leaguesContext? <PositionalPickTableGroup/> : null}  */}
                    </Box>
                </GridItem>
            </Grid>
            
        </div>
    );
}

export default Overview;