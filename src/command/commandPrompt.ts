import { injectable } from "inversify";
import inquirer from "inquirer";
import ora from "ora";
import { getTemplateBranches, getTemplateList } from "@/apis/github";
import { GitHubRepo } from "@/types/githubRepo";
import process from "process";
import { PromptUtils } from "@/utils/PromptUtils";
import { DEFAULT_BRANCH } from "@/constants/templates";
import { PackageManagerUtils } from "@/utils/packageManager";

export interface PromptAnswer {
  projectName: string;
  projectPath: string;
  template: string;
  createGitRepo: boolean;
  branch: string;
  description: string;
  packageManager: string;
}

@injectable()
export class CommandPrompt {
  private spinner = ora();
  private repos: GitHubRepo[] = [];
  private repo: GitHubRepo | undefined;
  readonly initPrompt = [
    {
      name: "projectName",
      message: "Enter the project name",
      default: "my-project",
      validate: (input: string) => {
        return PromptUtils.validateProjectName(input);
      },
    },
    {
      name: "projectPath",
      message: "Enter the project path",
      default: (args: PromptAnswer) => {
        return `${process.cwd()}/${args.projectName}`;
      },
      type: "input",
    },
    {
      name: "template",
      message: "Choose a template",
      type: "list",
      choices: async () => {
        this.spinner.start("Fetching templates");
        const repos = await getTemplateList();
        this.repos = repos.filter((repo) => {
          return repo.is_template || repo.name?.startsWith("templates-");
        });
        if (this.repos.length === 0) {
          console.error("No templates found");
          process.exit(1);
        }
        this.spinner.stop();
        return this.repos.map((repo) => repo.description);
      },
    },
    {
      name: "branch",
      message: "Choose a branch",
      type: "list",
      default: DEFAULT_BRANCH,
      choices: async (args: PromptAnswer) => {
        this.repo = this.getRepoByTemplateDescription(args.template);
        if (!this.repo) {
          console.error("Repo not found");
          process.exit(1);
        }
        this.spinner.start("Fetching branches");
        const branches = await getTemplateBranches(this.repo);
        this.spinner.stop();
        return branches.map((branch) => branch.name);
      },
    },
    {
      name: "description",
      message: "Enter a description",
      default: "A new boris project",
      type: "input",
    },
    {
      name: "createGitRepo",
      message: "Initialize a git repository",
      default: "Y",
      type: "confirm",
    },
    {
      name: "Package manager",
      message: "Choose a package manager",
      type: "list",
      choices: async () => {
        return await PackageManagerUtils.getPackageManagerList();
      },
    },
  ];

  getRepoByTemplateDescription(description: string) {
    return this.repos.find((repo) => repo.description === description);
  }

  async init(): Promise<PromptAnswer> {
    return inquirer.prompt(this.initPrompt);
  }
}
