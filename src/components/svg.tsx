import React from "react";
import { circle } from "./core";

interface RegularProps extends React.SVGProps<SVGPolygonElement> {
    cx?: number;
    cy?: number;
    r?: number;
    a?: number;

    p: number;
    q?: number;
}
export function Regular({
    p,
    q = 1,
    cx = 0,
    cy = 0,
    a = 0,
    r = 0,
    ...props
}: RegularProps) {
    let points = circle(p, r, a)
        .map(({ x, y }) => `${cx + x},${cy + y}`)
        .join(" ");

    return <polygon points={points} {...props} />;
}
