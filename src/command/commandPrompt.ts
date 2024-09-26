import { injectable } from "inversify";
import inquirer from "inquirer";

@injectable()
export class CommandPrompt {
  readonly initPrompt = [
    {
      name: "projectName",
      message: "Enter the project name",
      default: "my-project",
    },
    {
      name: "template",
      message: "Choose a template",
      type: "list",
      choices: ["JavaScript", "TypeScript"],
    },
  ];

  async init() {
    return inquirer.prompt(this.initPrompt);
  }
}
