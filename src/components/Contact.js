import {
  Link,
  IconButton,
  Text,
  useColorMode,
  Flex,
  Center,
} from "@chakra-ui/react";
import { GithubIcon, LinkedInIcon, MailIcon, MediumIcon } from "./CustomIcons";

const SOCIAL_LINKS = [
  {
    aria: "Github",
    icon: GithubIcon,
    href: "https://github.com/zpx01",
    title: "Github",
  },
  {
    aria: "LinkedIn",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/zeeshan-patel/",
    title: "LinkedIn",
  },
  {
    aria: "Medium",
    icon: MediumIcon,
    href: "https://zpx01.medium.com/",
    title: "Medium",
  },
  {
    aria: "email",
    icon: MailIcon,
    href: "mailto:zeeshanp@berkeley.edu",
    title: "email",
  },
];
const getIcon = ({ aria, icon, href, title }) => (
  <Link key={title} href={href} title={title} isExternal>
    <IconButton
      aria-label={aria}
      icon={icon()}
      size="lg"
      color="gray.500"
      variant="ghost"
      isRound
    />
  </Link>
);
const Contact = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        maxWidth="700px"
      >
        <Center>
            {SOCIAL_LINKS.map(getIcon)}
        </Center>
      </Flex>
    </>
  );
};

export default Contact;
