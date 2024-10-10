"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/CardArticle";
import DataTable from "@/components/DataTableArticles";
import { useSession } from "next-auth/react";

export default function Articles() {
  // get role
  const { data: session } = useSession();
  const role = session?.user?.role || "admin";

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const maxArticles = 20;

  // get articles
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const accessToken = session.accessToken;
          const response = await fetch(`/api/articles?page=${currentPage}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "fetch error");
          }

          const result = await response.json();

          setArticles((prevArticles) => {
            const newArticles = result.data;

            const articleMap = new Map(
              prevArticles.map((article) => [article.id, article])
            );

            newArticles.forEach((article) => {
              articleMap.set(article.id, article);
            });

            return Array.from(articleMap.values()).slice(0, maxArticles);
          });
        } catch (err) {
          console.error("fetch:", err);
          setError(err instanceof Error ? err.message : "something wrong");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, currentPage]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const columns = React.useMemo(
    () => [
      { Header: "No", accessor: "id" },
      { Header: "Nama", accessor: "title" },
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen content-pad">
      <h2 className="py-2">Articles</h2>

      {role === "admin" ? (
        <div className="mb-auto">
          <DataTable data={currentArticles} columns={columns} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-auto">
          {currentArticles.map((article) => (
            <Card key={article.id} data={article} type={"articles"} />
          ))}
        </div>
      )}

      {/*  pagination button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 mx-2"
        >
          {currentPage === 1 ? "1" : "Sebelumnya"}
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
