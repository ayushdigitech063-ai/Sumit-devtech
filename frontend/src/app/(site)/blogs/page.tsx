"use client";

import { useEffect, useState } from "react";
import Container from "@/app/ui/Container";
import { BlogListSection } from "@/app/sections/blog-sections";
import { blogPosts as fallbackPosts } from "@/data/blog-data";
import { fetchPublicBlogs, type BlogItem } from "@/lib/blogs-api";

export default function BlogsPage() {
  const [posts, setPosts] = useState<any[]>(fallbackPosts);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchPublicBlogs();
        if (res.success && res.data && res.data.length > 0) {
          // Map DB items to website blog post format
          const mapped = res.data.map((b: BlogItem) => ({
            id: b._id,
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            coverImage: b.coverImage || "/images/projects/case-thumb2.png",
            category: b.category,
            readTime: b.readTime || "5 min read",
            publishedAt: new Date(b.createdAt).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            featured: b.featured,
            author: {
              name: b.authorName || "Sumit Kumar",
              role: b.authorRole || "Lead Solutions Architect",
              avatar: "/images/team/member-1.png",
            },
            tags: b.tags || ["Technology"],
            content: {
              introduction: b.excerpt,
              sections: [
                {
                  heading: "Overview",
                  paragraphs: [b.content],
                },
              ],
              conclusion: "For customized architectural consultation, contact Sumit DevTech.",
            },
          }));
          setPosts(mapped);
        }
      } catch (err) {
        // fallback to initial data
      }
    }
    load();
  }, []);

  return (
    <main>
      <BlogListSection posts={posts} />
    </main>
  );
}
