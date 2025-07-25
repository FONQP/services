export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const base = import.meta.env.BASE_URL;

export const services = [
  {
    title: "Latex Server",
    description:
      "Internal Latex Server",
    auth: "internal",
    // link to current page/latex
    link: `${base}latex`,
    logo: `${base}latex-logo.png`,
    bkg: `${base}latex-bkg.png`,
  },
  {
    title: "MetaMizer",
    description:
      "Design Metamaterials",
    auth: "all",
    link: `${base}metamizer`,
    logo: `${base}MetaMizer-logo.png`,
    bkg: `${base}MetaMizer-bkg.png`,
  },
  {
    title: "Datasets",
    description:
      "Optical Datasets",
    auth: "all",
    link: `${base}datasets`,
    logo: `${base}datasets-logo.png`,
    bkg: `${base}MetaMizer-bkg.png`,
  },
  {
    title: "Random Number Generator",
    description:
      "Access TRNGs",
    auth: "all",
    link: `${base}rng`,
    logo: `${base}rng-logo.png`,
    bkg: `${base}MetaMizer-bkg.png`,
  },
];