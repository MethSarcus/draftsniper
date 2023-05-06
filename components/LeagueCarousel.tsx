import { WrapItem, Wrap } from "@chakra-ui/react";
import React from "react";

import LeagueCard from "./LeagueCard";
import { LeagueSettings } from "../sleeper/LeagueSettings";

type MyProps = { leagues: LeagueSettings[] };
export default class LeagueCarousel extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {
    return (
      <Wrap mt={2}>
        {this.props.leagues.map((league) => {
          return (
            <WrapItem key={league.league_id}>
              <LeagueCard league={league} />
            </WrapItem>
          );
        })}
      </Wrap>
    );
  }
}
