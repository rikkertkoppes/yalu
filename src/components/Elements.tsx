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

export function ButtonRow({
    children,
    className,
    flex,
    height,
    width,
    color,
    style = {},
}: FillerProps) {
    let divStyle: any = {
        "--local-height": (height && `${height}px`) || "auto",
        "--local-width": width && `${width}px`,
        "--button-color": color,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-buttonrow", className, { flex })}
            style={divStyle}
        >
            {children}
        </div>
    );
}
export function ButtonCol({
    children,
    className,
    flex,
    height,
    width,
    color,
    style = {},
}: FillerProps) {
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        // "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        "--button-color": color,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-buttoncol", className, { flex })}
            style={divStyle}
        >
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
