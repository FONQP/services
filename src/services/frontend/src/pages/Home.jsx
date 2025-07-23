import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function Home() {
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Trigger Google OAuth or backend call here
    console.log("Login clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-full max-w-sm p-6 shadow-lg bg-white">
        <Typography variant="h4" className="text-center font-semibold mb-6">
          Sign in to Metamizer
        </Typography>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            variant="outlined"
            size="lg"
            label="Email"
            type="email"
            required
            className="focus:outline-none"
          />
          <Input
            variant="outlined"
            size="lg"
            label="Password"
            type="password"
            required
            className="focus:outline-none"
          />
          <Button type="submit" color="blue" size="lg" className="mt-2">
            Login
          </Button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">or</div>

        <Button
          color="white"
          className="w-full border border-gray-300 text-black shadow-sm flex items-center justify-center gap-2"
          onClick={() => {
            window.location.href = "http://localhost:8000/login/google"; // change for prod
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </Button>
      </Card>
    </div>
  );
}
