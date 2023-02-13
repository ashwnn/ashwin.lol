import Layout from "../components/Layout";
import Container from "../components/Container";
import { Icon } from "@iconify/react";
import Link from "next/link";

function Projects() {
  let tools = [
    {
      name: "HTML",
      icon: "logos:html-5",
      type: "language",
    },
    {
      name: "CSS",
      icon: "logos:css-3",
      type: "language",
    },
    {
      name: "JavaScript",
      icon: "logos:javascript",
      type: "language",
    },
    {
      name: "TypeScript",
      icon: "logos:typescript-icon",
      type: "language",
    },
    {
      name: "Next.js",
      icon: "logos:nextjs-icon",
      type: "framework",
    },
    {
      name: "Node.js",
      icon: "logos:nodejs-icon",
      type: "tool",
    },
    {
      name: "Rust",
      icon: "logos:rust",
      type: "language",
    },
    {
      name: "Python",
      icon: "logos:python",
      type: "language",
    },
    {
      name: "Java",
      icon: "logos:java",
      type: "language",
    },
    {
      name: "PowerShell",
      icon: "vscode-icons:file-type-powershell",
      type: "scripting",
    },
    {
      name: "Bash",
      icon: "logos:bash-icon",
      type: "scripting",
    },
    {
      name: "MustacheJS",
      icon: "vscode-icons:file-type-light-mustache",
      type: "template",
    },
    {
      name: "Flask",
      icon: "logos:flask",
      type: "framework",
    },
    {
      name: "Django",
      icon: "logos:django-icon",
      type: "framework",
    },
    {
      name: "Jinja2",
      icon: "vscode-icons:file-type-jinja",
      type: "template",
    },
    {
      name: "Tauri",
      icon: "logos:tauri",
      type: "framework",
    },
  ];

  return (
    <Layout title="My Work">
      <Container>
        <div className="max-w-screen-xl px-3 mx-auto mt-10">
          <Link href="/" className="pb-10">
            <Icon
              className="inline-block w-5 h-5 mb-5 align-text-top"
              icon="charm:arrow-left"
            />
          </Link>
          <h2 className="mb-6 text-2xl leading-snug shine">
            <b className="font-medium">
              <span>Languages/Tools</span>
            </b>
          </h2>
          <div className="flex flex-wrap mx-auto mt-6 gap-x-3 gap-y-3-">
          </div>
        </div>
      </Container>
    </Layout>
  );
}

function sortToolsByType(tools : any[]) {
    const sortedTools = [];
  
    // Create a map of types to tools
    const toolsByType = tools.reduce((acc, tool) => {
      if (!acc[tool.type]) {
        acc[tool.type] = [];
      }
      acc[tool.type].push(tool);
      return acc;
    }, {});
  
    const types = Object.keys(toolsByType).sort();
  
    for (const type of types) {
      sortedTools.push({ name: type, isHeader: true });
      sortedTools.push(...toolsByType[type]);
    }
  
    return sortedTools;
  }
  

export default Projects;
