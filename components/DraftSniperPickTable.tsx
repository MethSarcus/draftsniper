import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react"
import { DraftPick } from "../sleeper/DraftPick"


interface MyProps {
    picks: DraftPick[]
}

const DraftSniperPickTable = (props: MyProps) => {
  console.debug(props.picks)
    return (
        <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th isNumeric>Pick</Th>
              <Th>Player</Th>
            </Tr>
          </Thead>
          <Tbody>
          {props.picks.map((pick: DraftPick) => {
              return <Tr key={pick.player_id}>
                    <Td isNumeric>{pick.pick_no}</Td>
                    <Td>{pick.metadata.first_name} {pick.metadata.last_name}</Td>
              </Tr>})}
          </Tbody>
          <Tfoot/>
        </Table>
      </TableContainer>
    )
}

export default DraftSniperPickTable