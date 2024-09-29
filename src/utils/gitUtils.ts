import clone from "git-clone";
import { DEFAULT_BRANCH } from "@/constants/templates";
import * as path from "node:path";
import * as fs from "node:fs";
import { exec } from "node:child_process";

export class GitUtils {
  static async cloneGitRepo(
    projectPath: string,
    repoUrl: string,
    gitBranch: string,
  ) {
    return new Promise((resolve, reject) => {
      const options: Record<string, string> = {};
      if (gitBranch !== DEFAULT_BRANCH) {
        options.checkout = gitBranch;
      }
      clone(repoUrl, projectPath, options, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }

  static clearGitRepo(projectPath: string) {
    if (fs.existsSync(path.join(projectPath, ".git"))) {
      fs.rmSync(path.join(projectPath, ".git"), { recursive: true });
    }
  }

  static async initGitRepo(projectPath: string) {
    return new Promise((resolve, reject) => {
      exec(`cd ${projectPath} && git init`, (error) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      });
    });
  }
}
