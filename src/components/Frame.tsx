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
        TopLeft,
        TopRight,
        BottomLeft,
        BottomRight,
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
    ir?: number;
    or?: number;
    color?: string;
    height?: number;
    width?: number;
}
export function Frame({
    children,
    className,
    top,
    right,
    bottom,
    left,
    flex,
    width,
    height,
    border = [],
    padding,
    ir,
    or,
    innerradius = ir,
    outerradius = or,
    color,
}: FrameProps) {
    let childElements = new Array<React.ReactNode>().concat(children);
    let specials = childElements.filter(isSpecial);
    let regulars = childElements.filter((c) => !specials.includes(c));
    let [t, r, b, l] = parsePadding(border);
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
                    width,
                    height,
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

interface SideProps {
    children?: React.ReactNode;
    startSpace?: number;
    endSpace?: number;
}
export function Top({ children, startSpace, endSpace }: SideProps) {
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    return (
        <div className="lcars-frametop lcars-buttonrow" style={style}>
            {children}
        </div>
    );
}
export function Right({ children, startSpace, endSpace }: SideProps) {
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    return (
        <div className="lcars-frameright lcars-buttoncol" style={style}>
            {children}
        </div>
    );
}
export function Bottom({ children, startSpace, endSpace }: SideProps) {
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    return (
        <div className="lcars-framebottom lcars-buttonrow" style={style}>
            {children}
        </div>
    );
}
export function Left({ children, startSpace, endSpace }: SideProps) {
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    return (
        <div className="lcars-frameleft lcars-buttoncol" style={style}>
            {children}
        </div>
    );
}

interface CornerProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
}

export function TopLeft({ color, ...props }: CornerProps) {
    let style: any = { "--color": color };
    return <div className="lcars-frametopleft" style={style} {...props}></div>;
}
export function TopRight({ color, ...props }: CornerProps) {
    let style: any = { "--color": color };
    return <div className="lcars-frametopright" style={style} {...props}></div>;
}
export function BottomLeft({ color, ...props }: CornerProps) {
    let style: any = { "--color": color };
    return (
        <div className="lcars-framebottomleft" style={style} {...props}></div>
    );
}
export function BottomRight({ color, ...props }: CornerProps) {
    let style: any = { "--color": color };
    return (
        <div className="lcars-framebottomright" style={style} {...props}></div>
    );
}
export function Art({ children }) {
    return <div className="lcars-frameart buttoncol">{children}</div>;
}
