import classNames from "classnames";

let shades = ["dark", "dim", "medium", "light", "bright"] as const;
type Shades = (typeof shades)[number];

type ShadeProps = { [S in Shades]?: boolean };

let contentPositions = [
    "tl",
    "tc",
    "tf",
    "tr",
    "cl",
    "fl",
    "cc",
    "cr",
    "fr",
    "bl",
    "bc",
    "bf",
    "br",
] as const;
type ContentPositions = (typeof contentPositions)[number];
export type ContentProps = {
    [C in ContentPositions]?: boolean;
} & {
    content?: ContentPositions;
};

export type LayoutProps = {
    width?: number;
    height?: number;
    flex?: boolean | number;
};

export type StyleProps = ShadeProps &
    ContentProps & {
        color?: string;
        style?: React.CSSProperties;
        className?: string;
    };

export type CommonProps = LayoutProps & StyleProps;

function isN(n: any): n is number {
    return typeof n === "number";
}

/** gets the brightest shade defined in the props */
function getColor(props: CommonProps) {
    if (props.color)
        return {
            color: props.color,
            textColor: {
                "var(--dark)": "var(--text-on-dark)",
                "var(--dim)": "var(--text-on-dim)",
                "var(--medium)": "var(--text-on-medium)",
                "var(--light)": "var(--text-on-light)",
                "var(--bright)": "var(--text-on-bright)",
            }[props.color],
        };
    let shade = shades.findLast((shade) => props[shade]);
    return {
        color: shade ? `var(--${shade})` : "",
        textColor: shade ? `var(--text-on-${shade})` : "",
    };
}

export function getContentClass(props: ContentProps) {
    return classNames(
        props.content,
        Object.fromEntries(contentPositions.map((pos) => [pos, props[pos]]))
    );
}

export function getStyleProps(props: CommonProps) {
    let { flex, width, height, className } = props;
    let { color, textColor = "" } = getColor(props);
    let style: any = {
        width,
        height,
        "--color": color,
        "--text-on-color": textColor,
        flex: isN(flex) && `${flex} 1 0%`,
        ...(props.style || {}),
    };
    return {
        style: style,
        className: classNames(className, { flex }, getContentClass(props)),
    };
}
