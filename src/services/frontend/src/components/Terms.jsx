import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Terms({ open, setOpen }) {
  return (
    <Dialog open={open} handler={() => setOpen(false)} size="md">
      <DialogHeader>Terms and Conditions</DialogHeader>
      <DialogBody className="text-sm text-gray-700 overflow-y-auto max-h-[400px]">
        <Typography variant="paragraph">
          The data uploaded to Metamizer will be used to train AI models and improve our services.
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" onClick={() => setOpen(false)}>Close</Button>
      </DialogFooter>
    </Dialog>
  );
}
