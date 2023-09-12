import axios from "axios";
const REACT_APP_NEWS_API = process.env.REACT_APP_NEWS_API;

// const NEWS_API_ENDPOINT=`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${REACT_APP_NEWS_API}`
const NEWS_API_ENDPOINT=`https://saurav.tech/NewsAPI/top-headlines/category/business/in.json`
const CYPTO_API_ENDPOINT=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en
`

export const getNews= async()=>{
    let response;
    try {
     response= await axios.get(NEWS_API_ENDPOINT)
     response = response.data.articles.slice(15,30);
    // console.log(response)
   
    } catch (error) {
        console.log(error)
    }
    return response
}
export const getCrpto= async()=>{
    let response;
 try{
    response=await axios.get(CYPTO_API_ENDPOINT)
    response=response.data;
 }   
 catch(error){
    console.log(error)
 }
 return response
}