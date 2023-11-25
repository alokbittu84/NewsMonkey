import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem.js";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const update = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;

    let data = await fetch(url);
    props.setProgress(60);
    let parsedData = await data.json();
    console.log(parsedData)
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `News Monkey - ${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    }`;
    update();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)

    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
    // setTotalResults(parsedData.totalResults);
    setPage(page + 1);
  };

  return (
    <>
      <h4
        className="text-center text-danger text-decoration-underline"
        style={{ margin: "15px 0px", marginTop: "65px" }}
      >
        NewsMonkey- Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
        Headlines
      </h4>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
                  <NewsItem
                    title={e.title ? e.title :""}
                    imageUrl={
                      e.urlToImage
                        ? e.urlToImage
                        : "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80"}
                    description={
                      e.description ? e.description.slice(0, 88) : ""
                    }
                    newsUrl={e.url}
                    author={e.author ? e.author : "Unknown"}
                    publishTime={new Date(e.publishedAt).toGMTString()}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}
News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 6,
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
