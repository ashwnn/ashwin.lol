type IGitHubRepository = {
  node: {
    name: string;
    url: string;
  };
};

type Language = {
  name: string;
  total_second: number;
};

type Response = {
  daily_average: string;
  commits: number;
  total_time_coding: string;
  editor: string;
  os: string;
  github: {
    starred: string[];
  };
  // racknerd: {
  //   hastebin: {
  //     file_count: number;
  //     size_mb: number;
  //     size: number;
  //   },
  //   lolisafe: {
  //     file_count: number;
  //     size_mb: number;
  //     size: number;
  //   }
  // };
  languages: Language[];
};

import type { NextApiRequest, NextApiResponse } from "next";

import { getLanguageInsight, getWeekly } from "../../lib/wakatime";
import { getCommits, getUserData } from "../../lib/github";
import { getCacheByKey, isCacheExpired, cacheData } from "../../lib/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { span } = req.query;
  let data: Response = {
    daily_average: "",
    commits: 0,
    total_time_coding: "",
    editor: "",
    os: "",
    github: {
      starred: [],
    },
    // racknerd: {
    //   hastebin: {
    //     file_count: 0,
    //     size_mb: 0,
    //     size: 0,
    //   },
    //   lolisafe: {
    //     file_count: 0,
    //     size_mb: 0,
    //     size: 0,
    //   }
    // },
    languages: [],
  };

  if (span) {
    if (isCacheExpired("api_insights")) {
      let lang = await getLanguageInsight(span).then((res) => res.json());
      data.languages = lang.data.languages;

      let waka_weekly = await getWeekly().then((res) => res.json());
      data.daily_average = waka_weekly.data.human_readable_daily_average;
      data.total_time_coding = waka_weekly.data.human_readable_total;
      data.editor = waka_weekly.data.editors[0].name;
      data.os = waka_weekly.data.operating_systems[0].name;

      data.commits = await getCommits();
      data.github.starred = await getUserData().then((data) =>
        data.data.viewer.starredRepositories.edges.map(
          (repo: IGitHubRepository) => {
            return {
              name: repo.node.name,
              url: repo.node.url,
            };
          }
        )
      );
    } else {
      data = await getCacheByKey("api_insights");
    }
  } else {
    if (isCacheExpired("api_insights")) {
      let lang = await getLanguageInsight("last_7_days").then((res) =>
        res.json()
      );
      data.languages = lang.data.languages;

      let waka_weekly = await getWeekly().then((res) => res.json());
      data.daily_average = waka_weekly.data.human_readable_daily_average;
      data.total_time_coding = waka_weekly.data.human_readable_total;
      data.editor = waka_weekly.data.editors[0].name;
      data.os = waka_weekly.data.operating_systems[0].name;

      let commits = await getCommits();
      data.commits = commits.data.viewer.contributionsCollection.totalCommitContributions;
      data.github.starred = await getUserData().then((data) =>
        data.data.viewer.starredRepositories.edges.map(
          (repo: IGitHubRepository) => {
            return {
              name: repo.node.name,
              url: repo.node.url,
            };
          }
        )
      );
    } else {
      data = await getCacheByKey("api_insights");
    }
  }

  res.status(200).json({
    ...data,
  });
}
