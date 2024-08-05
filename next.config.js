const makeWithMDX = require("@next/mdx");

const withMDX = makeWithMDX();

const isProd = process.env.NODE_ENV === "production";
console.log("env", process.env.NODE_ENV, isProd);

module.exports = withMDX({
    output: "export",
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    basePath: isProd ? "/yalu" : undefined,
    // basePath: "/yalu",
});
