import { Pnpm } from "@/utils/packageManager/pnpm";
import { Npm } from "@/utils/packageManager/npm";
import { Yarn } from "@/utils/packageManager/yarn";

export class PackageManagerUtils {
  static packageManagerList = [new Npm(), new Pnpm(), new Yarn()];

  static async getPackageManagerList() {
    return await Promise.all(
      this.packageManagerList.map(async (manager) => {
        return `${manager.manager} (${(await manager.getVersion()).trim()})`;
      }),
    );
  }

  static async restorePackages(manager: string, cwd: string) {
    const packageManager = this.packageManagerList.find(
      (m) => m.manager === manager.split(" ")[0],
    );
    if (!packageManager) {
      throw new Error(`Package manager ${manager} not found`);
    }
    await packageManager.restorePackages(cwd);
  }
}
