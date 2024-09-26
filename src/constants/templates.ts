export interface Template {
  id: string;
  name: string;
  gitRepo: string;
}

export const DEFAULT_BRANCH = "main";

export const templates: Template[] = [
  {
    id: "empty",
    name: "Empty NodeJS project",
    gitRepo: "https://github.com/cyrusky-scaffold/empty-node-project.git",
  },
];
