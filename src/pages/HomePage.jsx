import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../services/api";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { articles } = await Api.listArticles({ limit: 10, offset: 0 });
        setArticles(articles);
      } catch (e) {
        setErr(e);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h2>Latest Articles</h2>
      {err && <div className="alert error">Error: {JSON.stringify(err)}</div>}
      <div className="grid">
        {articles.map((a) => (
          <Link key={a.slug} to={`/articles/${a.slug}`} className="card linkcard">
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <div className="meta">
              <span>{a.author?.username}</span>
              <span> • {new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}