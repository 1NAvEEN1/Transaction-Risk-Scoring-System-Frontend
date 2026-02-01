import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import store from "./app/store";
import { lazy } from "react";
import ThemeProvider from "./theme";
import Loadable from "./components/Loadable/Loadable";
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";

//----------------------import Pages-----------------------------//
const Layout = Loadable(lazy(() => import("./layout/Layout")));
const Dashboard = Loadable(lazy(() => import("./pages/Dashboard/Dashboard")));
const SubmitTransaction = Loadable(
  lazy(() => import("./pages/SubmitTransaction/SubmitTransaction")),
);
const TransactionDetails = Loadable(
  lazy(() => import("./pages/TransactionDetails/TransactionDetailsDialog")),
);
const RiskRules = Loadable(lazy(() => import("./pages/RiskRules/RiskRules")));

//--------------------------------------------------------------//

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "submit",
        element: <SubmitTransaction />,
      },
      {
        path: "transaction/:id",
        element: <TransactionDetails />,
      },
      {
        path: "rules",
        element: <RiskRules />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SuccessMessage />
        <LoadingAnimation />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};


App.propTypes = {};

export default App;
