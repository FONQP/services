import React from 'react';
import { useState } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
    Button,
    Textarea,
    Spinner,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from '@material-tailwind/react';
import {
    VariableIcon,
    ChevronDownIcon,
    CubeTransparentIcon,
    BeakerIcon,
    ArrowDownOnSquareStackIcon,
    PaperAirplaneIcon,
    LanguageIcon,
} from '@heroicons/react/24/solid';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Skeleton from '../components/skeleton';
import ExportDialog from '../components/Export';
import NotLoggedInMessage from '../components/NotLoggedInMessage';

function ModelDropdown({ selectedModel, onChange }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const models = ["TIG", "PatchTST"];

    const handleSelect = (model) => {
        onChange?.(model); // Optional callback to parent
        setIsMenuOpen(false);
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} allowHover>
            <MenuHandler>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-gray-300 hover:bg-gray-100 transition">
                    <VariableIcon className="h-5 w-5 text-blue-gray-500" />
                    <Typography variant="small" className="font-medium text-blue-gray-900">
                        {selectedModel || "Model"}
                    </Typography>
                    <ChevronDownIcon
                        strokeWidth={2}
                        className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </MenuHandler>

            <MenuList className="w-44">
                {models.map((model) => (
                    <MenuItem
                        key={model}
                        onClick={() => handleSelect(model)}
                        className="hover:bg-blue-50"
                    >
                        {model}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}


function LeftSection() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [selectedModel, setSelectedModel] = useState("Select Model");
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

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

    const handleFileUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setPreviewImageUrl(null);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setPreviewImageUrl(url);
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Scrollable main content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Model selector */}
                <div className="flex justify-center">
                    <ModelDropdown
                        selectedModel={selectedModel}
                        onChange={(model) => setSelectedModel(model)}
                    />
                </div>

                {/* Upload + Preview */}
                <div className="w-full aspect-video relative">
                    {/* Drop/Click Upload Box */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById("file-input").click()}
                        className="absolute inset-0 border-2 border-dashed border-purple-500 rounded-lg flex items-center justify-center text-center cursor-pointer transition hover:backdrop-blur-md z-10 backdrop-blur-sm"
                    >
                        <input
                            id="file-input"
                            type="file"
                            className="hidden"
                            accept=".csv,image/*"
                            onChange={handleFileChange}
                        />
                        <Typography variant="h6" className="text-cyan-800 z-20">
                            {file ? file.name : "Drag & Drop or Click to Upload a CSV/Image"}
                        </Typography>
                    </div>

                    {/* Backend-generated preview image (if exists) */}
                    {previewImageUrl && (
                        <img
                            src={previewImageUrl}
                            alt="Processed Preview"
                            className="absolute inset-0 object-contain w-full h-full rounded-lg pointer-events-none z-0"
                        />
                    )}
                </div>

                <div className="flex justify-between">
                    {/* Upload button aligned left */}
                    <Button
                        disabled={!file || isUploading}
                        onClick={handleFileUpload}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                    >
                        {isUploading ? "Uploading..." : "Upload File"}
                    </Button>

                    {/* Run button aligned right */}
                    <Button
                        disabled={!file || isUploading}
                        onClick={handleFileUpload}
                        className="bg-lime-500 text-white px-6 py-2 rounded-md hover:bg-lime-700"
                    >
                        {isUploading ? "Running..." : "Run Inference"}
                    </Button>
                </div>

            </div>

            {/* Fixed Chat Input */}
            <div className="border-t border-gray-200 p-4 space-y-2">
                <Textarea
                    label="Prompt the LLM..."
                    value={text}
                    color="green"
                    onChange={(e) => setText(e.target.value)}
                    containerProps={{ className: "min-h-[100px] backdrop-blur-sm" }}
                />

                <div className="flex items-center justify-between">
                    <span className="text-md text-gray-500">Upstream LLM Model: None</span>

                    <Button
                        onClick={handleSend}
                        className="text-white px-4 py-2 rounded-md transition bg-purple-50 flex items-center gap-2"
                    >
                        <PaperAirplaneIcon className="h-5 w-5 text-purple-700" />
                    </Button>
                </div>
            </div>

        </div>
    );
}


function ModelViewer({ onExport }) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 min-h-0 w-full rounded-xl overflow-hidden border border-transparent backdrop-blur-sm">
                <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 3, 4]} intensity={1} />
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="skyblue" />
                    </mesh>
                    <OrbitControls enableZoom={true} />
                </Canvas>
            </div>
            <div className="mt-auto p-4 flex justify-center">
                <Button
                    onClick={onExport}
                    className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600 flex items-center gap-2"
                >
                    <ArrowDownOnSquareStackIcon className="w-5 h-5" />
                    Export
                </Button>
            </div>
        </div>
    );
}


