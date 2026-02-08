import { getPublishedPosts } from "@/lib/keystatic";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublishedPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Justin Smith</title>
    <link>https://justinsmith.sh</link>
    <description>Software engineer writing about agentic coding, software engineering, and building the future.</description>
    <atom:link href="https://justinsmith.sh/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.entry.title)}</title>
      <link>https://justinsmith.sh/blog/${post.slug}</link>
      <guid isPermaLink="true">https://justinsmith.sh/blog/${post.slug}</guid>
      <description>${escapeXml(post.entry.description)}</description>
      <pubDate>${new Date(post.entry.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.entry.category)}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
