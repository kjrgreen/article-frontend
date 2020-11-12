import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Article = ({match}) => {
    console.log(JSON.stringify(match))
    let articleId = match.params.articleId;
    let articles = useSelector(state => state.content.articles);
    articles = Object.values(articles);
    let article = articles.find(element => element.id == articleId)
    return <div>
        <img src={"https://localhost:44356/Uploads/"+article.id+".jpg" /*yes, this is terrible, we need the CMS URL to be configureable*/} alt={article.title} />
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <Link to="/">Back to articles</Link>
    </div>;
}

export default Article;