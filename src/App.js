import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams, Link
} from "react-router-dom";
import {useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Article from "./components/Article";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
    },
}));

{/*width: 500,
        height: 450,*/}

function App() {
    const classes = useStyles();

    let isReady = useSelector(state => state.content.ready); //Only call hooks once :)
    let articles = useSelector(state => state.content.articles);

    articles = Object.values(articles);

  return (
    <Router>
      <Container maxWidth="lg">
      <h1>Basic news article site</h1>
      <Switch>
          { isReady && <Route path="/:articleId" component={Article}/> } {/* Maybe it's better to use something other than an ID for this path, but for the purposes of keeping this project simple, we can leave this be */}
        <Route path="/">
            <div className={classes.root}>
              { !isReady && <CircularProgress size={"50%"}/> /*Show indeterminate loading circle while fetching articles*/}
              { isReady &&
                <GridList className={classes.gridList} cols={2} spacing={10}>
                    {articles.map(
                        (article) =>
                            <GridListTile key={article.id} >
                                <Link to={"/"+article.id}>
                                    <img src={"https://localhost:44356/Uploads/"+article.id+".jpg" /*yes, this is terrible, we need the CMS URL to be configureable*/} alt={article.title} />
                                    <GridListTileBar
                                        title={article.title}
                                        subtitle={<span>Created: {new Date(article.created).toTimeString()}</span>}
                                    />
                                </Link>
                            </GridListTile>
                        )}
                </GridList>
              }
            </div>
        </Route>
      </Switch>
      </Container>
  </Router>
  );
}

export default App;
