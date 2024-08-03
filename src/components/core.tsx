import React from "react";

function range(n: number) {
    return Array(n)
        .fill(0)
        .map((_, i) => i);
}

export type RepeatRenderFunction<I> = (item: I, i: number) => React.ReactNode;
interface RepeatProps<I extends number | any[]> {
    items?: I;
    children?:
        | React.ReactNode
        | RepeatRenderFunction<I extends Array<infer T> ? T : number>;
}
export function Repeat<I extends number | any[]>({
    items,
    children,
}: RepeatProps<I>) {
    let is: any[] = Array.isArray(items) ? items : range(items ?? 1);
    return (
        <>
            {is.map((item, i) => {
                if (typeof children === "function") {
                    return (
                        <React.Fragment key={i}>
                            {children(item, i)}
                        </React.Fragment>
                    );
                }
                return <React.Fragment key={i}>{children}</React.Fragment>;
            })}
        </>
    );
}

export function ngon(sides: number, radius: number, rotation: number = 0) {
    let ar = (Math.PI * rotation) / 180;
    return range(sides).map((_, i) => {
        let a = (2 * Math.PI * i) / sides + ar;
        return {
            x: Math.sin(a) * radius,
            y: -Math.cos(a) * radius,
        };
    });
}
