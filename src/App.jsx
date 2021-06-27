import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./pages/Category";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useCategories } from "./hooks/useCategories";
import { useDollar } from "./hooks/useDollar";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import "./App.scss";

function App() {
  const { categories } = useCategories();

  const { dollar } = useDollar();

  return (
    <Router>
      <Header categories={categories} />
      <Switch>
        <Route exact path="/">
          <Home dollar={dollar} />
        </Route>
        <Route exact path="/category/:catId">
          <Category />
        </Route>
        <Route exact path="/item/:itemId">
          <ItemDetailContainer />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
