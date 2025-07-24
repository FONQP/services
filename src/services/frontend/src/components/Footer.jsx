import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-blue-gray-100 bg-white px-6 py-4 text-sm text-blue-gray-600">
      <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 text-center">
        <Typography>&copy; 2025 FONQP, IIT Kharagpur</Typography>
        <ul className="flex flex-wrap gap-x-6">
          <li>
            <Typography as="a" href="#" className="hover:text-blue-500">
              Lab Website
            </Typography>
          </li>
          <li>
            <Typography as="a" href="#" className="hover:text-blue-500">
              License
            </Typography>
          </li>
          <li>
            <Typography as="a" href="#" className="hover:text-blue-500">
              Contribute
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
}
