import { Link } from "react-router-dom";
import type { BlogPost } from "../types/content";
import { formatDate, readingTime } from "../utils/frontmatter";
import { ArrowRightIcon, CalendarIcon } from "./icons";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group glass relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-neon-violet/35 hover:shadow-[0_14px_44px_-12px_rgba(139,92,246,0.35)]"
    >
      {post.coverImage && (
        <div className="-mx-6 -mt-6 mb-1 h-40 overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-center gap-3 font-mono text-[11px] text-haze-500">
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5" />
          {formatDate(post.publishedDate)}
        </span>
        <span className="h-1 w-1 rounded-full bg-haze-500/60" />
        <span>{readingTime(post.body)}</span>
      </div>

      <h3 className="font-display text-lg leading-snug font-semibold text-haze-100 transition-colors group-hover:text-neon-cyan">
        {post.title}
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-haze-500">{post.summary}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-[11px] text-neon-violet">
              #{tag}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-neon-cyan opacity-0 transition-all duration-300 group-hover:opacity-100">
          Read <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
