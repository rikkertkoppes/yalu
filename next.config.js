const makeWithMDX = require("@next/mdx");

const withMDX = makeWithMDX();

module.exports = withMDX({
    output: "export",
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
