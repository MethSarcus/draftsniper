
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

const Overview = () => {
    const router = useRouter();
    const [context, setContext] = useContext(Context);
    const [leagueContext, setLeagueContext] = useContext(LeaguesContext);

    const fetcher = (url: string)  => axios.get(url).then(function(res) { 
        setContext(res.data.user_id);
        return axios.get('https://api.sleeper.app/v1/user/' + res.data.user_id + '/leagues/nfl/2022')
    }).then(res => res.data);
    
    const { data, error } = useSWR('https://api.sleeper.app/v1/user/' + router.query.username, fetcher);
    
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    
    return (
        <div>
            <h1>{router.query.username}</h1>
            <h2>{context}</h2>
            
                <Box maxHeight={400}><LeagueCarousel leagues={data}></LeagueCarousel></Box>
                <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(12, 1fr)'
                p={4}
                gap={1}>
                    <GridItem rowSpan={2} colSpan={6}>
                    <Box
                    role={'group'}
                    maxW={'1000px'}
                    rounded={'lg'}
                    overflowY="auto"
                    maxHeight={800}
                    zIndex={1}>
                        <FilterablePickTable leagues={data}/>
                    </Box>
                </GridItem>
                {data.filter((it:LeagueSettings) => {return it.status != "pre_draft"}).map(function(item: LeagueSettings) {
                    return (<GridItem key={item.league_id} rowSpan={2} colSpan={3} >
                            <Box
                            role={'group'}
                            p={4}
                            maxW={'600px'}
                            bg={'white.800'}
                            boxShadow={'2xl'}
                            rounded={'lg'}
                            overflowY="auto"
                            maxHeight={800}
                            zIndex={1}><PositionDraftTable draftId={item.draft_id}/>
                            </Box>
                    </GridItem>)})}
                <GridItem rowSpan={2} colSpan={3}>
                    <Box
                    role={'group'}
                    p={4}
                    maxW={'600px'}
                    bg={'white.800'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    overflowY="auto"
                    maxHeight={800}
                    zIndex={1}>
                        <AllPicksTable/>
                    </Box>
                </GridItem>
                
            </Grid>
            
        </div>
    );
}

export default Overview;