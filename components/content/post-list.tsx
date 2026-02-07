import { PostListItem } from "./post-list-item";

interface Post {
  slug: string;
  entry: {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: readonly string[];
  };
}

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        No posts yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border">
      {posts.map((post) => (
        <PostListItem
          key={post.slug}
          slug={post.slug}
          title={post.entry.title}
          description={post.entry.description}
          date={post.entry.date}
          category={post.entry.category}
          tags={post.entry.tags}
        />
      ))}
    </div>
  );
}
