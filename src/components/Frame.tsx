import React from "react";
import classNames from "classnames";
import {
    CommonProps,
    ContentProps,
    getContentClass,
    getStyleProps,
} from "./commonProps";

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
        .replace(/-/g, "*")
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
interface CellProps extends ContentProps {
    start: string;
    end?: string;
    children?: React.ReactNode;
    padding?: number | string;
    className?: string;
}
export function Cell({
    start,
    end,
    children,
    padding,
    className,
    ...contentProps
}: CellProps) {
    let type = useCellType(start);
    let [rs, cs] = A1toRC(start);
    let [rp, cp] = [1, 1]; // spans
    if (end) {
        let [re, ce] = A1toRC(end);
        [rp, cp] = [re - rs + 1, ce - cs + 1];
    }
    padding = padding || (type === "cc" ? 8 : 0);
    if (isN(padding)) padding = `${padding}px`;
    let divStyle: any = {
        gridRow: `${rs + 1} / span ${rp}`,
        gridColumn: `${cs + 1} / span ${cp}`,
        "--padding": padding,
    };
    className = classNames(
        "lcars-cell",
        `lcars-${type.toLowerCase()}`,
        className,
        getContentClass(contentProps)
    );
    return (
        <div className={className} style={divStyle}>
            {children}
        </div>
    );
}

interface CompositeProps extends CommonProps {
    def: string;
    dev?: boolean;
    ri?: number;
    ro?: number;
    children?: React.ReactNode;
}

function Composite(props: CompositeProps) {
    let { def = "", dev = false, ri, ro, children } = props;
    let g = parseDef(def);

    let { style, className } = getStyleProps(props);

    let divStyle: any = {
        minWidth: style.width,
        minHeight: style.height,
        "--ri": isN(ri) && `${ri}px`,
        "--ro": isN(ro) && `${ro}px`,
        gridTemplateColumns: g.cols,
        gridTemplateRows: g.rows,
        ...style,
    };
    return (
        <CompositeContext.Provider value={g}>
            <div
                className={classNames("lcars-composite", className)}
                style={divStyle}
            >
                {g.cells.map((c) => (
                    <Joint
                        key={c.cell}
                        type={c.type.toLowerCase()}
                        row={c.row + 1}
                        col={c.col + 1}
                    ></Joint>
                ))}

                {children}
                {dev &&
                    g.cells.map((c) => {
                        let brw =
                            c.col === g.cols.split(" ").length - 1 ? 1 : 0;
                        let bbw =
                            c.row === g.rows.split(" ").length - 1 ? 1 : 0;
                        return (
                            <div
                                key={c.cell}
                                style={{
                                    gridRow: c.row + 1,
                                    gridColumn: c.col + 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 1000,
                                    pointerEvents: "none",
                                    border: "1px dashed white",
                                    borderRightWidth: brw,
                                    borderBottomWidth: bbw,
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
    if (t) def += `/${s(top, 16)}     ${c(l, t)}   ${c(t)}    ${c(r, t)}`;
    def += `       /*                 ${c(l)}      .          ${c(r)}`;
    if (b) def += `/${s(bottom, 16)}  ${c(l, b)}   ${c(b)}    ${c(r, b)}`;

    let content = (l ? "B" : "A") + (t ? "2" : "1");

    return { def, content };
}

interface FrameProps extends CommonProps {
    children?: React.ReactNode;
    t?: boolean | number;
    r?: boolean | number;
    b?: boolean | number;
    l?: boolean | number;
    padding?: string | number;
    ri?: number;
    ro?: number;
    dev?: boolean;
    def?: string;
}

export function Frame(props: FrameProps) {
    let { def: cdef, children, t, r, b, l, padding, ...compositeProps } = props;
    if (cdef) {
        return (
            <Composite def={cdef} {...compositeProps}>
                {children}
            </Composite>
        );
    }

    let noSides = [t, r, b, l].every((s) => s === undefined);
    if (noSides) {
        t = r = b = l = true;
    }
    let { def, content } = createDef(t, r, b, l);
    let childElements = new Array<React.ReactNode>().concat(children);
    let specials = childElements.filter(isSpecial);
    let regulars = childElements.filter((c) => !specials.includes(c));

    let padString = isN(padding)
        ? [t, r, b, l]
              // repeat padding for the side if present, otherwise 0
              .map((s) => (s || isN(s) ? `${padding}px` : "0"))
              .join(" ")
        : padding;
    return (
        <Composite def={def} {...compositeProps}>
            {specials}
            <Cell start={content} padding={padding && padString}>
                {regulars}
            </Cell>
        </Composite>
    );
}

/** specials */
interface SideProps extends ContentProps {
    children?: React.ReactNode;
    startSpace?: number;
    endSpace?: number;
}
export function Top({
    children,
    startSpace,
    endSpace,
    ...cellProps
}: SideProps) {
    let cell = useSideCell("top");
    if (cell)
        return (
            <Cell start={cell} {...cellProps} className="h top">
                {children}
            </Cell>
        );
    return null;
}
export function Right({
    children,
    startSpace,
    endSpace,
    ...cellProps
}: SideProps) {
    let cell = useSideCell("right");
    if (cell)
        return (
            <Cell start={cell} {...cellProps} className="v right">
                {children}
            </Cell>
        );
    return null;
}
export function Bottom({
    children,
    startSpace,
    endSpace,
    ...cellProps
}: SideProps) {
    let cell = useSideCell("bottom");
    if (cell)
        return (
            <Cell start={cell} {...cellProps} className="h bottom">
                {children}
            </Cell>
        );
    return null;
}
export function Left({
    children,
    startSpace,
    endSpace,
    ...cellProps
}: SideProps) {
    let cell = useSideCell("left");
    if (cell)
        return (
            <Cell start={cell} {...cellProps} className="v left">
                {children}
            </Cell>
        );
    return null;
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
    return <div className="lcars-frameart lcars-col">{children}</div>;
}
