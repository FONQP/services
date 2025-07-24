export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const services = [
  {
    title: "Latex Server",
    description:
      "Internal Latex Server",
    auth: "internal",
    // link to current page/latex
    link: "/services/latex",
    logo: "/latex-logo.png",
    bkg: "MetaMizer-bkg.png",
  },
  {
    title: "MetaMizer",
    description:
      "Design Metamaterials",
    auth: "all",
    link: "/services/metamizer",
    logo: "/MetaMizer-logo.png",
    bkg: "MetaMizer-bkg.png",
  },
  {
    title: "Datasets",
    description:
      "Optical Datasets",
    auth: "all",
    link: "/services/datasets",
    logo: "/datasets-logo.png",
    bkg: "MetaMizer-bkg.png",
  },
  {
    title: "Random Number Generator",
    description:
      "Access TRNGs",
    auth: "all",
    link: "/services/rng",
    logo: "/rng-logo.png",
    bkg: "MetaMizer-bkg.png",
  },
];