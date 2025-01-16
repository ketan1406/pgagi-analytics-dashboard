import { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import Breadcrumb from "../../components/Breadcrumbs";
import { useGetTopHeadlinesQuery } from "../../store/newsApi";

export default function NewsDashboard() {
  // Provide a default category, e.g. "technology"
  const [category, setCategory] = useState("technology");

  // Trigger the RTK Query
  const { data, error, isLoading } = useGetTopHeadlinesQuery({ category });

  // You can get top headlines from data?.articles
  // Each article = { title, description, url, urlToImage, source: { name }, ... }

  // Basic error/loading checks
  if (isLoading) {
    return (
      <Layout>
        <Breadcrumb pageName="News Dashboard" />
        <div className="mx-auto max-w-7xl">
          <p className="text-lg text-dark dark:text-white">Loading news...</p>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <Breadcrumb pageName="News Dashboard" />
        <div className="mx-auto max-w-7xl">
          <p className="text-red">
            Oops, something went wrong fetching the news. Please try again.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        {/* Reuse the existing breadcrumb for consistency */}
        <Breadcrumb pageName="News" />

        {/* Page Header & Category Selector */}
        <div className="mb-6">
          <p className="text-body-sm text-dark-5 dark:text-dark-6">
            Select a category to see the latest news headlines.
          </p>
        </div>

        {/* Category Dropdown */}
        <div className="mb-6 flex items-center gap-2">
          <label htmlFor="category" className="font-medium text-dark-6 dark:text-dark-6">
            Category:
          </label>
          <select
            id="category"
            className="rounded border border-stroke bg-gray-2 py-2 px-3 text-dark-5 focus:border-primary focus:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.articles?.map((article: any, idx: number) => (
            <div
              key={idx}
              className="rounded-lg border border-stroke bg-white p-4 shadow-card-2 dark:border-dark-3 dark:bg-gray-dark"
            >
              {/* If an image is provided, display it */}
              {article.urlToImage && (
                <div className="mb-3 h-40 w-full overflow-hidden rounded">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-md font-semibold text-dark dark:text-white mb-2 line-clamp-2">
                {article.title}
              </h3>

              {/* Show snippet/description */}
              <p className="mb-3 text-dark-5 dark:text-dark-6 line-clamp-3">
                {article.description}
              </p>

              {/* Show source name, with link */}
              <p className="mb-1 text-sm text-dark-5 dark:text-dark-6">
                Source: <strong>{article.source?.name}</strong>
              </p>

              {/* “Read more” link -> article.url */}
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Read full article
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
