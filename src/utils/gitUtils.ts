import clone from "git-clone";
import { DEFAULT_BRANCH } from "@/constants/templates";

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
}
