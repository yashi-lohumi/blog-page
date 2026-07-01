import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Code, Calendar, Clock, Eye } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Breadcrumb from "../components/article/Breadcrumb";
import ReadingProgressBar from "../components/article/ReadingProgressBar";
import TableOfContents, { slugify } from "../components/article/TableOfContents";
import BookmarkButton from "../components/article/BookmarkButton";
import AuthorCard from "../components/article/AuthorCard";
import RelatedArticles from "../components/article/RelatedArticles";
import Comments from "../components/article/Comments";
import NewsletterCTA from "../components/blog/NewsletterCTA";
import Badge from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";

import { blogs } from "../data/blogs";
import { authors } from "../data/authors";
import { formatDate } from "../utils/formatDate";

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <PageContainer>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center">
          <h1 className="font-display-lg text-4xl mb-4 text-primary font-bold">Article Not Found</h1>
          <p className="text-on-surface-variant text-body-lg mb-8 font-light">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center font-bold px-6 py-2 rounded bg-primary text-white hover:bg-action-orange transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </PageContainer>
    );
  }

  const author = authors[blog.authorId];

  // ── Render content blocks ─────────────────────────────────────────────────
  const renderContentBlock = (block, idx) => {
    switch (block.type) {
      case "h2":
        return (
          <h2
            key={idx}
            id={slugify(block.text)}
            className="font-headline-md text-2xl sm:text-3xl text-primary mt-10 mb-4 font-bold scroll-mt-28"
          >
            {block.text}
          </h2>
        );
      case "p":
        return (
          <p key={idx} className="text-on-surface-variant text-body-lg mb-5 font-light leading-relaxed">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2.5 mb-5 text-on-surface-variant text-body-md font-light">
            {block.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="border-l-4 border-action-orange pl-6 py-3 my-8 italic text-body-lg text-primary bg-surface-container/20 rounded-r-lg font-light leading-relaxed"
          >
            <p className="mb-2">"{block.text}"</p>
            {block.author && (
              <cite className="text-label-sm font-bold text-outline uppercase not-italic block">
                — {block.author}
              </cite>
            )}
          </blockquote>
        );
      case "code":
        return (
          <div key={idx} className="my-6 border border-outline-variant/15 rounded-lg overflow-hidden bg-primary shadow-lg">
            <div className="bg-surface-container-lowest px-4 py-2 border-b border-outline-variant/10 text-label-sm text-outline select-none font-mono flex justify-between items-center">
              <span>{block.language || "code"}</span>
              <Code size={14} />
            </div>
            <pre className="p-6 overflow-x-auto font-mono text-sm text-white/95 leading-relaxed bg-[#0F0F0F]">
              <code>{block.code}</code>
            </pre>
          </div>
        );
      case "table":
        return (
          <div key={idx} className="overflow-x-auto my-8 border border-outline-variant/20 rounded-lg">
            <table className="w-full text-left border-collapse text-body-md">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant/30">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-bold text-primary select-none font-label-md">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {block.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface-container-low/30 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-6 py-4 text-on-surface-variant font-light">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <ReadingProgressBar />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-sm">

        {/* Breadcrumb */}
        <Breadcrumb category={blog.category} title={blog.title} />

        {/* Article Header */}
        <header className="mb-stack-md text-left mt-stack-sm">
          <Badge variant="violet" className="mb-4">{blog.category}</Badge>

          <div className="mb-4">
            <h1 className="font-display-lg text-3xl sm:text-4xl xl:text-5xl text-primary font-bold leading-tight max-w-4xl">
              {blog.title}
            </h1>
          </div>

          <p className="text-body-lg text-on-surface-variant font-light max-w-3xl mb-6 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Author + meta bar */}
          {author && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-outline-variant/25 py-3.5 mt-4">
              {/* Left: avatar + name + date + read time */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-3">
                  <Avatar src={author.avatar} alt={author.name} size="sm" />
                  <div>
                    <p className="font-bold text-primary text-[13px] leading-none">{author.name}</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-on-surface-variant text-[12px]">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {formatDate(blog.publishDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {blog.readTime} min read
                  </span>
                </div>
              </div>

              {/* Right: bookmark & views count */}
              <div className="flex items-center gap-3">
                <BookmarkButton slug={blog.slug} />
                <div className="flex items-center gap-1.5 text-[12px] text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/15">
                  <Eye size={14} className="text-outline" />
                  <span className="font-medium tabular-nums">
                    {blog.views >= 1000
                      ? `${(blog.views / 1000).toFixed(blog.views % 1000 === 0 ? 0 : 1)}k`
                      : blog.views.toLocaleString()}
                  </span>
                  <span className="text-outline">views</span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Cover image */}
        <section className="mb-gutter relative overflow-hidden rounded-xl aspect-[21/9] border border-outline-variant/15 select-none shadow-sm">
          <img
            src={blog.coverImage}
            alt={`Cover graphic: ${blog.title}`}
            className="w-full h-full object-cover"
          />
        </section>

        {/* ── 2-column layout: sticky TOC+Share | Article body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-stack-md relative">

          {/* Column A — Sticky TOC + Share (3 of 12) */}
          <aside className="lg:col-span-3">
            <TableOfContents
              contentBlocks={blog.content}
              title={blog.title}
              slug={blog.slug}
            />
          </aside>

          {/* Column B — Main article content (9 of 12) */}
          <article className="lg:col-span-9 text-left max-w-none min-w-0">
            {blog.content.map((block, idx) => renderContentBlock(block, idx))}

            {/* Author bio card */}
            <AuthorCard author={author} />

            {/* Comments */}
            <Comments blogId={blog.id} />
          </article>
        </div>

        {/* Related articles — horizontal scroll */}
        <RelatedArticles currentBlog={blog} allBlogs={blogs} />
      </div>

      {/* Newsletter */}
      <div className="mt-stack-lg">
        <NewsletterCTA
          title="Join the Adda"
          description="Get the week's most critical MarTech insights delivered directly to your inbox. No fluff, just strategy."
        />
      </div>
    </PageContainer>
  );
}
