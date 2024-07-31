import React from "react";
import classNames from "classnames";
import { LayoutProps, StyleProps } from "./commonProps";

interface FillerProps extends LayoutProps, StyleProps {
    offset?: [number, number];
    children: React.ReactNode;
}

export function Filler({
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
            className={classNames("lcars-filler", className, { flex })}
            style={divStyle}
        >
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

export interface ButtonProps extends LayoutProps, StyleProps {
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    outline?: boolean;
    rounded?: boolean;
    children: React.ReactNode;
}
export function Button({
    height,
    width,
    children,
    className,
    flex,
    selected,
    onClick,
    color,
    style = {},
    outline = false,
    rounded = false,
}: ButtonProps) {
    let wait = Math.random();
    let divStyle: any = {
        width,
        height,
        "--button-color": color,
        "--boot-wait": `${wait}s`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-button", className, {
                flex,
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

interface GridProps extends LayoutProps, StyleProps {
    rows?: number;
    cols?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}
export function Grid({
    width,
    height,
    flex,
    rows,
    cols,
    color,
    strokeWidth = 1,
    style,
    className,
    children,
}: GridProps) {
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        "--rows": rows || 1,
        "--cols": cols || 1,
        "--color": color,
        "--sw": strokeWidth && `${strokeWidth}px`,
        ...style,
    };
    return (
        <div
            className={classNames("lcars-grid", className, { flex })}
            style={divStyle}
        >
            {children}
        </div>
    );
}

interface GraphProps extends LayoutProps, StyleProps {
    values: number[];
    min?: number;
    max?: number;
    strokeWidth?: number;
    children?: React.ReactNode;
}
export function Graph({
    width,
    height,
    flex,
    values,
    min,
    max,
    color,
    strokeWidth = 1,
    style,
    className,
    children,
}: GraphProps) {
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
        "--color": color,
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
            className={classNames("lcars-graph", className, { flex })}
            style={divStyle}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <polyline points={points} />
            {children}
        </svg>
    );
}
