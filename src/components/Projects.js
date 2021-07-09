import { Box, SimpleGrid } from "@chakra-ui/react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import ProjectCard from "./ProjectCard";
import {
  HTNIcon,
  MentalHealth,
  Microscope,
  SpaceShip,
} from "./CustomIcons";

const PROJECTS = [
  {
    title: "DeepEducation",
    description:
      "Web application that uses AI to translate video content to break language barriers in education.",
    href: "https://devpost.com/software/deepeducation-wvj9ef",
    icon: HTNIcon,
    tags: [
      { text: "Python", color: "cyan" },
      { text: "React", color: "red" },
      { text: "OpenAI", color: "blue" },
      { text: "GCP / Firebase", color: "purple" },
    ],
  },
  {
    title: "Flow",
    description:
      "Web application designed to alleviate stress while maximizing productivity.",
    href: "https://devpost.com/software/flow-ms1vbg",
    icon: MentalHealth,
    tags: [
      { text: "Python", color: "cyan" },
      { text: "React", color: "red" },
      { text: "OpenAI", color: "gray" },
      { text: "GCP / Firebase", color: "purple" },
    ],
  },
  {
    title: "Malarial Cell Detector",
    description:
      "A convolutional neural network aimed at classifying infected and uninfected malarial cells.",
    href: "https://github.com/zpx01/auto_nuclear_seg",
    icon: Microscope,
    tags: [
      { text: "Python", color: "cyan" },
      { text: "TensorFlow", color: "blue" },
      { text: "Keras", color: "gray" },
    ],
  },
  {
    title: "Pulsar Classifier",
    description:
      "A machine learning model based on k-Nearest-Neighbor for classifying pulsars using radio emission pattern data.",
    href: "https://github.com/zpx01/pulsar-classifier",
    icon: SpaceShip,
    tags: [
      { text: "Python", color: "cyan" },
      { text: "Scikit-Learn", color: "blue" },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const MotionBox = m(Box);
const MotionGrid = m(SimpleGrid);

const Projects = () => {
  const isBigScreen = useMediaQuery({ minWidth: 450 });

  return (
    <LazyMotion features={domAnimation}>
      <MotionGrid
        variants={container}
        initial="hidden"
        animate="show"
        columns={2}
        minChildWidth="300px"
        spacing="20px"
      >
        {PROJECTS.map((props, i) => (
          <MotionBox key={`project-${i}`} variants={listItem}>
            <ProjectCard {...props} isBigScreen={isBigScreen} />
          </MotionBox>
        ))}
      </MotionGrid>
    </LazyMotion>
  );
};

export default Projects;
