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

function isN(n: any): n is number {
    return typeof n === "number";
}

interface FrameProps {
    children?: React.ReactNode;
    className?: string;
    top?: boolean | number;
    right?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    flex?: boolean | number;
    padding?: number;
    ri?: number;
    ro?: number;
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
    padding,
    ri,
    ro,
    color,
}: FrameProps) {
    let noSides = [top, right, bottom, left].every((s) => s === undefined);
    if (noSides) {
        top = right = bottom = left = true;
    }
    let childElements = new Array<React.ReactNode>().concat(children);
    let specials = childElements.filter(isSpecial);
    let regulars = childElements.filter((c) => !specials.includes(c));
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
                    "--bt": isN(top) && `${top}px`,
                    "--bl": isN(left) && `${left}px`,
                    "--bb": isN(bottom) && `${bottom}px`,
                    "--br": isN(right) && `${right}px`,
                    "--ri": isN(ri) && `${ri}px`,
                    "--ro": isN(ro) && `${ro}px`,
                    "--content-padding": padding && `${padding}px`,
                    flex: isN(flex) && `${flex} 1 0%`,
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
