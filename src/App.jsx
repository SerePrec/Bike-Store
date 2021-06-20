import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonScroll from "./components/ButtonScroll";
import CategoryResults from "./pages/CategoryResults";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import SearchResults from "./pages/SearchResults";
import { useCategories } from "./hooks/useCategories";
import { useDollar } from "./hooks/useDollar";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import "./App.scss";

function App() {
  const { categories } = useCategories();

  const { dollar } = useDollar();

  return (
    <Router>
      <ScrollToTop />
      <Header categories={categories} />
      <Switch>
        <Route exact path="/">
          <Home dollar={dollar} />
        </Route>
        <Route exact path="/category/:catId">
          <CategoryResults />
        </Route>
        <Route exact path="/search">
          <SearchResults />
        </Route>
        <Route exact path="/item/:itemId">
          <ItemDetailContainer />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
      <Footer />
      <ButtonScroll />
    </Router>
  );
}

export default App;
