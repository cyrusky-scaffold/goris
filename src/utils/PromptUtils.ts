export class PromptUtils {
  static validateProjectName(name: string) {
    // 正则表达式用于校验npm包名
    const regex = /^(?:@([^/\s]+)\/)?([a-z0-9_-]+)(?:@([^/\s]+))?$/;
    const forbiddenNames = ["node_modules", "favicon.ico"];

    // 检查长度
    if (name.length > 214 || name.length === 0) {
      return "The length of project name should be between 1 and 214";
    }

    // 检查是否在禁止列表中
    if (forbiddenNames.includes(name)) {
      return `The name ${name} can not set as project name`;
    }

    // 检查是否以点、连字符或下划线结尾
    if (/[._-]$/.test(name)) {
      return "The project name should not end with a period, hyphen, or underscore";
    }

    // 检查是否以npm-开头
    if (/^npm-/.test(name)) {
      return "The project name should not start with npm-";
    }

    // 检查是否以www开头
    if (/^www-/.test(name)) {
      return "The project name should not start with www-";
    }

    // 检查是否包含连续的大写字母
    if (/([A-Z])/.test(name)) {
      return "The project name should not contain uppercase letters";
    }

    // 使用正则表达式进行校验
    const match = name.match(regex);
    if (!match) {
      return "Invalid project name";
    }

    // 检查scoped package的scope部分
    const scope = match[1];
    if (scope && !/^[a-z0-9_-]+$/.test(scope)) {
      return "Invalid scope name";
    }

    return true;
  }
}
