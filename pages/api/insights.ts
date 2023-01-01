import { Stats } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

import { getLanguageInsight, getWeekly } from "../../lib/wakatime";
import { getCommits, getUserData } from "../../lib/github";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { span } = req.query;
  let languages;
  if (span) {
    languages = await getLanguageInsight(span).then((res) => res.json());
  } else {
    languages = await getLanguageInsight("last_7_days").then((res) => res.json());
  }

  const racknerd = await fetch("https://stats.a7.wtf/").then((res) => res.json());
  const weekly = await getWeekly().then((res) => res.json());

  const commits = await getCommits();
  const starredRepos = await getUserData().then(data => data.data.viewer.starredRepositories.edges.map((repo: any) => {
    return {
      name: repo.node.name,
      url: repo.node.url
    }
  }));

  res.status(200).json({
    daily_average: weekly.data.human_readable_daily_average,
    commits: commits.data.viewer.contributionsCollection.totalCommitContributions,
    total_time_coding: weekly.data.human_readable_total,
    editor: weekly.data.editors[0].name,
    os: weekly.data.operating_systems[0].name,
    github: {
      starred: starredRepos,
    },
    racknerd: racknerd,
    languages: languages.data.languages,
  });
}
