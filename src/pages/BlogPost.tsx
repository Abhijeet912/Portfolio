import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { marked } from "marked";
import Seo from "../components/Seo";
import { getPost } from "../services/content";
import { formatDate, readingTime } from "../utils/frontmatter";
import { ArrowRightIcon, CalendarIcon } from "../components/icons";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  const html = useMemo(
    () => (post ? (marked.parse(post.body, { async: false }) as string) : ""),
    [post],
  );

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo title={`${post.title} — Abhijeet Anand`} description={post.summary} path={`/blog/${post.slug}`} type="article" />

      <article className="relative mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-10 right-0 h-64 w-64 rounded-full bg-neon-violet/10 blur-[100px]"
        />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 font-mono text-sm text-haze-500 transition-colors hover:text-neon-cyan"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to blog
          </Link>

          <h1 className="mt-7 font-display text-3xl leading-tight font-bold text-haze-100 sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-white/6 pb-7 font-mono text-xs text-haze-500">
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatDate(post.publishedDate)}
            </span>
            <span className="h-1 w-1 rounded-full bg-haze-500/60" />
            <span>{readingTime(post.body)}</span>
            {post.tags.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-haze-500/60" />
                <span className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-neon-violet">
                      #{tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </div>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt=""
              className="mt-8 w-full rounded-2xl border border-white/8"
            />
          )}

          <div
            className="prose-portfolio mt-8"
            // Content is authored exclusively by the site owner via Decap CMS.
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </motion.div>
      </article>
    </>
  );
}
