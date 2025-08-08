import {
    Card,
    CardBody,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { FaGithub } from "react-icons/fa";

import { sir, teamMembers } from "../data/Team"; // adjust import path as needed

export default function Team() {
    const activeMembers = teamMembers.filter((member) => member.status === "Active");
    const pastMembers = teamMembers.filter((member) => member.status !== "Active");

    const renderLinks = (member) => (
        <div className="flex gap-3 mt-2 justify-center lg:justify-start items-center">
            {member.email && (
                <Tooltip content="Email">
                    <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                        <img src="/email.png" alt="email" className="h-4" />
                    </a>
                </Tooltip>
            )}
            {member.googleScholar && (
                <Tooltip content="Google Scholar">
                    <a href={member.googleScholar} target="_blank" rel="noopener noreferrer">
                        <img src="/scholar.png" alt="Google Scholar" className="h-5" />
                    </a>
                </Tooltip>
            )}
            {member.github && (
                <Tooltip content="GitHub">
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-5 h-5 text-gray-800" />
                    </a>
                </Tooltip>
            )}
            {member.website && (
                <Tooltip content="Website">
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                        <GlobeAltIcon className="w-5 h-5 text-blue-500" />
                    </a>
                </Tooltip>
            )}
        </div>
    );


    return (
        <div className="fixed top-[64px] left-0 right-0 bottom-0 w-full h-full">
            <div className="p-6 pt-8 max-h-screen overflow-y-auto w-full h-full">
                {/* Title */}
                <Typography variant="h2" color="blue-gray" className="text-center mb-4 text-4xl font-semibold">
                    Our Group
                </Typography>

                {/* Container */}
                <div className="w-full flex justify-center px-4 pt-6">
                    <div className="w-full max-w-7xl p-6 rounded-xl shadow-xl bg-white">
                        {/* Supervisor Section */}
                        <div className="mb-10 flex justify-center">
                            <div className="flex flex-col lg:flex-row items-center gap-6">
                                <img
                                    src={sir.image}
                                    alt={sir.name}
                                    className="w-36 h-36 object-cover rounded-full shadow"
                                />
                                <div className="text-center lg:text-left">
                                    <Typography variant="h4" className="text-gray-900">
                                        {sir.name}
                                    </Typography>
                                    <Typography variant="h6" className="text-gray-700">
                                        {sir.designation}
                                    </Typography>
                                    <Typography className="text-sm text-gray-600">
                                        {sir.description}
                                    </Typography>
                                    {renderLinks(sir)}
                                </div>
                            </div>
                        </div>

                        {/* Current Members */}
                        <div className="text-center">
                            <Typography variant="h5" className="text-center mb-6 text-gray-800 font-semibold">
                                Current Members
                            </Typography>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {activeMembers.map((member) => (
                                    <Card key={member.name} shadow={false} className="p-4 items-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4"
                                        />
                                        <CardBody className="text-center">
                                            <Typography variant="h6">{member.name}</Typography>
                                            <Typography className="text-sm text-gray-600">{member.designation}</Typography>
                                            <Typography className="text-sm text-gray-500">{member.description}</Typography>
                                            <div className="mt-2 flex justify-center gap-3">
                                                {renderLinks(member)}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>


                            {/* Past Members */}
                            <Typography variant="h5" className="mb-6 text-gray-800 font-semibold">
                                Past Members
                            </Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pastMembers.map((member) => (
                                    <Card key={member.name} shadow={false} className="p-4 items-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover mb-4"
                                        />
                                        <CardBody className="text-center">
                                            <Typography variant="h6">{member.name}</Typography>
                                            <Typography className="text-sm text-gray-600">{member.designation}</Typography>
                                            <Typography className="text-sm text-gray-500">{member.description}</Typography>
                                            <div className="mt-2 flex justify-center gap-3">
                                                {renderLinks(member)}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
