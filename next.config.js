const makeWithMDX = require("@next/mdx");

const withMDX = makeWithMDX();

const isProd = process.env.NODE_ENV === "production";

module.exports = withMDX({
    output: "export",
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    basePath: isProd ? "/yalu" : undefined,
});
