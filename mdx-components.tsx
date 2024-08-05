import React from "react";
import type { MDXComponents } from "mdx/types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { railscasts } from "react-syntax-highlighter/dist/cjs/styles/hljs";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Allows customizing built-in components, e.g. to add styling.
        pre: ({ children, ...props }) => {
            if (typeof children === "object")
                children = (children as any).props.children;
            return (
                <SyntaxHighlighter
                    language="xml"
                    style={railscasts}
                    className="code"
                    useInlineStyles
                    wrapLongLines
                    customStyle={{
                        overflow: "visible",
                    }}
                >
                    {children}
                </SyntaxHighlighter>
            );
            return (
                <div className="code flex">
                    <pre {...props}>{children}</pre>
                </div>
            );
        },
        ...components,
    };
}
