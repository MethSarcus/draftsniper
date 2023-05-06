import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import React, {useState, useRef} from 'react'
import {Box, Center, Container, Heading, Input, Text, VStack} from '@chakra-ui/react'
import {Button} from '@chakra-ui/react'
import Image from 'next/image'
import bg from '../public/images/glitchedbg.png'
import Card from '../components/Card'
import UsernameForm from '../components/UsernameFrom'
import {TfiTarget} from 'react-icons/tfi'
import {GiAmericanFootballBall, GiTargeting} from 'react-icons/gi'

const Home: NextPage = () => {
	const [text, setText] = useState('')
	const router = useRouter()

	return (
		<div className={styles.container}>
			<Head>
				<title>Draft Sniper</title>
				<meta name='An app for sniping those picks' content='Sneak a peep at your leaguemates draft boards' />
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicons/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicons/favicon-16x16.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicons/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='100x100'
					href='/favicons/favicon-100x100.png'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='192x192'
					href='/favicons/favicon-192x192.png'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='512x512'
					href='/favicons/favicon-512x512.png'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<div className='App'>
					<header className='App-header'>
						<h1>Draft Sniper</h1>
					</header>
					<Image
						className='bgImage'
						src={bg}
						fill={true}
						z-index={0}
						alt='Picture of draftboard'
						placeholder='blur' // Optional blur-up while loading
					/>
					<div className='formContainer'>
						<Box
							bg={'surface.6'}
							display={'flex'}
							opacity={1}
							alignItems={'center'}
							boxShadow={5}
							justifyContent={'center'}
							flexDirection={'row'}
							p={5}
              m={5}
							overflow='hidden'
							borderRadius={10}
							style={{visibility: 'visible', opacity: '0.99', transition: '2s ease-in-out'}}>
							<VStack align='stretch'>
								<Center>
									<Box>
										<Box mb={"-30px"} ml={"10px"} color={"red"}>
											<GiTargeting size={40} />
										</Box>
										<Box mt={-5} opacity={.5}>
											<GiAmericanFootballBall size={40} />
										</Box>
									</Box>

									<Heading
										display='flex'
										flexDirection='row'
										justifyContent='center'
										verticalAlign={'middle'}
										alignItems='center'
										size='2xl'
										color='#FFFFFF'>
										Draft Sniper
									</Heading>
								</Center>

								<UsernameForm />
							</VStack>
						</Box>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Home
