import React from "react";
import classNames from "classnames";

interface WrapperProps {
    children?: React.ReactNode;
}
interface FlexWrapperProps {
    children?: React.ReactNode;
    className?: string;
    flex?: boolean;
}

interface FillerProps extends FlexWrapperProps {
    height?: number;
    width?: number;
    color?: string;
    offset?: [number, number];
    style?: React.CSSProperties;
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

export interface ButtonProps extends FlexWrapperProps {
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    style?: React.CSSProperties;
}
export function Button({
    children,
    className,
    flex,
    selected,
    onClick,
    style = {},
}: ButtonProps) {
    let wait = Math.random();
    let divStyle: any = { "--boot-wait": `${wait}s`, ...style };
    return (
        <div
            className={classNames("lcars-button", className, {
                flex,
                selected,
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
        "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        "--color": color,
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
    style = {},
}: FillerProps) {
    let divStyle: any = { ...style };
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
    style = {},
}: FillerProps) {
    let divStyle: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
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
    style?: React.CSSProperties;
}
export function Cap({ wide, style = {} }: CapProps) {
    let divStyle: any = { ...style };
    return (
        <div
            className={classNames("lcars-cap", { wide })}
            style={divStyle}
        ></div>
    );
}
