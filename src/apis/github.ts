import { GithubBranch, GitHubRepo } from "@/types/githubRepo";

export const getTemplateList = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(
    "https://api.github.com/users/cyrusky-scaffold/repos",
  );
  return response.json();
};

export const getTemplateBranches = async (
  repo: GitHubRepo,
): Promise<GithubBranch[]> => {
  const response = await fetch(
    `https://api.github.com/repos/cyrusky-scaffold/${repo.name}/branches`,
  );
  return response.json();
};
