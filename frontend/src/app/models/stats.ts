export interface StatMetric {
  today: number;
  allTime: number;
}

export interface Stats {
  uniqueVisitors: StatMetric;
  linkedinClicks: StatMetric;
  sourceCodeViews: StatMetric;
  githubForks: { total: number };
}
