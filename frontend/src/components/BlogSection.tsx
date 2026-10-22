import React, { useState, useEffect } from "react";
import { ArrowUpRight, Clock, Calendar, X, BookOpen } from "lucide-react";
import type { BlogPost } from "../types";
import { api } from "../lib/api";

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const fetchBlogPosts = async () => {
    const data = await api.getBlogPosts();
    if (data && data.length > 0) {
      setPosts(data.filter((p) => p.status === "Published"));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
    // Auto refresh when tab regains focus or every 6 seconds to capture Admin Panel additions
    const handleFocus = () => fetchBlogPosts();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(fetchBlogPosts, 6000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Publications
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              Articles &amp; technical research
            </h2>
          </div>

          <p className="text-slate-600 text-sm max-w-md">
            Architectural case studies, deep-dives into LLM inference latency, and distributed systems postmortems.
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {[1, 2].map((n) => (
              <div key={n} className="rounded-2xl border border-slate-100 p-6 animate-pulse bg-slate-50">
                <div className="w-full h-48 bg-slate-200 rounded-xl mb-4" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            <BookOpen size={28} className="mx-auto text-slate-300 mb-3" />
            <p>No published articles found in the SQLite database.</p>
            <p className="text-xs text-slate-400 mt-1">Publish a post in the Admin Panel to display it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {posts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="w-full h-52 rounded-xl overflow-hidden bg-slate-100 mb-6 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-semibold shadow-2xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{post.publishedAt}</span>
                    </div>
                    <span>&bull;</span>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950 group-hover:text-slate-700 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer / Author */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-100">
                      <img
                        src={post.author?.avatar}
                        alt={post.author?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block leading-tight">
                        {post.author?.name}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {post.author?.role}
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-all">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-50"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                {selectedPost.category}
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500">{selectedPost.readingTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 mb-4 leading-tight">
              {selectedPost.title}
            </h2>

            {/* Author bar */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100">
                <img
                  src={selectedPost.author?.avatar}
                  alt={selectedPost.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {selectedPost.author?.name}
                </span>
                <span className="text-[11px] text-slate-500">
                  {selectedPost.author?.role} &bull; {selectedPost.publishedAt}
                </span>
              </div>
            </div>

            {/* Cover image */}
            <div className="w-full h-64 rounded-xl overflow-hidden mb-6 bg-slate-100">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {selectedPost.content}
            </div>

            {/* Tags */}
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="pt-6 mt-8 border-t border-slate-100 flex flex-wrap gap-1.5">
                {selectedPost.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
