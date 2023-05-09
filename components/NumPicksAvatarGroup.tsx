import { Avatar, AvatarGroup, Badge, Popover, Whisper } from "rsuite"
import { SleeperUser } from "../sleeper/SleeperUser"

interface MyProps {
    drafted_by_ids: Map<string, number>
    memberData: Map<string, SleeperUser> | undefined
}
const NumPicksAvatarGroup = (props: MyProps) => {

    return (				<AvatarGroup>
        {Array.from(props.drafted_by_ids.keys()).sort((a: string, b: string) => {
            return (props.drafted_by_ids.get(b) ?? 0) - (props.drafted_by_ids.get(a) ?? 0)
        }).map((member_id) => {
            const speaker = (
                <Popover title={`${props.memberData?.get(member_id)?.display_name}`} />
            )
            return (
                <Whisper key={member_id} placement='top' speaker={speaker}>
                    <Badge content={props.drafted_by_ids.get(member_id)}>
                        <Avatar
                            src={`https://sleepercdn.com/avatars/thumbs/${
                                props.memberData?.get(member_id)?.avatar ??
                                '8eb8f8bf999945d523f2c4033f70473e'
                            }`}
                            size='sm'
                        />
                    </Badge>
                </Whisper>
            )
        })}
    </AvatarGroup>)
}

export default NumPicksAvatarGroup