import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Box, Container, Divider, SimpleGrid } from "@chakra-ui/react";
import DraftTableGroup from "../../../components/DraftTableGroup";
import Navbar from "../../../components/Navbar";
import LeaguesSection from "../../../components/LeaguesSection";
import { LeagueSettings } from "../../../sleeper/LeagueSettings";

const Overview = () => {
  const router = useRouter();
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: userData, error: userError } = useSWR(
    "https://api.sleeper.app/v1/user/" + router.query.username,
    fetcher
  );

  const { data: leaguesData, error: leaguesError } = useSWR(
    () =>
      userData.user_id
        ? "https://api.sleeper.app/v1/user/" +
          userData.user_id +
          "/leagues/nfl/2022"
        : null,
    fetcher
  );
  if (userError) return <div>Failed to load</div>;
  if (!userData || !leaguesData) return <div>Loading...</div>;
  console.log(userData);
  return (
    <Box bg={"brand.background"} w={"100%"}>
      <Navbar></Navbar>
      <Box>
        <Box as="h1" color={"brand.on_background"}>
          {router.query.username}
        </Box>
        <Box as="h2" color={"brand.on_background"}>
          {userData.user_id}
        </Box>

        <Container maxW={"container.xl"}>
            <LeaguesSection
              filteredLeagueStates={["pre_draft"]}
              leagues={leaguesData}
              title="Completed Drafts"
            />
            
            <Box mt={3} mb={3}></Box>
            <LeaguesSection
            title="Pre Draft"
              filteredLeagueStates={["in_season", "drafting"]}
              leagues={leaguesData}
            />

          <DraftTableGroup
            leagues={leaguesData.filter((league: LeagueSettings) => {
              return league.status != "pre_draft";
            })}
            user_id={userData.user_id}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default Overview;
