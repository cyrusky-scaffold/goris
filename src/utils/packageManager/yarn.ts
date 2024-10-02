import { PackageManager } from "@/utils/packageManager/index";
import { CommandUtils } from "@/utils/commandUtils";

export class Yarn implements PackageManager {
  manager = "yarn";

  async getVersion() {
    return await CommandUtils.executeCommand(`${this.manager} --version`);
  }

  async restorePackages(cwd: string) {
    await CommandUtils.executeCommand(`${this.manager}`, cwd);
  }
}
