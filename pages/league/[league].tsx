import {Box, Container, Grid, GridItem, Heading, Skeleton} from '@chakra-ui/react'
import axios from 'axios'
import {useContext, useEffect, useMemo, useState} from 'react'
import useSWR from 'swr'
import DraftSniperDraft from '../../classes/DraftSniperDraft'
import DraftSniperPickTable from '../../components/DraftSniperPickTable'
import DraftTableFilterTabs from '../../components/DraftTableFilterTabs'
import { DraftPick } from '../../sleeper/DraftPick'
import { DraftSettings } from '../../sleeper/DraftSettings'
import { useRouter } from 'next/router'
import { SleeperUser } from '../../sleeper/SleeperUser'
import DraftSniperLeaguePage from '../../components/DraftSniperLeaguePage'



const DraftSniperPage = () => {
    const router = useRouter();
	const fetcher = (url: string) => axios.get(url).then((res) => res.data)
	function multiFetcher(urls: any[]) {
		return Promise.all(urls.map((url) => fetcher(url)))
	}

	const {data: unique_drafts, error: unique_drafts_error} = useSWR(
		router?.query?.league != undefined ? `/api/leagueinfo/${router?.query?.league}` : null,
		fetcher
	)

	const {data: leagueData, error: leagueDataError} = useSWR(
		router?.query?.league != undefined
			? `https://api.sleeper.app/v1/league/${router?.query?.league}`
			: null,
		fetcher
	)

	const {data: leagueUsers, error: leagueUsersError} = useSWR(
		router?.query?.league != undefined
			? `https://api.sleeper.app/v1/league/${router?.query?.league}/users`
			: null,
		fetcher
	)

	const {data: pickData, error: pickDataError} = useSWR(
		unique_drafts?.drafts != undefined && unique_drafts?.drafts?.map((draftSettings: DraftSettings) => {return `https://api.sleeper.app/v1/draft/${draftSettings.draft_id}/picks`}),
		multiFetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false
		  }
	)

	return (
		<div>

		<DraftSniperLeaguePage drafts={unique_drafts?.drafts} picks={pickData} league={leagueData} leagueMembers={leagueUsers}/>

		</div>
		
	)
}

export default DraftSniperPage
