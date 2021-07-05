import { Text, Center, Link, useColorMode } from "@chakra-ui/react";
import { secondaryTextColor } from "./darkMode";
export const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <footer>
        {/* <Center>
          <Link href="/resume.pdf">
            <Text color={secondaryTextColor[colorMode]}>> resume</Text>
          </Link>
        </Center> */}
      </footer>
      <br />
      <br />
      <br />
    </>
  );
};
