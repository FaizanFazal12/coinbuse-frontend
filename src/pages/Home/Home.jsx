import React, { useState, useEffect } from 'react'
import { getNews } from '../../api/external';
import styles from "./Home.module.css"
import Loader from '../../Component/loader/Loader';
export default function Home() {

  const [articles, setArticles] = useState([]);
  const handleCardClick=(url)=>{
    window.open(url,"_blank")
  }

  useEffect(() => {
    (
      async function newsApiCall() {
        const response = await getNews();
        setArticles(response)

      }
        ())

    setArticles([])
  }, [])
if(articles.length===0){
  return <Loader text="Homepage "/>
}
  return (
    <>
    <div className={styles.header}>Latest Articles</div>
    <div className={styles.grid}>
      {articles.map((article) => (
        <div
          className={styles.card}
          key={article.url}
          onClick={() => handleCardClick(article.url)}
        >
          <img src={article.urlToImage ? article.urlToImage:"https://i.insider.com/64abfc4b6d7e02001af89f93?width=1200&format=jpeg"} alt="" />
          <h3>{article.title}</h3>
        </div>
      ))}
    </div>
  </>
  )
}
