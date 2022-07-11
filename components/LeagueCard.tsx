import {
  Box,
  Button,
  Text,
  Stack,
  Switch,
  StatLabel,
  StatNumber,
  Flex,
  Spacer,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings";
import { getLeagueReceptionScoringType } from "../utility/rosterFunctions";

type MyProps = {
  league: LeagueSettings;
};

const LeagueCard = (props: MyProps) => {
  const router = useRouter();

  function onSub(e: React.SyntheticEvent) {
    e.preventDefault();
    router.push({
      pathname:
        "/user/" + router.query.username + "/draft/" + props.league.draft_id,
    });
  }

  const settingsString = getLeagueReceptionScoringType(props.league);

  return (
    <Stack spacing={1} direction="column" boxShadow={"lg"} p="3" rounded={"md"} bg='brand.surface' textColor={'brand.on_surface'}>
      <Text as="b" fontSize="sm">
        {props.league.name}
      </Text>
      <Stack direction={"row"}>
        <Text fontSize="xs">
          {settingsString.pprString}
        </Text>
        <Spacer />
        <Text fontSize="xs">
          {settingsString.numQbString}
        </Text>
        <Spacer />
        <Text fontSize="xs">
          {settingsString.leagueTypeString}
        </Text>
      </Stack>
      <Stack spacing={1} direction="row">
        <Button onClick={onSub} variant="outline" colorScheme="teal" size="xs">
          View Draft
        </Button>
		<Button onClick={onSub} variant="outline" colorScheme="teal" size="xs">
          League Info
        </Button>
      </Stack>
    </Stack>
  );
};

export default LeagueCard;
