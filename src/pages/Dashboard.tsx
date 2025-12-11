import { useEffect, useState } from "react"
import { getNews } from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const[news, setNews] = useState([]);
  const[loading, setLoading] = useState(false);

  const displayNews = async () => {
    try {
      setLoading(true); 
      const response = await getNews();
      console.log(response.data.articles);
      setNews(response.data.articles);
    } catch (error) {
      throw error;
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    displayNews()
  }, []);
  return (
    <div className="flex flex-wrap gap-8 p-8 justify-center">
      {news.map((item) => (
        <div
          className="rounded-t-xl w-[400px] shadow-md bg-white flex flex-col min-h-[600px]"
          key={item.id}
        >
          <div className="relative h-60 overflow-hidden">
            <img
              src={
                item.urlToImage ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt="newsImage"
              className="rounded-xl w-full h-60 object-cover shadow-md"
            />
            <h3 className="absolute top-4 left-4 bg-red-600 text-white rounded-sm font-bold px-2 shadow-md">
              NEWS
            </h3>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <p className="text-gray-500 font-bold">
              {new Date(item.publishedAt)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </p>
            <div className="title">
              <h1 className="text-2xl font-bold mt-2"> {item.title}</h1>
            </div>
            <div className="description">
              <p className="text-gray-500 text-base mt-2 flex-1">
                {item.description}
              </p>
            </div>
            <div className="readMore">
              <p className=" text-blue-500 text-lg mt-auto">
                <Link to={item.url}>Read more ...</Link>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard