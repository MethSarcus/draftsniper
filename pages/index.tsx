import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { Box, Container, Heading, Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import bg from "../public/images/glitchedbg.png";
import Card from "../components/Card";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    router.push({
      pathname: `/user/${text}/overview`,
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Draft Sniper</title>
        <meta
          name="An app for sniping those picks"
          content="Sneak a peep at your leaguemates draft boards"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="App">
          <header className="App-header">
            <h1>Draft Sniper</h1>
          </header>
          <Image
            className="bgImage"
            src={bg}
            fill={true}
            z-index={0}
            alt="Picture of draftboard"
            placeholder="blur" // Optional blur-up while loading
          />
          <div className="formContainer">
            <Box
              display="inline-block"
              bg={"surface.1"}
              opacity={1}
              boxShadow={5}
              p={10}
              overflow="hidden"
              borderRadius={10}
            >
              <Heading
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                size="2xl"
                color="#FFFFFF"
                pb={30}
              >
                Draft Sniper
              </Heading>
              <form onSubmit={onFormSubmit}>
                <Input
                  variant="outline"
                  placeholder="Username"
                  size="lg"
                  display="inline-block"
                  mt={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  variant="solid"
                  size="md"
                  type="submit"
                  backgroundColor="#6200EE"
                  color="#000000"
                  mt={2}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
