import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Fade,
} from "@chakra-ui/react";
import Typing from "react-typing-animation";
import styled from "@emotion/styled";
import { PageWrapper } from "./PageWrapper";
import { secondaryTextColor } from "./darkMode";
import Projects from "./Projects";
import Experience from "./Experience";
import Contact from "./Contact";
const Section = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 700px;
`;

const SectionHeading = ({ children }) => (
  <Heading mb={4} size="xl" fontWeight={700}>
    {children}
  </Heading>
);

export const Main = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <PageWrapper>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Section>
            <Fade in>
              <Typing startDelay={200}>
                <Heading mb={6} as="h1" size="2xl">
                  Hi, I'm Zeeshan Patel
                </Heading>
              </Typing>
              <Text color={secondaryTextColor[colorMode]}>
                A freshman at UC Berkeley studying Computer Science and
                Statistics currently working at the Advanced Bioimaging Center
                as a computational research intern. I like hiking, debate, and
                traveling.
              </Text>
            </Fade>
          </Section>
          <br />
          <Section>
            <Fade in>
              <SectionHeading>Projects</SectionHeading>
              <Projects />
            </Fade>
          </Section>
          <br />
          <Section>
            <Fade in>
              <SectionHeading>Experience</SectionHeading>
              <Experience />
            </Fade>
          </Section>
          <br />
          <Section>
            <Fade in>
              <SectionHeading>Contact</SectionHeading>
              <Contact />
            </Fade>
          </Section>
        </Stack>
      </PageWrapper>
    </>
  );
};
