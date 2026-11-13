import { MetadataRoute } from "next";
import { site } from "@/data/site";
import { blogPosts } from "@/data/blog-data";
import { projectDetails } from "@/data/projects-data";
import { supportedCities, supportedServices } from "@/data/locations-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = site.url;

  // 1. Core Static Marketing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-company`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/all-projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonial`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // 2. Specific Service Category Landing Pages
  const serviceLandingPages: MetadataRoute.Sitemap = [
    "website-design",
    "reactjs-website-development",
    "wordpress-website-development",
    "shopify-website-development",
    "ecommerce-website-development",
    "digital-marketing-services",
    "php-website-development",
    "responsive-website-design",
    "dynamic-website-design",
    "maintenance-hosting-support",
    "website-maintenance",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic City + Service Local SEO Pages (/services/[service]/[city])
  const cityServiceRoutes: MetadataRoute.Sitemap = [];
  supportedServices.forEach((service) => {
    supportedCities.forEach((city) => {
      cityServiceRoutes.push({
        url: `${baseUrl}/services/${service.slug}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // 4. Dynamic Blog Articles
  const blogRoutes: MetadataRoute.Sitemap = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt || Date.now()),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  // 5. Dynamic Project / Case Studies
  const projectRoutes: MetadataRoute.Sitemap = (projectDetails || []).map((p) => ({
    url: `${baseUrl}/project-detail/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceLandingPages,
    ...cityServiceRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];
}
