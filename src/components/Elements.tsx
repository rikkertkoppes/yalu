import React from "react";
import classNames from "classnames";
import { CommonProps, getStyleProps } from "./commonProps";

interface FillerProps extends CommonProps {
    offset?: [number, number];
    children?: React.ReactNode;
    gap?: number;
}

export function Filler(props: FillerProps) {
    let wait = Math.random();
    let { children, offset } = props;
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--boot-wait": `${wait}s`,
        transform: offset && `translate(${offset[0]}px, ${offset[1]}px)`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-filler h", className)}
            style={divStyle}
        >
            {children}
        </div>
    );
}

export function Cutout(props: FillerProps) {
    let { children, offset } = props;
    let wait = Math.random();
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--boot-wait": `${wait}s`,
        "--local-height": style.height && `${style.height}px`,
        transform: offset && `translate(${offset[0]}px, ${offset[1]}px)`,
        ...style,
    };
    return (
        <div className={classNames("lcars-cutout", className)} style={divStyle}>
            {children}
        </div>
    );
}

export interface ButtonProps extends CommonProps {
    id?: string;
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    outline?: boolean;
    rounded?: boolean | "left" | "right";
    children?: React.ReactNode;
}
export function Button(props: ButtonProps) {
    let {
        id,
        children,
        selected,
        onClick,
        outline = false,
        rounded = false,
    } = props;
    let wait = Math.random();
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--local-height": style.height && `${style.height}px`,
        "--button-color": style["--color"],
        "--boot-wait": `${wait}s`,
        ...style,
    };
    let roundclass = "";
    switch (rounded) {
        case "left":
            roundclass = "rounded-left";
            break;
        case "right":
            roundclass = "rounded-right";
            break;
        case true:
            roundclass = "rounded";
            break;
    }
    return (
        <div
            id={id}
            className={classNames("lcars-button h", className, roundclass, {
                selected,
                outline,
            })}
            style={divStyle}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function Row(props: FillerProps) {
    let { gap, children } = props;
    let { style, className } = getStyleProps(props);
    let { width, height } = style;
    let divStyle: any = {
        "--local-height": (height && `${height}px`) || (props.flex && "auto"),
        "--local-width": width && `${width}px`,
        "--button-color": style["--color"],
        gap: gap && `${gap}px`,
        ...style,
    };
    return (
        <div className={classNames("lcars-row h", className)} style={divStyle}>
            {children}
        </div>
    );
}
export function Col(props: FillerProps) {
    let { gap, children } = props;
    let { style, className } = getStyleProps(props);
    let { width, height } = style;
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        // "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        "--button-color": style["--color"],
        gap: gap && `${gap}px`,
        ...style,
    };
    return (
        <div className={classNames("lcars-col v", className)} style={divStyle}>
            {children}
        </div>
    );
}
export function Stack(props: FillerProps) {
    let { children } = props;
    let { style, className } = getStyleProps(props);
    let { width, height } = style;
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        // "--button-color": style["--color"],
        ...style,
    };
    return (
        <div className={classNames("lcars-stack", className)} style={divStyle}>
            {children}
        </div>
    );
}

export function Gap(props: FillerProps) {
    let { children, offset } = props;
    let { style, className } = getStyleProps(props);
    let { height } = style;
    let ref = React.useRef<HTMLSpanElement>(null);
    let divStyle: any = {
        "--text-color": style["--color"],
        "--local-height": height && `${height}px`,
        transform: offset && `translate(${offset[0]}px, ${offset[1]}px)`,
        ...style,
    };
    React.useLayoutEffect(() => {
        if (ref.current && ref.current.parentElement) {
            let { height } = ref.current.parentElement.getBoundingClientRect();
            ref.current.style.setProperty("--local-height", `${height}px`);
        }
    });
    let content = ["string", "number"].includes(typeof children) ? (
        <span ref={ref}>{children}</span>
    ) : (
        children
    );
    return (
        <div className={classNames("lcars-gap h", className)} style={divStyle}>
            {content}
        </div>
    );
}

interface CapProps extends CommonProps {
    wide?: boolean;
    children?: React.ReactNode;
    r?: number;
}
export function Cap(props: CapProps) {
    let { wide, children } = props;
    let { style, className } = getStyleProps(props);
    let { height } = style;
    let divStyle: any = {
        "--button-color": style["--color"],
        "--local-height": height && `${height}px`,
        "--r": props.r && `${props.r}px`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-cap h", className, { wide })}
            style={divStyle}
        >
            {children}
        </div>
    );
}

interface GridProps extends CommonProps {
    rows?: number;
    cols?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}
export function Grid(props: GridProps) {
    let { rows, cols, strokeWidth = 1, children } = props;
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--rows": rows || 1,
        "--cols": cols || 1,
        "--sw": strokeWidth && `${strokeWidth}px`,
        ...style,
    };
    return (
        <div className={classNames("lcars-grid", className)} style={divStyle}>
            {children}
        </div>
    );
}

interface GraphProps extends CommonProps {
    values: number[];
    min?: number;
    max?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
    dashed?: boolean;
    dotted?: boolean;
}
export function Graph(props: GraphProps) {
    let { values, min, max, strokeWidth = 1, dashed, dotted, children } = props;
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--sw": strokeWidth && `${strokeWidth}px`,
        ...style,
    };
    min = min || 0;
    max = max || Math.max(...values);
    let points = values
        .map((y, i) => {
            let x = (100 * i) / (values.length - 1);
            y = 100 - (100 * (y - min!)) / (max! - min!);
            return `${x},${y}`;
        })
        .join(" ");
    return (
        <svg
            className={classNames("lcars-graph", className, { dashed, dotted })}
            style={divStyle}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <polyline points={points} />
            {children}
        </svg>
    );
}

