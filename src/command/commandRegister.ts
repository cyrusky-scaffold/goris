import { inject, injectable } from "inversify";
import { Command } from "commander";
import { CommandPrompt } from "./commandPrompt";
import { ServiceNames } from "../constants/ServiceNames";

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
      .name("boris")
      .version("1.0.0")
      .description("A simple CLI to create projects");
  }

  private initCreateCommand() {
    this.program
      .command("create")
      .description("Create a new project")
      .action(async () => {
        const answer = await this.commandPrompt.init();
        console.log(answer);
      });
  }
}
