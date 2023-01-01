import { Stats } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { getProjectInsight, getLanguageInsight, getWeekly } from "../../lib/wakatime";
import { getCommits } from "../../lib/github";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const projects = await getProjectInsight().then((res) => res.json());
  const languages = await getLanguageInsight().then((res) => res.json());
  const weekly = await getWeekly().then((res) => res.json());
  const commits = await getCommits();

  res.status(200).json({
    daily_average: weekly.data.human_readable_daily_average,
    commits: commits.data.viewer.contributionsCollection.totalCommitContributions,
    total_time_coding: weekly.data.human_readable_total,
    editor: weekly.data.editors[0].name,
    os: weekly.data.operating_systems[0].name,
    // projects: projects.data.projects.slice(0, 5),
    languages: languages.data.languages.slice(0, 5),
  });
}