interface BarProps extends CommonProps {
    value: number;
    type?: "blob" | "flat" | "square";
    label?: string;
    direction?: "v" | "h";
    steps?: number;
}
export function Bar(props: BarProps) {
    let { value, type = "blob", direction = "v", steps } = props;
    let v = direction === "v";
    steps = steps ?? (v ? 10 : 20);
    let { style, className } = getStyleProps(props);
    let divStyle = {
        ...style,
    };

    let bf = value / 100; // bar fraction
    let nf = 1 - bf; // no bar fraction

    let dim = v ? "height" : "width";
    let bs = `${100 * bf}%`;
    let ns = `${100 * nf}%`;
    let bt = `${100 / steps / bf}%`;
    let nt = `${100 / steps / nf}%`;
    return (
        <div
            className={classNames(
                "lcars-bar",
                direction,
                "lcars-" + type,
                className
            )}
            style={divStyle}
        >
            <div style={{ [dim]: bs, "--step": bt } as any} />
            <div style={{ [dim]: ns, "--step": nt } as any} />
        </div>
    );
}

/** create an array with numbers from 0 to n */
function range(n: number) {
    return Array(n)
        .fill(0)
        .map((_, i) => i);
}

type ArrayRenderFunction<R, C> = (rc: {
    r: R;
    c: C;
    rowIndex: number;
    colIndex: number;
}) => React.ReactNode;
interface ArrayProps<R extends number | any[], C extends number | any[]>
    extends CommonProps {
    rows?: R;
    cols?: C;
    children?:
        | React.ReactNode
        | ArrayRenderFunction<
              R extends Array<infer I> ? I : number,
              C extends Array<infer I> ? I : number
          >;
    gap?: number;
}
function ArrayView<R extends number | any[], C extends number | any[]>(
    props: ArrayProps<R, C>
) {
    let { children, rows = 1, cols = 1 } = props;
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        gap: props.gap && `${props.gap}px`,
        ...style,
    };
    let rs: any[] = Array.isArray(rows) ? rows : range(rows);
    let cs: any[] = Array.isArray(cols) ? cols : range(cols);

    if (typeof children === "function") {
        let renderChild = children;
        let cells: React.ReactNode[] = [];
        for (let r = 0; r < rs.length; r++) {
            for (let c = 0; c < cs.length; c++) {
                cells.push(
                    <div
                        key={`${r}-${c}`}
                        style={{
                            gridRow: r + 1,
                            gridColumn: c + 1,
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "stretch",
                        }}
                    >
                        {renderChild({
                            r: rs[r],
                            c: cs[c],
                            rowIndex: r,
                            colIndex: c,
                        })}
                    </div>
                );
            }
        }
        children = cells;
    }
    return (
        <div className={classNames("lcars-array", className)} style={divStyle}>
            {children}
        </div>
    );
}

export { ArrayView as Array };

/**
 * TODO: axis: use array helper and min and max per axis
 */
type Corner = "tl" | "tc" | "tr" | "cl" | "cc" | "cr" | "bl" | "bc" | "br";
interface ConnectorProps {
    from: string;
    to: string;
    fromCorner?: Corner;
    toCorner?: Corner;
    strokeWidth?: number;
    direction?: "vh" | "hv";
    children?: React.ReactNode;
    color?: string;
}

function getPosition(el: HTMLElement, corner: Corner) {
    let bb = el.getBoundingClientRect();
    switch (corner) {
        case "tl":
            return [bb.left, bb.top];
        case "tc":
            return [bb.left + bb.width / 2, bb.top];
        case "tr":
            return [bb.right, bb.top];
        case "cl":
            return [bb.left, bb.top + bb.height / 2];
        case "cc":
            return [bb.left + bb.width / 2, bb.top + bb.height / 2];
        case "cr":
            return [bb.right, bb.top + bb.height / 2];
        case "bl":
            return [bb.left, bb.bottom];
        case "bc":
            return [bb.left + bb.width / 2, bb.bottom];
        case "br":
            return [bb.right, bb.bottom];
    }
}

export function Connector(props: ConnectorProps) {
    let {
        fromCorner = "cc",
        toCorner = "cc",
        color = "var(--color)",
        strokeWidth: sw = 1,
        direction = "vh",
    } = props;
    let [shape, setShape] = React.useState<React.ReactNode>(null);

    const reposition = () => {
        let fromEl = document.getElementById(props.from);
        let toEl = document.getElementById(props.to);
        if (!fromEl || !toEl) return;
        let from = getPosition(fromEl, fromCorner);
        let to = getPosition(toEl, toCorner);
        let pos = [Math.min(from[0], to[0]), Math.min(from[1], to[1])];
        let size = [Math.abs(from[0] - to[0]), Math.abs(from[1] - to[1])];
        let vh = direction === "vh";
        let useRight = vh !== from[0] < to[0];
        let useTop = vh !== from[1] < to[1];
        let border = [
            useTop ? color : "transparent",
            useRight ? color : "transparent",
            useTop ? "transparent" : color,
            useRight ? "transparent" : color,
        ];
        setShape(
            <div
                style={{
                    position: "fixed",
                    border: `${sw}px solid transparent`,
                    left: pos[0],
                    top: pos[1],
                    width: size[0],
                    height: size[1],
                    borderColor: border.join(" "),
                    boxSizing: "border-box",
                }}
            ></div>
        );
    };

    React.useEffect(() => {
        reposition();
        window.addEventListener("resize", reposition);
        return () => window.removeEventListener("resize", reposition);
    }, [fromCorner, toCorner, props.from, props.to]);
    return <>{shape}</>;
}
