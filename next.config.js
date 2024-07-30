const makeWithMDX = require("@next/mdx");

const withMDX = makeWithMDX();

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
