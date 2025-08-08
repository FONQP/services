import { Typography, Button } from '@material-tailwind/react';
import { ExclamationTriangleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { services } from '../data/Services';

function UsbSection() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Typography className="text-center text-gray-600 text-2xl font-bold">USB TRNG</Typography>
            <Typography className="text-md text-center text-gray-500">Indian Patent filed (202431022600)</Typography>

            <a href="/brochure.pdf" download>
                <Button className="bg-cyan-300 hover:bg-cyan-400">
                    <div className="flex items-center gap-2">
                        <DocumentArrowDownIcon className="h-4" />
                        Brochure
                    </div>
                </Button>
            </a>

            {/* 16:9 Video */}
            <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow">
                <iframe
                    src="https://drive.google.com/file/d/1_zNnv8L8PQixHBHwuMVZAh62Y-JYjZiv/preview"
                    width="100%"
                    height="100%"
                    allow="autoplay"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>

        </div>
    );
}

function FemtoSection() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Typography className="text-center text-gray-600 text-2xl font-bold">Femtosecond Pulsing</Typography>
            <Typography className="text-md text-center text-gray-500">Entropy-as-a-Service</Typography>

            <a href="/brochure.pdf" download>
                <Button className="bg-teal-300 hover:bg-teal-400">
                    <div className="flex items-center gap-2">
                        <DocumentArrowDownIcon className="h-4" />
                        Paper
                    </div>
                </Button>
            </a>

            {/* Image */}
            <img
                src="/eaas.png"
                alt="Femtosecond"
                className="rounded-xl w-full max-w-2xl object-cover backdrop-blur-sm"
            />

            <Typography className="text-xl text-center text-orange-500 font-bold flex items-center justify-center gap-2">
                <ExclamationTriangleIcon className="h-5 text-orange-500" />
                Laser Offline
            </Typography>
            {/* Output + Button Row */}
            <div className="flex items-center gap-4 mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700" disabled>
                    Generate
                </Button>
                <div className="text-sm px-4 py-3 rounded-md border text-gray-700 shadow backdrop-blur-sm">
                    11011100101010101001011011...
                </div>
            </div>
        </div>
    );
}


export default function Rng() {
    const location = useLocation();
    const bkg = services.find(s => s.link === location.pathname);

    return (
        <div className="fixed top-[58px] left-0 right-0 bottom-0 overflow-hidden">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url(${bkg?.bkg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <div className="w-full h-full flex flex-col z-10 relative overflow-auto">
                {/* Header Section */}
                <div className="px-4 py-10 text-center text-gray-700 flex flex-col items-center">
                    <Typography variant="h2" color="blue-gray" className="mb-4 text-4xl font-semibold">
                        Explore our True Random Number Generators
                    </Typography>
                    <Typography variant="h3" className="text-xl">
                        Conditioned by Borel Selector
                    </Typography>
                </div>

                {/* Main scrollable split panel */}
                <div className="flex-1 flex">
                    <div className="w-1/2 p-6">
                        <UsbSection />
                    </div>
                    <div className="w-[2px] bg-gray-300"></div>
                    <div className="w-1/2 p-6">
                        <FemtoSection />
                    </div>
                </div>

                <div className="px-4 pt-10 text-center text-gray-700 flex flex-col items-center">
                    <Typography variant="h5" color="gray" className="mb-4 font-semibold">
                        Visit <a href="/contact" className="text-teal-600 hover:underline font-semibold">Contact Page</a> for integrations
                    </Typography>
                </div>


                {/* Footer at bottom */}
                <Footer />
            </div>
        </div>
    );
}
