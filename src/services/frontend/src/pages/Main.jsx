import {
    Carousel,
    Card, CardHeader, CardBody, CardFooter, Typography, Button
} from "@material-tailwind/react";
import Footer from "../components/Footer";

function CarouselComp() {
    return (
        <>
            <div className="w-1/2 mx-auto mt-4 relative group">
                <Carousel
                    transition={{ duration: 2 }}
                    className="h-[50vh] w-full rounded-xl shadow-xl"
                    prevArrow={({ handlePrev }) => <></>}
                    nextArrow={({ handleNext }) => <></>}
                >
                    <img
                        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1600&q=80"
                        alt="Slide 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80"
                        alt="Slide 2"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=1600&q=80"
                        alt="Slide 3"
                        className="h-full w-full object-cover"
                    />
                </Carousel>
            </div>
        </>
    );
}

const homeCards = [
    {
        title: "MetaMizer",
        description: "Design metamaterials easily.",
        link: "/services/metamizer",
        logo: "/MetaMizer-logo.png",
    },
    {
        title: "Datasets",
        description: "Explore curated optical datasets.",
        link: "/services/datasets",
        logo: "/datasets-logo.png",
    },
    {
        title: "TRNG",
        description: "Access true random numbers.",
        link: "/services/rng",
        logo: "/rng-logo.png",
    },
];

function HomeCards() {
    return (
        <>
            <div className="w-full flex justify-center my-10 px-4">
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {homeCards.map(({ title, description, link, logo }) => (
                        <Card key={title} className="w-80">
                            <CardHeader className="relative h-40 bg-transparent shadow-none">
                                <img
                                    src={logo}
                                    alt={title}
                                    className="object-contain h-full w-full p-4"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {title}
                                </Typography>
                                <Typography className="text-sm">{description}</Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href={link}>
                                    <Button fullWidth>Go</Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default function Main() {
    return (        
        <div className="w-full pt-[64px]">
            {/* Centered Carousel */}
            <CarouselComp />

            {/* Welcome Text */}
            <div className="px-4 my-10 text-center text-gray-700">
                <Typography variant="h1" color="blue-gray" className="mb-4 text-4xl font-semibold">
                    Fiber Optics, Nano & Quantum Photonics (FONQP) Group
                </Typography>
                <Typography variant="h3" className="text-xl">
                    Advanced Photonics Lab, IIT Khargpur
                </Typography>
                <Typography className="mt-4 text-lg">
                    We are a research group working on fiber optics, nano photonics, and quantum photonics.
                </Typography>
            </div>

            {/* 3 Cards Centered */}
            <HomeCards />

            {/* News */}

            <Footer />

        </div>
    );
}
