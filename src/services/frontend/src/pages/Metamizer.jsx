import React from "react";
import {
    Textarea,
    Typography,
    Button,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Spinner,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    BeakerIcon,
    ArrowDownOnSquareStackIcon,
    ChevronDownIcon,
    VariableIcon,
} from "@heroicons/react/24/solid";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ModelDropdown() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState("Model");

    const models = ["TIG", "PatchTST"];

    const handleSelect = (model) => {
        setSelectedModel(model);
        setIsMenuOpen(false);
    };

    return (
        <div className="flex justify-center items-center py-4">
            <Menu open={isMenuOpen} handler={setIsMenuOpen} allowHover>
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-normal cursor-pointer">
                        <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 rounded-full">
                            <VariableIcon className="h-5 w-5 text-blue-gray-500" />
                            {selectedModel}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="w-48">
                    {models.map((model) => (
                        <MenuItem key={model} onClick={() => handleSelect(model)}>
                            {model}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    );
}

function LeftSection() {
    const [file, setFile] = React.useState(null);
    const [text, setText] = React.useState("");

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSend = () => {
        console.log("Sending to backend:", text);
    };

    return (
        <div className="flex flex-col h-full pl-10 pr-4 py-6 gap-4">
            <ModelDropdown />
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("file-input").click()}
                className="aspect-video border-2 border-dashed border-purple-500 rounded-lg flex items-center justify-center text-center cursor-pointer"
            >
                <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept=".csv,image/*"
                    onChange={handleFileChange}
                />
                <Typography variant="h6" className="text-cyan-800">
                    {file ? file.name : "Drag & Drop or Click to Upload a CSV/Image"}
                </Typography>
            </div>

            <div className="flex-grow" />

            <div className="flex flex-col gap-2">
                <Textarea
                    color="green"
                    label="LLM Support"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button color="green" onClick={handleSend}>
                    Generate
                </Button>
            </div>
        </div>
    );
}

// Component to load and render the GLB model
function ModelViewer() {
    // const { scene } = useGLTF("/2CylinderEngine.glb"); // Ensure this path matches your FastAPI route

    return (
        <div className="h-[calc(100vh-150px)] my-7 rounded-xl overflow-hidden">
            <Canvas camera={{ position: [2, 2, 2] }}>
                <ambientLight />
                <directionalLight position={[5, 5, 5]} />
                {/* <primitive object={scene} scale={0.5} /> */}
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    );
}

function ValidateSection() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(null);

    const handleSimulate = async () => {
        setIsLoading(true);
        setImageUrl(null);

        try {
            const res = await fetch("/api/simulate"); // Your backend route
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } catch (err) {
            console.error("Simulation failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-6">
            <button
                onClick={handleSimulate}
                className="bg-teal-300 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition"
            >
                Simulate
            </button>

            <div className="w-full max-w-md h-[300px] flex items-center justify-center rounded-lg border-transparent">
                {isLoading ? (
                    <Spinner className="h-24 w-24" color="orange" />
                ) : (
                    imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Simulation Output"
                            className="object-contain w-full h-full rounded-md"
                        />
                    )
                )}
            </div>
        </div>
    );
}


export function RightSection() {



    const data = [
        {
            label: "Output",
            value: "output",
            icon: CubeTransparentIcon,
            desc: (
                <ModelViewer />
            ),
        },
        {
            label: "Validate",
            value: "validate",
            icon: BeakerIcon,
            desc: (
                <ValidateSection />
            ),
        },
        {
            label: "Export",
            value: "export",
            icon: ArrowDownOnSquareStackIcon,
            desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
        },
    ];

    return (
        <div className="h-full px-8 py-6 overflow-y-auto">
            <Tabs value="output">
                <TabsHeader>
                    {data.map(({ label, value, icon }) => (
                        <Tab key={value} value={value}>
                            <div className="flex items-center gap-2">
                                {React.createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default function Metamizer() {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            {/* Main horizontal layout */}
            <div className="flex flex-grow overflow-hidden">
                {/* Left: 60% */}
                <div className="w-3/5 pr-2 h-full">
                    <LeftSection />
                </div>

                {/* Right: 40% */}
                <div className="w-2/5 h-full">
                    <RightSection />
                </div>
            </div>
        </div>
    );
}
