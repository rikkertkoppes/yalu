import React from "react";

import "./index.css";
import "../css/index.css";

function MyApp({ Component, pageProps }: any) {
    return <Component {...pageProps} />;
}

export default MyApp;
