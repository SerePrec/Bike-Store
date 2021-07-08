import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonScroll from "./components/ButtonScroll";
import Cart from "./pages/Cart";
import CartContextProvider from "./context/CartContext";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import SearchItemListContainer from "./pages/SearchItemListContainer";
import { useDollar } from "./hooks/useDollar";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import "./App.scss";

//********* */
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";

function App() {
  const { dollar } = useDollar();

  return (
    <Router>
      <ScrollToTop />
      <CartContextProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home dollar={dollar} />
          </Route>
          <Route exact path="/category/:catId">
            <SearchItemListContainer />
          </Route>
          <Route exact path="/search">
            <SearchItemListContainer />
          </Route>
          <Route exact path="/item/:itemId">
            <ItemDetailContainer />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/myaccount">
            <MyAccount />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </CartContextProvider>
      <Footer />
      <ButtonScroll />
    </Router>
  );
}

export default App;
