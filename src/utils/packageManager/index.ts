export interface PackageManager {
  manager: string;
  getVersion: () => Promise<string>;
  restorePackages: (cwd: string) => Promise<void>;
}
