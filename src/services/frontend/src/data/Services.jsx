export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const services = [
  {
    title: "Latex Server",
    description:
      "Internal Latex Server",
    auth: "all",
    // link to current page/latex
    link: "/services/latex",
    logo: "/overleaf-logo.png",
    bkg: "/MetaMizer-bkg.png",
    action: "Write",
    color: "bg-green-900 hover:bg-green-950",
  },
  {
    title: "MetaMizer",
    description:
      "AI based Metamaterial Designing",
    auth: "all",
    link: "/services/metamizer",
    logo: "/MetaMizer-logo.png",
    bkg: "/MetaMizer-bkg.png",
    action: "Design",
    color: "bg-purple-200 hover:bg-purple-300",
  },
  {
    title: "Datasets",
    description:
      "Optical Datasets",
    auth: "all",
    link: "/services/datasets",
    logo: "/datasets-logo.png",
    bkg: "/MetaMizer-bkg.png",
    action: "Explore",
    color: "bg-lime-500 hover:bg-lime-600",
  },
  {
    title: "Random Number Generators",
    description:
      "Access our TRNGs",
    auth: "all",
    link: "/services/rng",
    logo: "/rng-logo.png",
    bkg: "/rng-bkg.png",
    action: "Acquire",
    color: "bg-gray-600 hover:bg-gray-700",
  },
];