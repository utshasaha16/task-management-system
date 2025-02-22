import { Typography } from "@material-tailwind/react";

const YEAR = new Date().getFullYear();
const LINKS = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Add Task",
    href: "#",
  },
];

const TaskFooter = () => {
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 border-t border-surface py-4 text-center md:justify-between">
      <Typography>&copy; {YEAR} Task Management</Typography>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {LINKS.map(({ title, href }, idx) => (
          <li key={idx}>
            <Typography as="a" href={href} className="hover:text-primary">
              {title}
            </Typography>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default TaskFooter;
