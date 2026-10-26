import React from "react";

export interface FeatureChip {
  id: string;
  label: string;
}

export interface TrustItem {
  id: string;
  value: string;
  label: string;
}

export interface EcosystemCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  colSpan?: "default" | "wide";
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: [string, string];
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface StatItem {
  id: string;
  numericValue: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServicePageData {
  hero: {
    badge: string;
    title: string | React.ReactNode;
    highlight?: string;
    description: string;
    chips: FeatureChip[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustItems: TrustItem[];
    previewUrl?: string;
    floatingBadge1?: { title: string; sub: string };
    floatingBadge2?: { title: string; sub: string };
  };
  ecosystem: {
    label: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    cards: EcosystemCard[];
  };
  services: {
    id?: string;
    label: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    items: ServiceItem[];
  };
  process: {
    label: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    steps: ProcessStep[];
  };
  stats: {
    items: StatItem[];
  };
  industries: {
    label: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    items: IndustryItem[];
  };
  faq: {
    label: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    items: FaqItem[];
  };
  cta: {
    badge: string;
    title: string | React.ReactNode;
    highlight?: string;
    text: string;
    benefits: string[];
    buttonText: string;
    buttonHref: string;
  };
}
