export interface MetricCard {
  value: string;
  label: string;
}

export interface AboutSectionData {
  tagline: string;
  heading: string;
  description: string;
  experienceYears: string;
  experienceLabel: string;
  buttonText: string;
  buttonLink: string;
  badges: string[];
  image: {
    url: string;
    publicId: string;
  };
  metricCards: MetricCard[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}