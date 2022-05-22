import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react";
import React from "react";
import { DraftPick } from "../interfaces/sleeper_api/DraftPick";
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings";

type MyProps = { picks: DraftPick[] };
export default class PositionDraftTable extends React.Component<MyProps> {
    constructor(props: MyProps) {
        super(props);
    }
    
    render() {
        return (
            <TableContainer>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th isNumeric>Pos Drafted</Th>
                          <Th>Player</Th>
                          <Th isNumeric>Times Drafted</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                      {this.props.picks.map((pick) => {
                          return <Tr key={pick.player_id}>
                                <Td isNumeric>{pick.pick_no}</Td>
                                <Td>{pick.metadata.first_name} {pick.metadata.last_name}</Td>
                                <Td isNumeric>4</Td>
                          </Tr>})}
                      </Tbody>
                    </Table>
                  </TableContainer>
        )
    }
}