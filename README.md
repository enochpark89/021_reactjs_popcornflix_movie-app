# Nomflix

-  An app that introduces movies to users.
-  This app is created with react.js.

# Project plan

## Screens

-  [ ] Home
-  [ ] TV shows
-  [ ] Search
-  [ ] Detail - click in the movies to see details.

## Prerequisite Knowledge:

1. Arrow Function
2. Template Literal
3. Object Destructuring
4. Spread Operator
5. Classes
6. Array map
7. Array filter

# Progress Report

# 1.0 Project Setup

-  Use npx because it doesn't require you to create reactjs in your computer.

1. run _npm install npx_ to install npx. With npx, this is going to install everything that we need to utilize react.js and going to delete when the app is finished.
2. run _npx create-react-app ._ to create a react app in the current directory. Otherwise, you can specify that path.
3. create .env file > write NODE_PATH=src
4. run _install prop-types_ to install prop-types

# 1.1 Router

1. set up .env file and write "NODE_MODULE=src" and React will search app to find files.
2. Create a _Component_ folder and paste App.js
3. Create a _Router_ folder and set up routes.
4. Create files Home.js, Search.js, TV.js, Detail.js
5. Install react-router to route users into different files or pages. > Run _npm install react-router-dom_
6. After installing, you have to import the router. There are HashRouter and BrowserRouter.
7. When you implement the Router, you have include the component that you want users to be routed to.
8. Also, in App.js, you have to return components. Since you can't import more than one component, you can use <></> as below - I am not doing this for now.
9. In Router.js, include three more routes. There should be four routing paths to Home.js,Detail.js, Search.js, and TV.js
10.   _HashRouter_ will create # inside the URL. Therefore, it is better to use **BrowserRouter** if you do not want to see this Hashtag symbol.
      router.js:

```
export default () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/tv" exact component={TV} />
    <Route path="/search" exact component={Search} />
  </Router>
);
```

11. **Composition**: Composition is a way to render two or more routes at the same time.
12. As long as you have the matching URL, React will render them in the same page.
    For example, below code will render both /tv component and /tv/popular components in the page "/tv/popular.
    Router.js:

```
  <Route path="/tv" component={TV} />
  <Route path="/tv/popular" render={() => <h1>Popular</h1>} />
```

13. Now, create Components/Header.js
14. This Header will have few links that routes users to different pages like a menu bar.
15. IF you set the Redirect at the end of your Routes, it will route the user to Redirect's destination if users are not routed to any of the Routes.
16. Redirect must be used along with Switch.
17. This way, when people try to input URL that is not within the route such as "/giberish", they will be routed to HOME instead.

# 1.2 Styles

## 1.2a CSS

There are generally three way to style Header.js component.

1. Create style.css and import.
   or Make a folder in the Components folder > Create .css, .js, and .index.
2. Use **CSS module**: you can use the CSS module in React but it will make the className random.
   Header.js:
3. Styled Component

#2: CSS module

App.js:

```javascript
import React from "react";
import styles from "./Header.module.css";

export default () => (

  <header>
    <ul className={styles.navList}>
      <li>
        <a href="/">Movies</a>
      </li>
  <header>
```

Header.module.css:

```css
.navList {
   display: flex;
}

.navList:hover {
   background-color: blue;
}
```

-  The CSS name has to be <name>.module.css and then, import it in .js file.
-  Cons: you have to memorize the className; the ClassName is going to be randomized. You always have to write className.

-  This is perfect for tiny projects.

#3. Styled Components

Steps:
a. Run _npm install styled-components_ to install styled-component package.
b.Import styled-component in Header.js.
c. you can declare a style within the component and use that element as below:

```javascript
import styled from "styled-components";

// initiate a styled-component named "List"
const List = styled.ul`
   display: flex;
   &:hover {
      background-color: blue;
   }
`;

// use the <List> as if you would use for HTML element and it will contain styled that you declared in it.
export default () => (
   <header>
      <List>
         <li>
            <a href="/">Movies</a>
         </li>
         <li>
            <a href="/tv">TV</a>
         </li>
         <li>
            <a href="/search">Search</a>
         </li>
      </List>
   </header>
);
```

e. you can create as much components you want with different syles in it.
f. you can use {Link} from "react-router-dom" to replace anchor.
g. Once you create bunch of components and use it, it will create random className.

_Tip:Since you can't use "Link" outside the Router, include "Header" inside the router._

## 1.3b GlobalStyles

-  Styled-Components are local. We need to set up a Global-Components for later uses.

Steps:

1. Create a new file name _GlobalStyles.js_ in a folder Components.
2. Import style reset (reset all styles to default) - Run _npm install styled-reset_
3. Style a{}, \*{} and body{}
   GlobalStyle.js:

```javascript
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        background-color:rgba(20, 20, 20, 1);
        color:white;
        padding-top:50px;
    }
`;

