import React from "react";
import PopularTopics from "./PopularTopics";
import RecentPosts from "./RecentPosts";
import TrendingArticles from "./TrendingArticles";

export default function Sidebar({ blogs = [], onTopicSelect }) {
  return (
    <aside className="flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-outline-variant/15 pt-6 lg:pt-0 lg:pl-5">
      <PopularTopics blogs={blogs} onTopicSelect={onTopicSelect} compact />
      <div className="border-t border-outline-variant/10" />
      <RecentPosts blogs={blogs} compact />
      <div className="border-t border-outline-variant/10" />
      <TrendingArticles blogs={blogs} compact />
    </aside>
  );
}
