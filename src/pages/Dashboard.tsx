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
        <div className="rounded-xl w-[400px] shadow-md" key={item.id}>
          <div className="relative">
            <img
              src={
                item.urlToImage ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt="newsImage"
              className="rounded-xl"
            />
            <h3 className="absolute top-8 left-8 bg-red-600 text-white rounded-sm font-bold px-2">
              NEWS
            </h3>
          </div>
          <div className="p-6 space-y-5">
            <p className="text-gray-500 font-bold">
              {new Date(item.publishedAt)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}
            </p>
            <div className="title">
              <h1 className="text-3xl font-bold"> {item.title}</h1>
            </div>
            <div className="description">
              <p className="text-xl text-gray-500">{item.description}</p>
            </div>
            <div className="readMore">
              <p className="text-blue-400 text-2xl">
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