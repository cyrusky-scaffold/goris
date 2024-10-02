import { PackageManager } from "@/utils/packageManager/index";
import { CommandUtils } from "@/utils/commandUtils";

export class Npm implements PackageManager {
  manager: string = "npm";
  async restorePackages(cwd: string) {
    await CommandUtils.executeCommand(`${this.manager} install`, cwd);
  }

  async getVersion() {
    return await CommandUtils.executeCommand(`${this.manager} -v`);
  }
}