export default globalStyles;
```

4. Import the globalstyle in the App.js.
5. the Globalstyle is now applied on the website and the background is black.
6. Change the CSS of the header.js

## 1.3c Location aware Header.

-  Give Header Props:

Step:

1. Give Header a prop.
2. On Styled-Component, you can give props to your components.

```javascript
const Item = styled.li`
   width: 80px;
   height: 50px;
   text-align: center;
    // pass props and if the props is TRUE, change the color of the border-bottom.
   border-bottom: 5px solid
      ${(props) => (props.current ? "#3498db" : "transparent")};
`;
<Item current={true}>
```

-  Make Header aware of the routes.

Step:

1. Import _withRouter_ from "react-router-dom" package.
2. Thanks to withRouter, the Router is sending props to the Header.js. The props contain information regarding the current URL.

In Header.js

```javascript
// Use withRouter to get the props and a variable called pathname that shows the current URL.
export default withRouter(({ location: { pathname } }) => (
   <Header>
      <List>
         // Compare the current pathname with hypothetical path > set current
         variable to true > Change border-bottom color.
         <Item current={pathname === "/"}>
            <SLink to="/">Movies</SLink>
         </Item>
         <Item current={pathname === "/tv"}>
            <SLink to="/tv">TV</SLink>
         </Item>
         <Item current={pathname === "/search"}>
            <SLink to="/search">Search</SLink>
         </Item>
      </List>
   </Header>
));
```

3. As a result, when the user click on the list, it will change the border-bottom color and indicate which page that they are in.

# 1.4 Network

-  Data is going to be coming from Movie API database.
-  The Movie DB has an API.
-  Once you have the authentication key, using that key, you can get the Data from the websites using API.
-  Data is offered as JSON file which is _easy to navigate_ unlike HTML tags.

## 1.4a Axios

### API verbs

-  [ ] Now playing (Movie)
-  [ ] Upcoming (Movie)
-  [ ] Top Rated (TV, Movie)
-  [ ] Popular (TV, Movie)
-  [ ] Airing Today (TV)

-  Normally, we use fetch the get the data from the website.
-  Fetch is not efficient because some of the URL remains the same for getting different data.
-  Install axios: run _npm install axios_
-  you can set the baseURL so that you don't have to type that everytime.
-  parameter is going to be the rest of the URL.

-  Create a directory src/api.js and import axios and create one API request as below.

api.js:

```javascript
import axios from "axios";

const api = axios.create({
   baseURL: "https://api.themoviedb.org/3/",
   params: {
      api_key: "10923b261ba94d897ac6b81148314a3f",
      language: "en-US",
   },
});

export default api;
```

## 1.4b. API

-  once **api** constant is created with axios, you can create a new const to get datas as below. Please notice that you do not have to put in the whole URL for different datas. you just need to state the different part thanks to axios :)

```js
// movieApi hold three properties that receives data from movieDB API using axios api constant.
export const moviesApi = {
   nowPlaying: () => api.get("movie/now_playing"),
   upcoming: () => api.get("movie/upcoming"),
   popular: () => api.get("movie/popular"),
};
```

-  Some API requires putting the id.

```

```

-  Some API comes with append_to_response. It demands a response of videos or images.

   -  trailer video
   -  posters
   -  images.
      api.js:

```js
   movieDetail: (id) =>
      api.get(`movie/${id}`, {
         params: {
            append_to_response: "videos",
         },
      }),
```

-  For this particular example, it gives a key of a youtube video that shows the trailer video.
-  MovieDB also has search API. It could search TV and Movies.

```js
   search: (term) =>
      api.get("search/movie", {
         params: {
            query: encodeURIComponent(term),
         },
      }),
