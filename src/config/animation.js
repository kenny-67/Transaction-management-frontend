export const authFromVariants = {
  hidden: { x: "100vw" },
  enter: {
    x: 0,
    transition: {
      duration: 0.7,
    },
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

export const AdminPageLayoutVariants = {
  hidden: { y: -500 },
  enter: {
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      bounce: 0.6,
    },
  },
};

export const dashboardVariants = {
  hidden: { x: "100vw" },
  enter: {
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.5,
    },
  },
};

export const genericAdminVariants = {
  hidden: { x: "100vw" },
  enter: {
    x: 0,
    transition: {
      duration: 0.7,
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.5,
    },
  },
};

export const adminFooterVariants = {
  hidden: { y: 100 },
  enter: {
    y: 0,
    transition: {
      duration: 2,
    },
  },
};
