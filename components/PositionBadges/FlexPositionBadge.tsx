import { SimpleGrid, Box, Center } from "@chakra-ui/react"

const SuperFlexBadge = () => {
    return (<SimpleGrid width="40px" height="30px" columns={2} spacingX='1px' spacingY='1px'>
    <Center fontSize={".6em"} bg='position.WR'>W</Center>
    <Center fontSize={".6em"} bg='position.RB'>R</Center>
    <Center fontSize={".6em"} bg='position.TE'>T</Center>
    <Center fontSize={".6em"} bg='position.QB'>Q</Center>
  </SimpleGrid>)
}

export default SuperFlexBadge