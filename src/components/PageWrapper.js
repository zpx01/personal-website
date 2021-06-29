import { useColorMode, Flex } from '@chakra-ui/react';
import { primaryTextColor, bgColor } from './darkMode';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const PageWrapper = ({ children }) => {
  return (
    <>
    <br />
    <br />
    <br />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        px={8}
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};
