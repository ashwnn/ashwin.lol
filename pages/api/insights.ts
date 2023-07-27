import type { NextApiRequest, NextApiResponse } from "next";

import { getLanguageInsight, getWeekly } from "../../lib/wakatime";
import { getCommits, getUserData } from "../../lib/github";

import Edge from "../../lib/edge";

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


  let data = {
    daily_average: "",
    commits: 0,
    total_time_coding: "",
    editor: "",
    os: "",
    github: {
      starred: [],
    }
  };

  if (span) {

    const cached = new Edge().read(`insights_${span}`);

    if (cached != null) {
      console.log("cached");
      await cached.then((res) => {
        data = res;
      });

    } else {

      console.log("not cached");

      let waka_weekly = await getWeekly().then((res) => res.json());
      data.daily_average = waka_weekly.data.human_readable_daily_average;
      data.total_time_coding = waka_weekly.data.human_readable_total;
      data.editor = waka_weekly.data.editors[0].name;
      data.os = waka_weekly.data.operating_systems[0].name;

      data.commits = await getCommits();
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

      await new Edge().updateCache(`insights_${span}`, data);

    }
  } else {
    
    const cached = await new Edge().read(`insights_last_7_days`);

    if (cached != null) {
      console.log(cached);
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

      await new Edge().updateCache(`insights_last_7_days`, data);
    }
  }

  res.status(200).json({
    ...data,
  });
}
