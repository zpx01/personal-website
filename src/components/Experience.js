import {
  useColorMode,
  Text,
  Flex,
  List,
  ListItem,
  Stack,
  Box,
  Link,
  UnorderedList,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { secondaryTextColor, borderColor } from "./darkMode";

const TIMELINE_ITEMS = [
  {
    items: [
      {
        time: () => "May 2020 - Present",
        title: () => "Computational Research Intern",
        place: () => (
          <Text as="u">
            <Link href="https://abc.berkeley.edu" isExternal>
              UC Berkeley Advanced Bioimaging Center
            </Link>
          </Text>
        ),
        desc: () => (
          <>
            <UnorderedList>
              <Stack mb={2}>
                <ListItem>
                  Created novel deep learning tool for 3D live-cell membrane
                  detection and segmentation in bioimages obtained using
                  Adaptive Optics Lattice Light Sheet Microscopes (AO-LLSM).
                </ListItem>
                <ListItem>
                  Developing GUI to streamline microscope data manipulation and
                  preprocessing pipeline.
                </ListItem>
                <ListItem>
                  Researching on feature segmentation in bioimages to detect and
                  identify various cell organelles and structures.
                </ListItem>
              </Stack>
            </UnorderedList>
          </>
        ),
      },
      {
        time: () => "Feb 2020 - May 2020",
        title: () => "Software Engineering Intern",
        place: () => "Equinox AI",
        desc: () => (
          <>
            <UnorderedList>
              <Stack mb={2}>
                <ListItem>
                  Developed no-code machine learning solutions to enhance data
                  analytics.
                </ListItem>
                <ListItem>
                  Engineered custom web applications for clients to optimize
                  predictive analysis workflow.
                </ListItem>
              </Stack>
            </UnorderedList>
          </>
        ),
      },
      {
        time: () => "Feb 2018 - Present",
        title: () => "Founder and CEO",
        place: () => (
          <Text as="u">
            <Link href="https://codingcosines.org" isExternal>
              Coding Cosines
            </Link>
          </Text>
        ),
        desc: () => (
          <>
            <UnorderedList>
              <Stack mb={2}>
                <ListItem>
                  Co-founded 501(c)(3) non-profit providing advanced STEM
                  education to disadvantaged students in the United States,
                  Canada, India, Pakistan, and Sri Lanka.
                </ListItem>
                <ListItem>
                  Taught programming and advanced mathematics 600+ students in
                  three years.
                </ListItem>
              </Stack>
            </UnorderedList>
          </>
        ),
      },
      {
        time: () => "June 2020 - Present",
        title: () => "VP of Operations",
        place: () => (
          <Text as="u">
            <Link href="https://ihs-deca.org" isExternal>
              Irvington DECA
            </Link>
          </Text>
        ),
        desc: () => (
          <>
            <UnorderedList>
              <Stack mb={2}>
                <ListItem>
                  Handled logistics of most successful DECA business club in
                  California with 300+ members.
                </ListItem>
                <ListItem>
                  Managed operations and chapter development team.
                </ListItem>
              </Stack>
            </UnorderedList>
          </>
        ),
      },
      {
        time: () => "May 2019 - Aug 2019",
        title: () => "Software Engineer Intern",
        place: () => <Text>Micronest Technologies</Text>,
        desc: () => (
          <>
            <UnorderedList>
              <Stack mb={2}>
                <ListItem>
                  Created real estate data analysis dashboard using Python
                  Flask, Plotly, and React.
                </ListItem>
                <ListItem>
                  Integrated LSTM recurrent neural network for time series
                  forecasting of real estate prices.
                </ListItem>
              </Stack>
            </UnorderedList>
          </>
        ),
      },
    ],
  },
];

const YearItems = ({ items }) => {
  const { colorMode } = useColorMode();
  return (
    <div>
      <br />
      {items.map(({ time, title, place, desc }) => (
        <motion.div
          whileHover={{ y: -2, opacity: 0.7 }}
          transition={{ duration: 0.1 }}
        >
          <Flex
            border="1px solid"
            borderColor={borderColor[colorMode]}
            borderRadius={4}
            py={8}
            px={4}
          >
            <Box flex="1" textAlign="left">
              <Text fontWeight="bold" fontSize="xl">
                {title()}
              </Text>
              <List>
                <ListItem key={title}>
                  <Stack mb={5}>
                    <Text fontWeight="medium" letterSpacing="wide">
                      {place()}
                    </Text>
                    <Text fontWeight="medium" letterSpacing="wide">
                      {time()}
                    </Text>
                    <Text color={secondaryTextColor[colorMode]} ml={6}>
                      {desc()}
                    </Text>
                  </Stack>
                </ListItem>
              </List>
            </Box>
          </Flex>
          <br />
        </motion.div>
      ))}
    </div>
  );
};

const Experience = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="700px"
    >
      {TIMELINE_ITEMS.map(({ items }) => (
        <YearItems items={items} />
      ))}
      <br />
      <motion.div
        whileHover={{ y: -2, opacity: 0.7 }}
        transition={{ duration: 0.1 }}
      >
        <Flex
          border="1px solid"
          borderColor={borderColor[colorMode]}
          borderRadius={4}
          py={8}
          px={4}
        >
          <UnorderedList>
            <Text fontWeight="bold" fontSize="2xl">
              🏆 Awards & Honors
              <hr />
            </Text>
            <br />
            <Stack ml={2} mb={2} mt={2}>
              <ListItem>
                <Text color={secondaryTextColor[colorMode]}>
                  USA Computing Olympiad – Gold
                </Text>
              </ListItem>
              <ListItem>
                <Text color={secondaryTextColor[colorMode]}>
                  American Invitational Mathematics Examination Qualifier – Top
                  5% on AMC 12
                </Text>
              </ListItem>
              <ListItem>
                <Text color={secondaryTextColor[colorMode]}>
                  DECA Internationals Qualifier
                  <UnorderedList>
                    <Stack ml={2} mb={2} mt={2}>
                      <ListItem>
                        <Text color={secondaryTextColor[colorMode]}>
                          CA DECA State Champion – International Business Plan
                          (IBP), 1st Place, ICDC 2020 Qualifier
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text color={secondaryTextColor[colorMode]}>
                          NorCal DECA Champion 2021 - Business Finance Series,
                          1st Place
                        </Text>
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </Text>
              </ListItem>
              <ListItem>
                <Text color={secondaryTextColor[colorMode]}>
                  The President’s Volunteer Service Award, Gold (3x)
                </Text>
              </ListItem>
              <ListItem>
                <Text color={secondaryTextColor[colorMode]}>
                  Varsity Parliamentary Debate - Nationally Ranked
                </Text>
              </ListItem>
            </Stack>
          </UnorderedList>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default Experience;
