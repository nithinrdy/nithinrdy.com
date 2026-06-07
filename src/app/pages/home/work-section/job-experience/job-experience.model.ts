export interface JobDescriptionSegment {
  text: string;
  href?: string;
}

export interface JobExperience {
  orgName: string;
  orgLogo: string;
  role: string;
  startMonth: number;
  startYear: number;
  endMonth: number | undefined;
  endYear: number | undefined;
  description: JobDescriptionSegment[][];
  tools: string[];
}
