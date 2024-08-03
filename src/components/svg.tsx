import React from "react";
import { ngon } from "./core";

interface NGonProps extends React.SVGProps<SVGPolygonElement> {
    n: number;
    cx?: number;
    cy?: number;
    r?: number;
    a?: number;
    q?: number;
}
export function NGon({
    n,
    q = 1,
    cx = 0,
    cy = 0,
    a = 0,
    r = 0,
    ...props
}: NGonProps) {
    let points = ngon(n, r, a)
        .map(({ x, y }) => `${cx + x},${cy + y}`)
        .join(" ");

    return <polygon points={points} {...props} />;
}
