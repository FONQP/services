import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from "@material-tailwind/react";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function NotLoggedInMessage() {
    const [open, setOpen] = React.useState(true);
    return (
        <Dialog open={open} handler={() => setOpen(false)} size="sm">
            <DialogHeader className="flex items-center gap-2">
                <ExclamationCircleIcon className="h-8 w-8 text-yellow-800" />
                <span>Note</span>
            </DialogHeader>
            <DialogBody className="text-sm text-gray-700 overflow-y-auto max-h-[400px] mt-2 mb-4">
                <Typography variant="paragraph">
                    Log in to use the MetaMizer service. Else view the demo data.
                </Typography>
            </DialogBody>
            <DialogFooter className="mt-2">
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
        </Dialog>
    );
}
