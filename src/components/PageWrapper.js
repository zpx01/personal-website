import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';

export const PageWrapper = ({ children }) => {
  return (
    <>
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
