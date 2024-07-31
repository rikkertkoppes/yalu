import React from "react";
import classNames from "classnames";
import { LayoutProps } from "./types";

function isSpecial(node: React.ReactNode) {
    if (!React.isValidElement(node)) return false;
    if (typeof node.type === "string") return false;
    let specials: string[] = [
        Top.name,
        Right.name,
        Bottom.name,
        Left.name,
        TopLeft.name,
        TopRight.name,
        BottomLeft.name,
        BottomRight.name,
        Art.name,
    ];
    return specials.includes(node.type.name);
}

function isN(n: any): n is number {
    return typeof n === "number";
}

interface FrameProps extends LayoutProps {
    children?: React.ReactNode;
    className?: string;
    top?: boolean | number;
    right?: boolean | number;
    bottom?: boolean | number;
    left?: boolean | number;
    padding?: number;
    ri?: number;
    ro?: number;
    color?: string;
    style?: React.CSSProperties;
}

interface SideProps {
    children?: React.ReactNode;
    startSpace?: number;
    endSpace?: number;
}
export function Top({ children, startSpace, endSpace }: SideProps) {
    let cell = useSideCell("top");
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    if (cell) return <Cell cell={cell}>{children}</Cell>;
    return (
        <div className="lcars-frametop lcars-buttonrow" style={style}>
            {children}
        </div>
    );
}
export function Right({ children, startSpace, endSpace }: SideProps) {
    let cell = useSideCell("right");
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    if (cell) return <Cell cell={cell}>{children}</Cell>;
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
    let cell = useSideCell("left");
    let style: any = {
        "--start-space": startSpace && `${startSpace}px`,
        "--end-space": endSpace && `${endSpace}px`,
    };
    if (cell) return <Cell cell={cell}>{children}</Cell>;
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

// new approach for generic composite curves
interface JointProps {
    children?: React.ReactNode;
    ri?: number;
    ro?: number;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    type: string;
    cell?: string;
    row?: number;
    col?: number;
}
const Joint = ({
    children,
    ri,
    ro,
    width,
    height,
    cell,
    style,
    type,
    row,
    col,
}: JointProps) => {
    // content cells are not joints, so skip
    if (type === "cc") return null;
    if (cell) {
        let m = cell?.match(/(\d+|[a-z]+)/gi);
        if (m) {
            row = m[0].toUpperCase().charCodeAt(0) - 64;
            col = parseInt(m[1]);
        }
    }
    let divStyle = {
        "--ri": ri && `${ri}px`,
        "--r0": ro && `${ro}px`,
        "--w": width && `${width}px`,
        "--h": height && `${height}px`,
        gridRow: row,
        gridColumn: col,
        ...style,
    };
    return (
        <div className={`lcars-joint lcars-${type}`} style={divStyle}>
            {children}
        </div>
    );
};

let def = `
g   200  50   8   *   30
8   *   *   *   *   *
*   *   .   *   .   *
8   *   .   *   *   *
`;

def = `
g   *   300 *
20  *   *   .
*   .   *   .
20  .   *   *
`;

def = `
g   *   40  20  40  *
20  *   *   .   *   *
*   .   *   .   *   .
20  *   *   .   *   *
`;

function parseHead(head: string) {
    if (head.match(/\*+/)) return "1fr";
    return head + "px";
}

function getType(l: string, c: string, r: string) {
    if (c === ".") return "c";
    let t = "";
    if (l !== "*") t += "S";
    if (r !== "*") t += "E";
    if (t === "") t = "M";
    if (t === "SE") t = "I";
    return t;
}

function RCtoA1(r: number, c: number) {
    return String.fromCharCode(64 + c + 1) + (r + 1);
}

function A1toRC(a1: string) {
    let m = a1.match(/(\d+|[a-z]+)/gi);
    if (!m) return [0, 0];
    let col = m[0].toUpperCase().charCodeAt(0) - 65;
    let row = parseInt(m[1]) - 1;
    return [row, col];
}

interface CellDef {
    cols: string;
    rows: string;
    // grid: string[][];
    // content: string[][];
    cells: {
        col: number;
        row: number;
        type: string;
        cell: string;
    }[];
}
function parseDef(def: string): CellDef {
    let lines = def
        .trim()
        .split(/[\n/]/)
        .map((r) => r.trim());
    let grid = lines.map((r) => r.split(/\s+/).map((c) => c.trim()));
    let cols = grid[0].slice(1).map(parseHead).join(" ");
    let rows = grid
        .slice(1)
        .map((r) => r[0])
        .map(parseHead)
        .join(" ");
    let content = grid.slice(1).map((r) => r.slice(1));
    let cells = content.map((r, row) =>
        r.map((c, col) => {
            // horizontal type
            let ht = getType(r[col - 1], c, r[col + 1]);
            // vertical type
            let vt = getType(
                content[row - 1]?.[col],
                c,
                content[row + 1]?.[col]
            );
            let type = vt + ht;
            if (type.includes("I")) type = type.replace(/[^I]/g, "X");
            return {
                col,
                row,
                type,
                cell: RCtoA1(row, col),
            };
        })
    );
    cells = cells.map((r, row) =>
        r.map((c, col) => {
            let vt = c.type[0];
            let ht = c.type[1];
            let type = c.type;
            if (vt === "X") {
                //check above and below
                let s = cells[row - 1]?.[col]?.type[0] === "S";
                let e = cells[row + 1]?.[col]?.type[0] === "E";
                switch (true) {
                    case s && e:
                        type = "M" + ht;
                        break;
                    case s:
                        type = "S" + ht;
                        break;
                    case e:
                        type = "E" + ht;
                        break;
                }
            }
            if (ht == "X") {
                //check left and right
                let s = cells[row][col - 1]?.type[1] === "S";
                let e = cells[row][col + 1]?.type[1] === "E";
                switch (true) {
                    case s && e:
                        type = vt + "M";
                        break;
                    case s:
                        type = vt + "S";
                        break;
                    case e:
                        type = vt + "E";
                        break;
                }
            }
            return { ...c, type };
        })
    );

    return { cols, rows, cells: cells.flat() };
}

let CompositeContext = React.createContext<CellDef | null>(null);

function useCellType(cell: string) {
    let ctx = React.useContext(CompositeContext);
    if (!ctx) return "";
    let c = ctx.cells.find((c) => c.cell === cell);
    return c?.type || "";
}

function useSideCell(side: string) {
    let ctx = React.useContext(CompositeContext);
    if (!ctx) return "";
    // last cell gives the grid dimensions
    let last = ctx.cells[ctx.cells.length - 1];
    let center = ctx.cells.find((c) => c.type === "cc");
    if (!center) return "";
    switch (side) {
        case "top":
            return RCtoA1(0, center.col);
        case "right":
            return RCtoA1(center.row, last.col);
        case "bottom":
            return RCtoA1(last.row, center.col);
        case "left":
            return RCtoA1(center.row, 0);
        default:
            return "";
    }
}
interface CellProps {
    cell: string;
    end?: string;
    children?: React.ReactNode;
    padding?: number | string;
    className?: string;
}
export function Cell({ cell, end, children, padding, className }: CellProps) {
    let type = useCellType(cell);
    let [rs, cs] = A1toRC(cell);
    let [rp, cp] = [1, 1]; // spans
    if (end) {
        let [re, ce] = A1toRC(end);
        [rp, cp] = [re - rs + 1, ce - cs + 1];
    }
    padding = padding || (type === "cc" ? 8 : 0);
    if (isN(padding)) padding = `${padding}px`;
    console.log(rs, cs, rp, cp, type, padding);
    let divStyle: any = {
        gridRow: `${rs + 1} / span ${rp}`,
        gridColumn: `${cs + 1} / span ${cp}`,
        // display: "flex",
        "--padding": padding,
    };
    className = classNames(
        "lcars-cell",
        `lcars-${type.toLowerCase()}`,
        className
    );
    return (
        <div className={className} style={divStyle}>
            {children}
        </div>
    );
}

interface CompositeProps extends LayoutProps {
    def: string;
    color?: string;
    dev?: boolean;
    ri?: number;
    ro?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export function Composite({
    def = "",
    color,
    dev = false,
    ri,
    ro,
    width,
    height,
    flex,
    style,
    className,
    children,
}: CompositeProps) {
    let g = parseDef(def);
    console.log(g);

    let divStyle: any = {
        width,
        height,
        minWidth: width,
        minHeight: height,
        "--ri": isN(ri) && `${ri}px`,
        "--ro": isN(ro) && `${ro}px`,
        "--color": color,
        gap: dev ? "2px" : "0px",
        gridTemplateColumns: g.cols,
        gridTemplateRows: g.rows,
        flex: isN(flex) && `${flex} 1 0%`,
        ...style,
    };
    return (
        <CompositeContext.Provider value={g}>
            <div
                className={classNames("lcars-composite", className, { flex })}
                style={divStyle}
            >
                {g.cells.map((c) => (
                    <Joint
                        type={c.type.toLowerCase()}
                        row={c.row + 1}
                        col={c.col + 1}
                    ></Joint>
                ))}

                {children}
                {dev &&
                    g.cells.map((c) => {
                        return (
                            <div
                                style={{
                                    gridRow: c.row + 1,
                                    gridColumn: c.col + 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 1000,
                                }}
                            >
                                {c.cell}
                            </div>
                        );
                    })}
            </div>
        </CompositeContext.Provider>
    );
}

/**
 * creates a composite definition for a simple frame given the sides
 * @param top
 * @param right
 * @param bottom
 * @param left
 * @returns
 */
function createDef(
    top: boolean | number = false,
    right: boolean | number = false,
    bottom: boolean | number = false,
    left: boolean | number = false
) {
    let [l, t, b, r] = [left, top, bottom, right].map((s) => isN(s) || s);
    let c = (...sides: boolean[]) => (sides.every((s) => s) ? "*" : "");

    let s = (side: boolean | number, fallback: number) =>
        isN(side) ? side : fallback;

    // column sizes
    let def = "g";
    if (l) def += ` ${s(left, 80)}`;
    def += " *";
    if (r) def += ` ${s(right, 80)}`;

    // row definitions
    if (t) def += `/${s(top, 16)}  ${c(l, t)}   ${c(t)}    ${c(r, t)}`;
    def += `/*   ${c(l)}      .          ${c(r)}`;
    if (b) def += `/${s(bottom, 16)}  ${c(l, b)}   ${c(b)}    ${c(r, b)}`;

    let content = (l ? "B" : "A") + (t ? "2" : "1");

    return { def, content };
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
    style,
}: FrameProps) {
    let noSides = [top, right, bottom, left].every((s) => s === undefined);
    if (noSides) {
        top = right = bottom = left = true;
    }
    let { def, content } = createDef(top, right, bottom, left);
    let childElements = new Array<React.ReactNode>().concat(children);
    let specials = childElements.filter(isSpecial);
    let regulars = childElements.filter((c) => !specials.includes(c));

    let padString = [top, right, bottom, left]
        .map((s) => {
            if (s || isN(s)) {
                return isN(padding) ? `${padding}px` : padding;
            }
            return "0";
        })
        .join(" ");
    console.log(def, content);
    return (
        <Composite
            def={def}
            color={color}
            className={className}
            width={width}
            height={height}
            flex={flex}
            ri={ri}
            ro={ro}
            style={style}
            // dev
        >
            {specials}
            <Cell cell={content} padding={padding && padString}>
                {regulars}
            </Cell>
        </Composite>
    );
}
