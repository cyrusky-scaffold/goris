import { exec } from "node:child_process";
import process from "process";

export class CommandUtils {
  static async executeCommand(
    command: string,
    cwd: string = process.cwd(),
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, { cwd }, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}
