import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButtonScroll from "./components/ButtonScroll";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import ItemDetailContainer from "./pages/ItemDetailContainer";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import SearchItemListContainer from "./pages/SearchItemListContainer";
import CartContextProvider from "./context/CartContext";
import SearchesContextProvider from "./context/SearchesContext";
import UserContextProvider from "./context/UserContext";
import { useDollar } from "./hooks/useDollar";
import "./App.scss";

function App() {
  const { dollar } = useDollar();

  return (
    <Router>
      <ScrollToTop />
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <SearchesContextProvider>
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
              <PrivateRoute exact path="/checkout">
                <Checkout />
              </PrivateRoute>
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
          </SearchesContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <Footer />
      <ButtonScroll />
    </Router>
  );
}

export default App;
