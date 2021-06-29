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
    Link
  } from '@chakra-ui/react';
  import { secondaryTextColor } from './darkMode';  
  const TIMELINE_ITEMS = [
    {
      year: '2021',
      items: [
        {
          title: () => 'Software Development Engineer @ AWS',
          desc: () => (
            <>
              Building{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://aws.amazon.com/connect/contact-lens/"
              >
                Amazon Connect Contact Lens
              </Link>
            </>
          )
        },
        {
          title: () => 'Graduated from the University of Waterloo',
          desc: () =>
            `Awarded a Bachelor of Applied Science, Computer Engineering, Honours, Co-op, With Distinction`
        }
      ]
    },
    {
      year: '2020',
      items: [
        {
          title: () => 'Software Development Engineer Intern @ AWS',
          desc: () => (
            <>
              Designed scalable and fault-tolerant backend monitoring system using
              Node.js and TypeScript for{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://aws.amazon.com/connect/contact-lens/"
              >
                Amazon Connect Contact Lens
              </Link>
            </>
          )
        }
      ]
    },
    {
      year: '2019',
      items: [
        {
          title: () => (
            <>
              Software Tools and Automation Intern @{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://www.canoo.com/"
              >
                Canoo
              </Link>
            </>
          ),
          desc: () =>
            'Increased productivity by creating software release management tool with React, TypeScript, Python, and Flask to monitor and control builds for 10+ vehicle components'
        },
        {
          title: () => (
            <>
              Organizer @{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://hackthenorth.com/"
              >
                Hack the North
              </Link>
            </>
          ),
          desc: () =>
            'Created delightful web experiences with React, Typescript, and Styled Components for one of the world’s largest hackathons, with more than 30k unique visitors and 3M requests per month'
        },
        {
          title: () => (
            <>
              Software Engineering Intern @{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://www.stackadapt.com/"
              >
                StackAdapt
              </Link>
            </>
          ),
          desc: () =>
            'Implemented customization and productivity features on a web platform that manages 3000+ ad campaigns with Ruby on Rails, React, and Redux'
        }
      ]
    },
    {
      year: '2018',
      items: [
        {
          title: () => (
            <>
              Software Developer Intern @{' '}
              <Link
                target="_blank"
                rel="​noopener noreferrer"
                href="https://monogramcc.com/"
              >
                Monogram
              </Link>
            </>
          ),
          desc: () =>
            'Optimized performance and size for Qt application in C++ and photo-editing software plugins'
        }
      ]
    }
  ];
  
  const YearItems = ({ year, items }) => {
    const { colorMode } = useColorMode();
    return (
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Heading as="h3" size="lg" fontWeight="bold">
              {year}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List>
            {items.map(({ title, desc }) => (
              <ListItem key={title}>
                <Stack ml={2} mb={4}>
                  <Flex align="center">
                    <Text fontWeight="medium" letterSpacing="wide">
                      {title()}
                    </Text>
                  </Flex>
                  <Text color={secondaryTextColor[colorMode]} ml={6}>
                    {desc()}
                  </Text>
                </Stack>
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
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
        <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
          {TIMELINE_ITEMS.map(({ year, items }) => (
            <YearItems key={year} year={year} items={items} />
          ))}
        </Accordion>
      </Flex>
    );
  };
  
  export default Experience;