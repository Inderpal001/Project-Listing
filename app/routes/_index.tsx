import type { MetaFunction } from "@remix-run/node";
import Project from "../Components/Projects/Project";

export const meta: MetaFunction = () => {
  return [
    { title: "Project List | Remix" },
    { name: "description", content: "Project List" },
  ];
};

export default function Index() {
  return (
    <>
      <Project/>
    </>
  );
}
