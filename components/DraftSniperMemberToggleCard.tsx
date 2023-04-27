'use client'
import {
    Card, Checkbox, HStack, Image, Skeleton,
    SkeletonText, Spacer, Text, VStack
} from '@chakra-ui/react'
import { useState } from 'react'

type MyProps = {
	name: string
	avatar: string
	number_of_drafts: number
	member_id: string
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
				<VStack spacing={0} alignItems={'left'} flex={1}>
					<SkeletonText noOfLines={2} isLoaded={imageLoaded}>
						<Text maxWidth={['120px']} noOfLines={1} fontSize={"sm"}>
							{props?.name}
						</Text>
						<Text maxWidth={['120px']} noOfLines={1} fontSize={"xs"} fontWeight={"medium"}>
							{`${props?.number_of_drafts} Drafts`}
						</Text>
					</SkeletonText>
				</VStack>
				<Checkbox size={'md'} colorScheme={'primary'} defaultChecked onChange={props.onClick} />
			</HStack>
		</Card>
	)
}

export default DraftSniperMemberToggleCard
