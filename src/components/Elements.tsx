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
}

export function Filler({
    children,
    className,
    flex,
    width,
    height,
    color,
}: FillerProps) {
    let wait = Math.random();
    let style: any = {
        width,
        height,
        "--color": color,
        "--boot-wait": `${wait}s`,
    };
    return (
        <div
            className={classNames("lcars-filler", className, { flex })}
            style={style}
        >
            {children}
        </div>
    );
}

export interface ButtonProps extends FlexWrapperProps {
    selected?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}
export function Button({
    children,
    className,
    flex,
    selected,
    onClick,
}: ButtonProps) {
    let wait = Math.random();
    let style: any = { "--boot-wait": `${wait}s` };
    return (
        <div
            className={classNames("lcars-button", className, {
                flex,
                selected,
            })}
            style={style}
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
}: FillerProps) {
    let style: any = {
        "--local-height": height && `${height}px`,
        "--local-width": width && `${width}px`,
        "--color": color,
    };
    return (
        <div
            className={classNames("lcars-buttonrow", className, { flex })}
            style={style}
        >
            {children}
        </div>
    );
}
export function ButtonCol({ children, className, flex }: FillerProps) {
    return (
        <div className={classNames("lcars-buttoncol", className, { flex })}>
            {children}
        </div>
    );
}

export function Gap({ children, className, flex, width, height }: FillerProps) {
    let style: any = {
        height: height && `${height}px`,
        width: width && `${width}px`,
    };
    return (
        <div
            className={classNames("lcars-gap", className, { flex })}
            style={style}
        >
            {children}
        </div>
    );
}

interface CapProps {
    wide?: boolean;
}
export function Cap({ wide }: CapProps) {
    return <div className={classNames("lcars-cap", { wide })}></div>;
}
