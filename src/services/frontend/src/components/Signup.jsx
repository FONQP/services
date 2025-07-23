import React, { useState } from "react";
import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import Terms from "./Terms"; // separate component

export default function Signup({ open, setOpen }) {
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showTerms, setShowTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("You must agree to the terms");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful!");
                setOpen(false);
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    };

    return (
        <>
            <Dialog size="xs" open={open} handler={handleClose} className="bg-transparent shadow-none">
                <form onSubmit={handleSubmit}>
                    <Card className="mx-auto w-full max-w-[24rem]">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">Sign Up</Typography>

                            {/* Google Signup */}
                            <Button
                                color="white"
                                className="flex items-center justify-center gap-2 text-gray-700 shadow-md"
                                onClick={handleGoogleSignup}
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="h-5 w-5"
                                />
                                Continue with Google
                            </Button>

                            <div className="flex items-center gap-4">
                                <hr className="flex-1 border-blue-gray-100" />
                                <Typography variant="small" color="gray" className="font-normal text-blue-gray-400">
                                    or
                                </Typography>
                                <hr className="flex-1 border-blue-gray-100" />
                            </div>

                            {/* Name/Email/Password */}
                            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />

                            {/* Terms Checkbox with Dialog */}
                            <div className="-ml-2.5 -mt-3">
                                <Checkbox
                                    name="agreed"
                                    checked={formData.agreed}
                                    onChange={handleChange}
                                    label={
                                        <span>
                                            I agree to the{" "}
                                            <span className="underline cursor-pointer text-blue-600" onClick={() => setShowTerms(true)}>
                                                Terms and Conditions
                                            </span>
                                        </span>
                                    }
                                />
                            </div>
                        </CardBody>

                        <CardFooter className="pt-0">
                            <Button type="submit" variant="gradient" fullWidth>Sign Up</Button>
                            <Typography variant="small" className="mt-4 flex justify-center">
                                Already have an account?
                                <Typography
                                    as="a"
                                    href="#login"
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold"
                                    onClick={handleClose}
                                >
                                    Log In
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>

            {/* Terms and Conditions Dialog */}
            <Terms open={showTerms} setOpen={setShowTerms} />
        </>
    );
}
