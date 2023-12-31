import React from "react";
import classNames from "classnames";

function isSpecial(node: React.ReactNode) {
    if (!React.isValidElement(node)) return false;
    if (typeof node.type === "string") return false;
    let specials: React.JSXElementConstructor<any>[] = [
        Top,
        Right,
        Bottom,
        Left,
        BottomLeft,
        Art,
    ];
    return specials.includes(node.type);
}

function parsePadding(padding: number | number[]) {
    let p = padding;
    if (typeof p === "number") {
        p = [p, p, p, p];
    }
    if (p.length === 1) {
        p = [p[0], p[0], p[0], p[0]];
    } else if (p.length === 2) {
        p = [p[0], p[1], p[0], p[1]];
    } else if (p.length === 3) {
        p = [p[0], p[1], p[2], p[1]];
    }
    return p;
}

interface FrameProps {
    children?: React.ReactNode;
    className?: string;
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    flex?: boolean | number;
    border?: number | number[];
    padding?: number;
    innerradius?: number;
    outerradius?: number;
    color?: string;
}
export function Frame({
    children,
    className,
    top,
    right,
    bottom,
    left,
    flex,
    border = [],
    padding,
    innerradius,
    outerradius,
    color,
}: FrameProps) {
    let childElements = new Array<React.ReactNode>().concat(children);
    let specials = childElements.filter(isSpecial);
    let regulars = childElements.filter((c) => !specials.includes(c));
    let [t, r, b, l] = parsePadding(border);
    console.log(childElements);
    return (
        <div
            className={classNames("lcars-frame", className, {
                top,
                right,
                bottom,
                left,
                flex,
            })}
            style={
                {
                    "--size-top": t && `${t}px`,
                    "--size-left": l && `${l}px`,
                    "--size-bottom": b && `${b}px`,
                    "--size-right": r && `${r}px`,
                    "--innerr": innerradius && `${innerradius}px`,
                    "--outerr": outerradius && `${outerradius}px`,
                    "--content-padding": padding && `${padding}px`,
                    flex: typeof flex === "number" && `${flex} 1 0%`,
                    "--color": color,
                } as any
            }
        >
            {specials}
            <div className="lcars-framecontent">{regulars}</div>
        </div>
    );
}

export function Top({ children }) {
    return <div className="lcars-frametop lcars-buttonrow">{children}</div>;
}
export function Right({ children }) {
    return <div className="lcars-frameright lcars-buttoncol">{children}</div>;
}
export function Bottom({ children }) {
    return <div className="lcars-framebottom lcars-buttonrow">{children}</div>;
}
export function Left({ children }) {
    return <div className="lcars-frameleft lcars-buttoncol">{children}</div>;
}

interface CornerProps {
    color?: string;
}
export function BottomLeft({ color }: CornerProps) {
    let style: any = { "--color": color };
    return <div className="lcars-framebottomleft" style={style}></div>;
}
export function BottomRight({ color }: CornerProps) {
    let style: any = { "--color": color };
    return <div className="lcars-framebottomright" style={style}></div>;
}

export function Art({ children }) {
    return <div className="lcars-frameart buttoncol">{children}</div>;
}
