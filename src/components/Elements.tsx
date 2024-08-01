import React from "react";
import classNames from "classnames";
import { CommonProps, getStyleProps } from "./commonProps";

interface FillerProps extends CommonProps {
    offset?: [number, number];
    children?: React.ReactNode;
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
        <div className={classNames("lcars-filler", className)} style={divStyle}>
            {children}
        </div>
    );
}

export function Cutout({
    children,
    className,
    flex,
    width,
    height,
    color,
    offset,
    style = {},
}: FillerProps) {
    let wait = Math.random();
    let divStyle: any = {
        width,
        height,
        "--color": color,
        "--boot-wait": `${wait}s`,
        transform: offset && `translate(${offset[0]}px, ${offset[1]}px)`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-cutout", className, { flex })}
            style={divStyle}
        >
            {children}
        </div>
    );
}

export interface ButtonProps extends CommonProps {
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    outline?: boolean;
    rounded?: boolean;
    children: React.ReactNode;
}
export function Button(props: ButtonProps) {
    let {
        children,
        selected,
        onClick,
        outline = false,
        rounded = false,
    } = props;
    let wait = Math.random();
    let { style, className } = getStyleProps(props);
    let divStyle: any = {
        "--button-color": style["--color"],
        "--boot-wait": `${wait}s`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-button", className, {
                selected,
                outline,
                rounded,
            })}
            style={divStyle}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function Row(props: FillerProps) {
    let { children } = props;
    let { style, className } = getStyleProps(props);
    let { width, height } = style;
    let divStyle: any = {
        "--local-height": (height && `${height}px`) || "auto",
        "--local-width": width && `${width}px`,
        "--button-color": style["--color"],
        ...style,
    };
    return (
        <div className={classNames("lcars-row", className)} style={divStyle}>
            {children}
        </div>
    );
}
export function Col(props: FillerProps) {
    let { children } = props;
    let { style, className } = getStyleProps(props);
    let { width, height } = style;
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        // "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        "--button-color": style["--color"],
        ...style,
    };
    return (
        <div className={classNames("lcars-col", className)} style={divStyle}>
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

export function Gap({
    children,
    className,
    flex,
    width,
    height,
    offset,
    style = {},
}: FillerProps) {
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        transform: offset && `translate(${offset[0]}px, ${offset[1]}px)`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-gap", className, { flex })}
            style={divStyle}
        >
            {children}
        </div>
    );
}

interface CapProps {
    wide?: boolean;
    color?: string;
    style?: React.CSSProperties;
}
export function Cap({ wide, color, style = {} }: CapProps) {
    let divStyle: any = {
        "--color": color,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-cap", { wide })}
            style={divStyle}
        ></div>
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
}
export function Graph(props: GraphProps) {
    let { values, min, max, strokeWidth = 1, children } = props;
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
            className={classNames("lcars-graph", className)}
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
    height?: number;
    type?: "blob" | "flat" | "square";
    color?: string;
    label?: string;
    direction?: "v" | "h";
    steps?: number;
}
export function Bar(props: BarProps) {
    let { value, type = "blob", direction = "v", steps } = props;
    let { style, className } = getStyleProps(props);

    let bf = value / 100; // bar fraction
    let nf = 1 - bf; // no bar fraction

    let v = direction === "v";
    steps = steps ?? (v ? 10 : 20);
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
            style={style}
        >
            <div style={{ [dim]: bs, "--step": bt } as any} />
            <div style={{ [dim]: ns, "--step": nt } as any} />
        </div>
    );
}

interface ArrayProps extends CommonProps {
    rows?: number;
    cols?: number;
    children?:
        | React.ReactNode
        | ((rc: { r: number; c: number }) => React.ReactNode);
}
export function Array(props: ArrayProps) {
    let { children, rows = 1, cols = 1 } = props;
    let { style, className } = getStyleProps(props);
    if (typeof children === "function") {
        let renderChild = children as (rc: {
            r: number;
            c: number;
        }) => React.ReactNode;
        let cells: React.ReactNode[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                cells.push(
                    <div
                        key={`${r}-${c}`}
                        style={{
                            gridRow: r + 1,
                            gridColumn: c + 1,
                        }}
                    >
                        {renderChild({ r, c })}
                    </div>
                );
            }
        }
        return (
            <div className={classNames("lcars-array", className)} style={style}>
                {cells}
            </div>
        );
    }
    return (
        <div className={classNames("lcars-array", className)} style={style}>
            {children}
        </div>
    );
}

/**
 * TODO: axis: use array helper and min and max per axis
 */
