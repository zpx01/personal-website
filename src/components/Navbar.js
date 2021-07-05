import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { navBgColor } from "./darkMode";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const NavContainer = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode(navBgColor.dark);
  const bg = useColorModeValue(navBgColor.light, navBgColor.dark);
  const mobileNav = useDisclosure();

  return (
    <NavContainer
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="100%"
      width="100%"
      as="nav"
      mx="auto"
    >
      <React.Fragment>
        <chakra.header
          bg={bg}
          w="full"
          px={{ base: 2, sm: 4 }}
          py={4}
          shadow="md"
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <chakra.h1 fontSize="2xl" fontWeight="extrabold" ml="2">
              Zeeshan Patel
            </chakra.h1>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack
                spacing={1}
                mr={1}
                color="brand.500"
                display={{ base: "none", md: "inline-flex" }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="home" spy={true} smooth={true}>
                    <Button variant="ghost">Home</Button>
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="about" spy={true} smooth={true}>
                    <Button variant="ghost">About</Button>
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="projects" spy={true} smooth={true}>
                    <Button variant="ghost">Projects</Button>
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="experience" spy={true} smooth={true}>
                    <Button variant="ghost">Experience</Button>
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="contact" spy={true} smooth={true}>
                    <Button variant="ghost">Contact</Button>
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    aria-label="toggle dark mode"
                    icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    isRound={true}
                  />
                </motion.button>
              </HStack>
              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open Menu"
                  fontSize="20px"
                  color={useColorModeValue("gray.800", "inherit")}
                  variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={mobileNav.onOpen}
                  isRound={true}
                />

                <VStack
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  display={mobileNav.isOpen ? "flex" : "none"}
                  flexDirection="column"
                  p={2}
                  pb={4}
                  m={2}
                  bg={bg}
                  spacing={3}
                  rounded="sm"
                  shadow="sm"
                >
                  <CloseButton
                    aria-label="Close menu"
                    onClick={mobileNav.onClose}
                  />
                  <Button w="full" variant="ghost">
                    Home
                  </Button>
                  <Button w="full" variant="ghost">
                    About
                  </Button>
                  <Button w="full" variant="ghost">
                    Projects
                  </Button>
                  <Button w="full" variant="ghost">
                    Experience
                  </Button>
                  <Button w="full" variant="ghost">
                    Contact
                  </Button>
                  <IconButton
                    aria-label="toggle dark mode"
                    icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                    onClick={toggleColorMode}
                    isRound={true}
                  />
                </VStack>
              </Box>
            </HStack>
          </Flex>
        </chakra.header>
      </React.Fragment>
    </NavContainer>
  );
}
