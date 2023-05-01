import {
    Card, Checkbox, HStack, Image, Skeleton,
    SkeletonText, Spacer, Text, VStack
} from '@chakra-ui/react'
import { useState } from 'react'

type MyProps = {
	name: string
	avatar: string
	member_id: string
	teamName: string
	onClick: () => void
}

const DraftSniperMemberToggleCard = (props: MyProps) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	return (
		<Card
			boxShadow={'lg'}
			rounded={'md'}
			bg='surface.0'
			textColor={'white'}
			height={'max-content'}
			textAlign={'start'}
            minW={'200px'}
			maxW={'200px'}
		>
			<HStack gap='1' mr={3}>
				<Skeleton isLoaded={imageLoaded} fadeDuration={4}>
					<Image
						objectFit='cover'
						maxW={'50px'}
						loading={'eager'}
						placeholder={'blur'}
						onLoad={() => setImageLoaded(true)}
						minH={'50px'}
						src={`https://sleepercdn.com/avatars/thumbs/${props.avatar}`}
						alt='Team Image'
					/>
				</Skeleton>
				<VStack spacing={0} alignItems={'left'}>
					<SkeletonText noOfLines={2} isLoaded={imageLoaded}>
						<Text maxWidth={['100px']} noOfLines={1} fontSize={"sm"} marginBottom={0}>
							{props?.name}
						</Text>
						<Text marginTop={0} maxWidth={['100px']} noOfLines={1} fontSize={"xs"} fontWeight={"medium"}>
							{props?.teamName}
						</Text>
					</SkeletonText>
				</VStack>
				<Checkbox size={'md'} colorScheme={'primary'} id={props.member_id} defaultChecked value={props.member_id} onChange={props.onClick} />
			</HStack>
		</Card>
	)
}

export default DraftSniperMemberToggleCard