```

# 1.5 Containers

## 1.5a Container Presenter Pattern

-  We need to have three pages displaying different API data results.
-  Normally, you use class component and state to render API data. This works when your application is tiny.
   -  Class compoenent and State > Mount > render data.
-  **Container-Presenter pattern**: Container contains data, state, API, process data. Presenter shows and presents the data that has been processed but it does not have any information about the API and data. It simply receives the data and present it.

**Folder structure**:

-  Routes
   -  Home
      -  HomePresenter.js
      -  HomeContainer.js

HomeContainer.js:

Steps:

1. import React and HomePresenter.
2. State creates 5 different properties that will be used in the React.Component.

```js
export default class extends
React.Component {
   state = {
      nowPlaying: null,
      upcoming: null,
      popular: null,
      error: null,
      loading: true,
   };
```

3. render() takes 5 properties in this.state and use them to assign values that we received from the API.

```js
   render() {
      const { nowPlaying, upcoming, popular, error, loading } = this.state;
      return (
         <HomePresenter
            nowPlaying={nowPlaying}
            upcoming={upcoming}
            popular={popular}
            error={error}
            loading={loading}
         />
      );
   }
```

-  Do the same for the rest of the pages

   -  Detail
   -  Search
   -  TV

-  Search is a bit trickier because it requires some interactivity.
   -  loading false > Search enter > loading true > put the results.

## 1.5b Home Container

-  We can now work on Home Container in detail.
-  Between state and render, you create componentDidMount() that transfer the API data to the Container.
-  try...catch...finally.

HomeContainer.js:

```js
   async componentDidMount() {
      try {
         const {
            data: { results: nowPlaying },
         } = await moviesApi.nowPlaying();
         // setState with assigning nowPlaying variable with API nowPlaying data.
         this.setState({
            nowPlaying,
         });
      } catch {
         this.setState({
            error: "Can't find movies information",
         });
      } finally {
         this.setState({
            loading: false,
         });
      }
   }
```

-  **async...await**: needs to be used because it might take some time to get the data. If React continues on to the next code, it might ignore the data even if the data is retrieved later.

-  _Async needs to be used along with await or it is not going to work._

## 1.5c TV Container.

-  TV container is similar with the Home container. Therefore, we will skip the details. Please refer to the code below:
   -  Import tvApi from api.js
   -  Create compoenetDidMount() to retrieve the data from API.
   -  setState()

```js
   async componentDidMount() {
      try {
         const {
            data: { results: topRated },
         } = await tvApi.topRated();
         const {
            data: { results: popular },
         } = await tvApi.popular();
         const {
            data: { results: airingToday },
         } = await tvApi.airingToday();
         this.setState({ topRated, popular, airingToday });
      } catch {
         this.setState({
            error: "Can't find TV information.",
         });
      } finally {
         this.setState({ loading: false });
      }
   }
```

## 1.5d Search Container

**Search container logic:**

1. Handle submit > Check the search term is not blank

```js
const { searchTerm } = this.state;
if (searchTerm !== "") {
   this.searchByTerm();
}
```

2. Get the searchTerm > Find related information > Display the information retrieved.

```js
  searchByTerm = async () => {
      const { searchTerm } = this.state;
      this.setState({ loading: true });
      try {
         // Use the searchTerm to request for Search API grab the results.
         const {
            data: { results: movieResults },
         } = await moviesApi.search(searchTerm);
         const {
            data: { results: tvResults },
         } = await tvApi.search(searchTerm);

         // Set the State and assign API data to currentState variables.
         this.setState({
            movieResults,
            tvResults,
         });
      } catch {
         this.setState({ error: "Can't find results." });
      } finally {
         this.setState({ loading: false });
      }
   };
   render() {
      const { movieResults, tvResults, searchTerm, loading, error } =
         this.state;
      return (
         <SearchPresenter
            movieResults={movieResults}
            tvResults={tvResults}
            searchTerm={searchTerm}
            loading={loading}
            error={error}
            handleSubmit={this.handleSubmit}
         />
      );
   }
```

-  Set the route for the Detail pages. The user will have options to choose either a movie or a TV show. Once they make a selection, we will route them to different detail pages such as /movie or /show and create a unique pages based on the movie ID that they clicked.

Router.js

```js
<Route path="/movie/:id" component={Detail} />
<Route path="/show/:id" component={Detail} />
```

## 1.5e Detail Container

-  Header component was aware of the location of our router because we were decorating it with withRouter funciton.
-  We do not have to do this with detail because by deafult, React router is going to give all the information to the routes by giving props.
   -  Test: When you console.log(this.props) from the Detail Container, we may view the information that was sent from the router.

Set up Detail Container:

Steps:

1. Find out whether you are in /movie or /show because both goes to the same component.
2. We need to know the numbers in the props.

-  props.match.params contains id that we can extract.

-  With props, you can do goBack, goForward etc.

```js
// gets the id from this.props.
async componentDidMount() {
   const {
      match: {
         params: { id },
      },
      history: { push },
   } = this.props;

   // parse id from string to int.
   const parsedId = parseInt(id);
   // check for null. If null, send users to home("/").
   if (isNaN(parsedId)) {
      return push("/");
   }
}
```

-  Get the path from this.prop and check whether it includes() _movie_ or _show_.
-  We can set up a constructor for props also.

```js
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }
```

-  ComponentDidMount() will check the pathname and if it is a movie, it will get the data from the movieDetail API. If it is not a movie, it will get TVApi.

ComponentDidMount():

```js
let result = null;
try {
   if (isMovie) {
      const request = await moviesApi.movieDetail(parsedId);
      result = request.data;
   } else {
      const request = await tvApi.showDetail(parsedId);
      result = request.data;
   }
} catch {
   this.setState({ error: "Can't find anything." });
} finally {
   this.setState({ loading: false, result });
}
```

_Tip: result.data is same as {data: result} in JS by the same token as deconstructuring (const {value} trick)_
