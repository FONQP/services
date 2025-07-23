import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { API_BASE_URL } from "../config";
import Signup from "./Signup"; // Assuming you have a SignupDialog component

const handleLogin = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem("authToken", data.token);  // store token
    setOpen(false);  // close dialog
    // optionally: show success toast or redirect
  } catch (err) {
    alert(err.message);
  }
};


export default function Login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showSignup, setShowSignup] = React.useState(false);



  return (
    <>
      <Button onClick={handleOpen}>Log In</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Log In
            </Typography>
            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Log In.
            </Typography> */}

            <Button color="white" className="flex items-center justify-center gap-3 shadow-md border border-gray-300 text-gray-700" fullWidth>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Log in with Google
            </Button>

            <div className="flex items-center gap-4">
              <hr className="flex-1 border-blue-gray-100" />
              <Typography variant="small" color="gray" className="font-normal text-blue-gray-400">
                or
              </Typography>
              <hr className="flex-1 border-blue-gray-100" />
            </div>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleLogin} fullWidth>
              Log In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="span"
                onClick={() => {
                  setOpen(false);        // close login
                  setShowSignup(true);   // open signup
                }}
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
              >
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>

      {showSignup && <Signup open={showSignup} setOpen={setShowSignup} />}
    </>
  );
}