import {
  useColorMode,
  Heading,
  Text,
  Flex,
  List,
  ListItem,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Link,
} from "@chakra-ui/react";
import { secondaryTextColor } from "./darkMode";
const TIMELINE_ITEMS = [
  {
    items: [
      {
        time: () => "May 2020 - Present",
        title: () => "Computational Research Intern",
        place: () => "UC Berkeley Advanced Bioimaging Center",
        desc: () => (
          <>
            Developing web application to streamline microscope data
            manipulation and preprocessing pipeline.
          </>
        ),
      },
      {
        time: () => "Feb 2020 - Present",
        title: () => "Co-Founder",
        place: () => "Equinox AI",
        desc: () =>
          "Creating {''} <Link>no-code machine learning solutions</Link> to enhance data analytics.",
      },
    ],
  },
];

const YearItems = ({ items }) => {
  const { colorMode } = useColorMode();
  return (
    <div>
      {items.map(({ time, title, place, desc }) => (
        <Box>
          <Box flex="1" textAlign="left">
            <Text fontWeight="bold" fontSize="lg">
              {time()}
            </Text>
          </Box>
          <List>
            <ListItem key={title}>
              <Stack ml={2} mb={4}>
                <Flex align="center">
                  <Text fontWeight="medium" letterSpacing="wide">
                    {title()}
                  </Text>
                  <Text fontWeight="medium" letterSpacing="wide">
                    {place()}
                  </Text>
                </Flex>
                <Text color={secondaryTextColor[colorMode]} ml={6}>
                  {desc()}
                </Text>
              </Stack>
            </ListItem>
          </List>
        </Box>
      ))}
    </div>
  );
};

const Experience = () => {
  // const [employmentOnly, setEmploymentOnly] = useState(false);
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
    </Flex>
  );
};

export default Experience;
