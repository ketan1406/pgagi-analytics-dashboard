import { useGetTopHeadlinesQuery } from '../store/newsApi';

export default function NewsPage() {
  // For demo: fetch "technology" news
  const { data, error, isLoading } = useGetTopHeadlinesQuery({ category: 'technology' });

  if (isLoading) return <p>Loading news...</p>;
  if (error) return <p>Error fetching news.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Top Tech Headlines</h1>
      {data?.articles?.map((article: any, idx: number) => (
        <div key={idx} className="my-2 p-2 border-b">
          <p className="font-semibold">{article.title}</p>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}
