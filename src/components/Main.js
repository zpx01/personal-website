import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Fade,
  Box,
} from "@chakra-ui/react";
import Typing from "react-typing-animation";
import styled from "@emotion/styled";
import { PageWrapper } from "./PageWrapper";
import { secondaryTextColor } from "./darkMode";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
import Education from "./Education";
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
const EduSection = styled(Flex)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 11rem;
  padding-bottom: 25rem;
  // max-width: 75rem;
`;

const SectionHeading = ({ children }) => (
  <Heading mb={4} size="2xl" fontWeight={700}>
    {children}
  </Heading>
);

export const Main = () => {
  const { colorMode } = useColorMode();

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
              <Typing startDelay={200}>
                <Heading mb={6} as="h1" size="3xl">
                  Hi, I'm Zeeshan Patel
                </Heading>
              </Typing>
            </Fade>
          </Section>
          <div id="about" />
          <Section>
            <Fade in>
              <SectionHeading>👨‍💻 About Me</SectionHeading>
              <Text color={secondaryTextColor[colorMode]}>
                I'm a freshman at UC Berkeley studying Computer Science and
                Statistics. Currently, I am working at the UC Berkeley Advanced
                Bioimaging Center as a computational research intern. I'm interested
                in the intersection between artificial intelligence, finance, and 
                entrepreneurship.
              </Text>
            </Fade>
          </Section>
          <div id="projects"></div>
          <ProjectSection>
            <Fade in>
              <SectionHeading>📱 Projects</SectionHeading>
              <Projects />
            </Fade>
          </ProjectSection>
          <div id="experience"></div>
          <ProjectSection>
            <Fade in>
              <SectionHeading>💻 Experience</SectionHeading>
              <Experience />
            </Fade>
          </ProjectSection>
          <div id="education"></div>
          <EduSection>
            <Fade in>
              <SectionHeading>📚 Education</SectionHeading>
              <Education />
            </Fade>
          </EduSection>
          <div id="contact"></div>
          <Section>
            <Fade in>
              <SectionHeading>
                <span class="wave">👋</span>  Contact
              </SectionHeading>
              <br />
              <Contact />
            </Fade>
          </Section>
        </Stack>
      </PageWrapper>
    </>
  );
};
