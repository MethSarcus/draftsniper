import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import DraftPickCard from "../../../../components/DraftPickCard";
import { DraftPick } from "../../../../interfaces/sleeper_api/DraftPick";
import { Grid, GridItem } from "@chakra-ui/react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const DraftBoard = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    "https://api.sleeper.app/v1/draft/" + router.query.draft + "/picks",
    fetcher
  );
  const draftPick = {
    round: 1,
    roster_id: 4,
    player_id: "8155",
    picked_by: "376111571866267648",
    pick_no: 1,
    metadata: {
      years_exp: "0",
      team: "NYJ",
      status: "Active",
      sport: "nfl",
      position: "RB",
      player_id: "8155",
      number: "0",
      news_updated: "1651275628504",
      last_name: "Hall",
      injury_status: "",
      first_name: "Breece",
    },
    is_keeper: null,
    draft_slot: 1,
    draft_id: "784515345380663297",
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h1>DraftBoard: {router.query.draft}</h1>
      <div>
        <Grid
          h="200px"
          templateColumns="repeat(12, 1fr)"
          gap={1}
        >{data.map((pick: DraftPick) => {
            return <GridItem key={pick.draft_id + '_' + pick.player_id} colSpan={1} ><DraftPickCard pick={pick}></DraftPickCard></GridItem>;
          })}
        </Grid>
        
      </div>
    </div>
  );
};

export default DraftBoard;
