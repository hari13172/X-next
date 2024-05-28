"use client";

import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [article, setArticle] = useState(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  });
  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4>Whats happening</h4>
      {news.slice(0, article).map((article) => (
        <div className="" key={article.url}>
          <a href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-300">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">
                  {article.source.name}
                </p>
              </div>
              <img
                src={article.urlToImage}
                alt=""
                className="w-[70px] rounded-xl"
              />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => setArticle(article + 2)}
        className="w-full py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
      >
        Show more
      </button>
    </div>
  );
}
