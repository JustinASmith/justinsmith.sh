import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate, getCategoryLabel } from "@/lib/content-utils";

interface PostListItemProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: readonly string[];
}

export function PostListItem({
  slug,
  title,
  description,
  date,
  category,
  tags,
}: PostListItemProps) {
  return (
    <article className="group py-4">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-3 text-sm">
          <time className="font-mono text-muted-foreground">
            {formatDate(date)}
          </time>
          <Badge variant="outline">{getCategoryLabel(category)}</Badge>
        </div>
        <h3>
          <Link
            href={`/blog/${slug}`}
            className="text-lg font-semibold transition-colors group-hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
