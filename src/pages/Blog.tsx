import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import { posts } from "../services/content";

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog — Abhijeet Anand"
        description="Writing on Java, Spring Boot, React, cloud, Kubernetes and AI/ML by Abhijeet Anand."
        path="/blog"
      />

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-20 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute -top-14 left-10 h-72 w-72 rounded-full bg-neon-pink/8 blur-[110px]"
        />
        <SectionHeading
          eyebrow="Blog"
          title="Notes from the trenches"
          description="Engineering write-ups, learnings and experiments — published straight from the CMS."
        />

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="glass mx-auto mt-12 max-w-lg rounded-2xl p-12 text-center">
              <h3 className="font-display text-xl font-semibold text-haze-100">First post incoming</h3>
              <p className="mt-3 text-sm text-haze-500">
                The blog is warming up — check back soon.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
