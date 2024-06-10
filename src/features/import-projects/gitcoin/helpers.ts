import type { GitcoinProjectInfo } from "./type";
import { updateOrCreateProject } from "../helpers";
import { IPFS_GATEWAY, gitcoinSourceConfig } from "./constants";
import Showdown from "showdown";

const generateGitcoinUrl = (project: GitcoinProjectInfo) => {
  const application = project.applications[0];

  if (
    !application ||
    !application?.roundId ||
    !application?.chainId ||
    !application?.id
  )
    return "";

  const { chainId, roundId, id } = application;
  return `#/round/${chainId}/${roundId}/${id}`;
};

const convertIpfsHashToHttps = (hash: string) => {
  return `${IPFS_GATEWAY}/${hash}`;
};

const converter = new Showdown.Converter();
export const processProjectsBatch = async (
  projectsBatch: GitcoinProjectInfo[]
) => {
  for (const project of projectsBatch) {
    if (project.metadata?.type !== "project") continue;
    const description = project.metadata?.description;
    const processedProject = {
      id: project.id,
      title: project.name || project.metadata?.title,
      description,
      url: generateGitcoinUrl(project),
      image: project.metadata?.bannerImg
        ? convertIpfsHashToHttps(project.metadata?.bannerImg)
        : "",
      descriptionHtml: description
        ? converter.makeHtml(description)
        : undefined,
    };
    await updateOrCreateProject(processedProject, gitcoinSourceConfig);
  }
};
