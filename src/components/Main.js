import { useState, useEffect } from "react";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Fade,
  Button,
  Center,
  IconButton
} from "@chakra-ui/react";
import { DownButton } from "./CustomIcons";
import styled from "@emotion/styled";
import { PageWrapper } from "./PageWrapper";
import { secondaryTextColor } from "./darkMode";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { Link } from "react-scroll";
import Typist from "react-typist";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import "./animate.css";

const Section = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 15rem;
  padding-bottom: 20rem;
  // max-width: 75rem;
`;

const HomeSection = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 11rem;
  padding-bottom: 20rem;
  // max-width: 75rem;
`;

const ProjectSection = styled(Flex)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 11rem;
  padding-bottom: 20rem;
  // max-width: 75rem;
`;

const SectionHeading = ({ children }) => (
  <Heading mb={4} size="2xl" fontWeight={700}>
    {children}
  </Heading>
);

export const Main = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <>
      <PageWrapper>
        <Stack
          as="main"
          justifyContent="center"
          alignItems="center"
          maxWidth="800px"
        >
          <div id="home"></div>
          <HomeSection>
            <Fade in>
              <Center>
                <Heading mb={4} as="h1" size="2xl">
                  Hi, I'm
                </Heading>
              </Center>
              <br />
              <Center>
                <Heading mb={4} as="h1" size="2xl">
                  Zeeshan Patel
                </Heading>
              </Center>
              <br />
              <Center>
                <Text
                  as="mark"
                  fontSize="lg"
                  fontWeight="bold"
                  bgGradient="linear(to-r, blue.200, blue.100)"
                >
                  {count ? (
                    <Typist
                      avgTypingDelay={50}
                      onTypingDone={() => setCount(0)}
                    >
                      <span>Computer Science Student</span>
                      <Typist.Backspace count={24} delay={1500} />
                      <span>Entrepreneur</span>
                      <Typist.Backspace count={12} delay={1500} />
                      <span>AI Researcher</span>
                      <Typist.Backspace count={13} delay={1500} />
                    </Typist>
                  ) : (
                    ""
                  )}
                </Text>
              </Center>
              <br />
              <br />
                <Center>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link to="about" spy={true} smooth={true}>
                      <Button>Learn More</Button>
                    </Link>
                  </motion.button>
                </Center>
                <br />
                <Center>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      aria-label="toggle dark mode"
                      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                      onClick={toggleColorMode}
                      isRound={true}
                    />
                  </motion.button>
                </Center>
            </Fade>
          </HomeSection>
          <div id="about" />
          <Section>
            <Fade in>
              <SectionHeading>👨‍💻 About Me</SectionHeading>
              <hr />
              <br />
              <Text color={secondaryTextColor[colorMode]}>
                I'm a freshman at UC Berkeley studying Computer Science and
                Statistics. Currently, I am working at the UC Berkeley Advanced
                Bioimaging Center as a computational research intern. I'm
                specifically interested in the intersection between artificial
                intelligence, finance, and entrepreneurship.
              </Text>
              <Center>
                <Link to="projects" spy={true} smooth={true}>
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DownButton />
                  </motion.button>
                </Link>
              </Center>
            </Fade>
          </Section>
          <div id="projects"></div>
          <ProjectSection>
            <Fade in>
              <SectionHeading>📱 Projects</SectionHeading>
              <hr />
              <br />
              <Projects />
              <Center>
                <Link to="experience" spy={true} smooth={true}>
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DownButton />
                  </motion.button>
                </Link>
              </Center>
            </Fade>
          </ProjectSection>
          <div id="experience"></div>
          <ProjectSection>
            <Fade in>
              <SectionHeading>💻 Experience</SectionHeading>
              <hr />
              <br />
              <Experience />
              <Center>
                <Link to="contact" spy={true} smooth={true}>
                  <br />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DownButton />
                  </motion.button>
                </Link>
              </Center>
            </Fade>
          </ProjectSection>
          <div id="contact"></div>
          <Section>
            <Fade in>
              <SectionHeading>
                <span class="wave">👋</span> Contact
              </SectionHeading>
              <br />
              <Contact />
              <br />
              <br />
            </Fade>
          </Section>
        </Stack>
      </PageWrapper>
    </>
  );
};
