import { Box, HStack } from "@chakra-ui/react"
import { Avatar } from "rsuite"
import { Cell } from "rsuite-table"

const PlayerImageCell = ({
    rowData,
    dataKey,
    ...props
}: {
    rowData: any
    dataKey: any
}) => {
    const srcString = rowData[dataKey]
    return (
        <Cell {...props}>
            <HStack>
                <Avatar
                    alt={rowData['metadata']['first_name']}
                    src={
                        /\d/.test(srcString)
                            ? `https://sleepercdn.com/content/nfl/players/${srcString}.jpg`
                            : `https://sleepercdn.com/images/team_logos/nfl/${srcString.toLowerCase()}.png`
                    }
                    size='sm'
                    circle
                    style={{background: 'none', minWidth: 30, height: 30}}
                />
                <Box
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    display={'block'}
                    overflow={'hidden'}
                    fontSize={"xs"}
                >
                    {`${rowData.metadata.first_name} ${rowData.metadata.last_name}`}
                </Box>
            </HStack>
        </Cell>
    )
}

export default PlayerImageCell