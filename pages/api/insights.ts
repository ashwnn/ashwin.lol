import type { NextApiRequest, NextApiResponse } from "next";

import { getLanguageInsight, getWeekly } from "../../lib/wakatime";
import { getCommits, getUserData } from "../../lib/github";

// import cach
import { cache } from '../../lib/cache';
import { Insights } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { span } = req.query;

  type IRepoType = {
    node: {
      name: string;
      url: string;
    };
  };


  let data: Insights = {
    daily_average: "",
    commits: 0,
    total_time_coding: "",
    editor: "",
    os: "",
    github: {
      starred: [],
    }
  };


  const cached = await cache.get<Insights>(`insights_last_7_days`);

  if (cached != null) {
    console.log("cached");
    data = cached;
  }

  else {
    console.log("not cached");

    let waka_weekly = await getWeekly().then((res) => res.json());
    data.daily_average = waka_weekly.data.human_readable_daily_average;
    data.total_time_coding = waka_weekly.data.human_readable_total;
    data.editor = waka_weekly.data.editors[0].name;
    data.os = waka_weekly.data.operating_systems[0].name;

    let commits = await getCommits();
    data.commits = commits.data.viewer.contributionsCollection.totalCommitContributions;
    data.github.starred = await getUserData().then((data) =>
      data.data.viewer.starredRepositories.edges.map(
        (repo: IRepoType) => {
          return {
            name: repo.node.name,
            url: repo.node.url,
          };
        }
      )
    );

    await cache.set(`insights_last_7_days`, data, 60 * 60 * 24);
  }


  res.status(200).json({
    ...data,
  });
}
