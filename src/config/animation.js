export const authFromVariants = {
  hidden: { x: "100vw" },
  enter: {
    x: 0,
    transition: {
      duration: 0.7
    }
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.5,
    },
  },
};

export const authLayoutVariants = {
  hidden: { y: -500 },
  enter: {
    y: 0,
  },
};
