import { inject, injectable } from "inversify";
import { Command } from "commander";
import { CommandPrompt, PromptAnswer } from "./commandPrompt";
import { ServiceNames } from "@/constants/ServiceNames";
import process from "process";
import { GitUtils } from "@/utils/gitUtils";
import ora from "ora";
import * as fs from "node:fs";
import * as path from "node:path";

@injectable()
export class CommandRegister {
  private program: Command;

  constructor(
    @inject<CommandPrompt>(ServiceNames.CommandPrompt)
    private readonly commandPrompt: CommandPrompt,
  ) {
    this.program = new Command();
  }

  init() {
    this.initProgramInfo();
    this.initCreateCommand();
    this.program.parse();
  }

  private initProgramInfo() {
    this.program
      .name("goris")
      .version("1.0.0")
      .description("A simple CLI to create projects");
  }

  private initCreateCommand() {
    this.program
      .command("create")
      .description("Create a new project")
      .action(async () => {
        try {
          const answer = await this.commandPrompt.init();
          const repo = this.commandPrompt.getRepoByTemplateDescription(
            answer.template,
          );
          if (!repo || !repo.html_url) {
            console.error("Invalid template");
            process.exit(1);
          }
          await this.cloneGitRepo(
            answer.projectPath,
            repo.html_url,
            answer.branch,
          );
          await this.fixProjectInfo(answer.projectPath, answer);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          process.exit(1);
        }
      });
  }

  private async cloneGitRepo(
    projectPath: string,
    html_url: string,
    branch: string,
  ) {
    const spinner = ora();
    try {
      spinner.start("Cloning repo...");
      if (fs.existsSync(projectPath)) {
        spinner.fail("Project already exists");
        process.exit(1);
      }
      await GitUtils.cloneGitRepo(projectPath, html_url, branch);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      spinner.fail("Failed to clone repo");
      process.exit(1);
    } finally {
      spinner.stop();
    }
  }

  private async fixProjectInfo(projectPath: string, answer: PromptAnswer) {
    const jsonPath = path.join(projectPath, "package.json");
    if (fs.existsSync(jsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      packageJson.name = answer.projectName;
      packageJson.description = answer.description;
      fs.writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2));
    }
  }
}
