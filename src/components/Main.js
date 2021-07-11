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
} from "@chakra-ui/react";
import { DownButton } from "./CustomIcons";
import styled from "@emotion/styled";
import { PageWrapper } from "./PageWrapper";
import { secondaryTextColor } from "./darkMode";
import { bgColor } from "./darkMode";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import { Link } from "react-scroll";
import Typist from "react-typist";
import "./animate.css";
const Section = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 20rem;
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
  const { colorMode } = useColorMode(bgColor.dark);

  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <>
      <div id="home">
        <></>
      </div>
      <PageWrapper>
        <Stack
          as="main"
          justifyContent="center"
          alignItems="center"
          maxWidth="800px"
        >
          <Section>
            <Fade in>
              <Center>
                <Heading mb={4} as="h1" size="2xl">
                  Hi, I'm
                </Heading>
              </Center>
              <Center>
                <Heading mb={4} as="h1" size="2xl">
                  Zeeshan Patel
                </Heading>
              </Center>
              <br />
              <Center>
                <Text fontSize="lg" fontWeight="bold">I'm a &nbsp;</Text>
                <Text as="mark" fontSize="lg" fontWeight="bold" bgGradient="linear(to-r, blue.200, blue.100)">
                  {count ? (
                    <Typist
                      avgTypingDelay={50}
                      onTypingDone={() => setCount(0)}
                    >
                      <span>Computer Science Student</span>
                      <Typist.Backspace count={24} delay={1500} />
                      <span>Software Engineer</span>
                      <Typist.Backspace count={17} delay={1500} />
                      <span>AI Researcher</span>
                      <Typist.Backspace count={13} delay={1500} />
                    </Typist>
                  ) : (
                    ""
                  )}
                </Text>
              </Center>
              <Center>
                <Link to="about" spy={true} smooth={true}>
                  <br />
                  <Button>Learn More</Button>
                </Link>
              </Center>
            </Fade>
          </Section>
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
                  <DownButton />
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
                  <DownButton />
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
                  <DownButton />
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
