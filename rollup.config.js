import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            // {
            //     file: packageJson.module,
            //     format: "esm",
            //     sourcemap: true,
            // },
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                plugins: [postcssImport()],
                include: "src/css/index.css",
                extract: "index.css",
                minimize: true,
            }),
        ],
    },
];
