import React, { Suspense } from "react";
import PropTypes from "prop-types";

// project import
import Loader from "./Loader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.propTypes = {
    // Props are passed through to the wrapped component
  };

  return LoadableComponent;
};

export default Loadable;
