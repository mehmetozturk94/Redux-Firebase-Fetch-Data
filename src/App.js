import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(
    () => {
      const sendCartData = async () => {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "sending",
            message: "Sending Cart Data",
          })
        );
        const response = await fetch(
          "https://market-app-5275c-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
        if (!response.ok) {
          throw new Error("Sending Failed");
        }

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success..",
            message: "Sent Cart Data Successfully",
          })
        );
      };

      if(isInitial){
        isInitial = false;  
        return;
      }

      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error..",
            message: "Error Occured",
          })
        );
      });
    },
    [cart],
    dispatch
  );

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