function ValidateSection({ onExport }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [logs, setLogs] = React.useState([]);

    const handleSimulate = async () => {
        setIsLoading(true);
        setImageUrl(null);
        setLogs([]);

        try {
            const res = await fetch("/api/simulate");
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            setImageUrl(url);

            const logsRes = await fetch("/api/simulate/logs");
            const data = await logsRes.json();
            setLogs(data.logs || []);
        } catch (err) {
            console.error("Simulation failed:", err);
            setLogs(["Simulation failed. Check console for details."]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full px-2 py-4 gap-4">
            <div className="flex justify-center">
                <Button
                    onClick={handleSimulate}
                    className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
                >
                    Simulate
                </Button>
            </div>

            <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg border border-transparent flex items-center justify-center backdrop-blur-sm">
                {isLoading ? (
                    <Spinner className="h-16 w-16" color="orange" />
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Simulation Output"
                        className="object-contain w-full h-full rounded-md"
                    />
                ) : (
                    <Typography variant="small" color="gray">
                        Simulated response will appear here
                    </Typography>
                )}
            </div>

            <div className="flex-1 min-h-0 w-full max-w-4xl mx-auto border border-gray-200 rounded-md overflow-y-auto p-4 backdrop-blur-sm">
                {logs.length > 0 ? (
                    logs.map((line, idx) => (
                        <Typography key={idx} variant="small" className="text-gray-800 whitespace-pre-wrap">
                            {line}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="medium" color="gray">
                        Simulation Logs
                    </Typography>
                )}
            </div>

            <div className="mt-auto p-4 flex justify-center">
                <Button
                    onClick={onExport}
                    className="bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600 flex items-center gap-2"
                >
                    <ArrowDownOnSquareStackIcon className="w-5 h-5" />
                    Export
                </Button>
            </div>
        </div>
    );
}


function LLMChatSection() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [responseText, setResponseText] = React.useState(null);

    const handleSend = async () => {
        setIsLoading(true);
        setResponseText(null);

        try {
            const res = await fetch("/api/llm-chat");
            const data = await res.text(); // or .json() depending on backend
            setResponseText(data);
        } catch (err) {
            console.error("Failed to fetch LLM response:", err);
            setResponseText("Error: Failed to get response from backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden">
            <div className="flex-1 min-h-0 w-full rounded-md overflow-y-auto p-6">
                {isLoading ? (
                    <div className="flex justify-center">
                        <Skeleton />
                    </div>
                ) : responseText ? (
                    <Typography variant="paragraph" className="whitespace-pre-wrap text-gray-800">
                        {responseText}
                    </Typography>
                ) : (
                    <>

                        <Typography variant="small" color="gray" className="text-center mb-8">
                            LLM output will appear here
                        </Typography>
                        <div className="flex justify-center">
                            <Skeleton />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function RightSection() {
    const [exportOpen, setExportOpen] = useState(false);
    const tabsData = [
        {
            label: "Output",
            value: "output",
            icon: CubeTransparentIcon,
            desc: <ModelViewer onExport={() => setExportOpen(true)} />,
        },
        {
            label: "Validate",
            value: "validate",
            icon: BeakerIcon,
            desc: <ValidateSection onExport={() => setExportOpen(true)} />,
        },
        {
            label: "LLM Chat",
            value: "llm-chat",
            icon: LanguageIcon,
            desc: <LLMChatSection />, // optional: also allow export from here
        },
    ];

    return (
        <>
            <div className="flex flex-col h-full w-full overflow-hidden">
                <Tabs value="output" className="flex flex-col h-full">
                    <TabsHeader className="bg-gray-100">
                        {tabsData.map(({ label, value, icon }) => (
                            <Tab key={value} value={value}>
                                <div className="flex items-center gap-2">
                                    {icon && React.createElement(icon, { className: "w-5 h-5" })}
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>

                    <TabsBody className="flex-1 min-h-0 overflow-hidden px-4 py-4">
                        {tabsData.map(({ value, desc }) => (
                            <TabPanel key={value} value={value} className="flex flex-col h-full">
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>

            {/* Export Dialog */}
            <ExportDialog open={exportOpen} setOpen={setExportOpen} />
        </>
    );
}

export default function Metamizer() {
    const isLoggedIn = localStorage.getItem("authToken") !== null;

    return (
        <div className="fixed top-[64px] left-0 right-0 bottom-0 overflow-hidden">
            <div
                className="absolute inset-0 bg-no-repeat bg-cover z-0"
                style={{
                    backgroundImage: "url('/MetaMizer-bkg.png')",
                    backgroundSize: "cover", // zoomed out
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {/* Main Content */}
            <div className="relative z-10 flex w-full h-full">
                {!isLoggedIn && <NotLoggedInMessage />}

                {/* Left Section - 60% */}
                <div className="w-[60%] h-full overflow-y-auto bg-white bg-opacity-90 p-6">
                    <LeftSection />
                </div>

                {/* Right Section - 40% */}
                <div className="w-[40%] h-full overflow-y-auto bg-white bg-opacity-90 p-6">
                    <RightSection />
                </div>
            </div>
        </div>
    );
}

