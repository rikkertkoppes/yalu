import classNames from "classnames";

let shades = ["dark", "dim", "medium", "light", "bright"] as const;
type Shades = (typeof shades)[number];

type ShadeProps = { [S in Shades]?: boolean };
export interface LayoutProps {
    width?: number;
    height?: number;
    flex?: boolean | number;
}

export interface StyleProps extends ShadeProps {
    color?: string;
    style?: React.CSSProperties;
    className?: string;
}

export interface CommonProps extends LayoutProps, StyleProps {}

function isN(n: any): n is number {
    return typeof n === "number";
}

/** gets the brightest shade defined in the props */
function getColor(props: CommonProps) {
    if (props.color) return props.color;
    let shade = shades.findLast((shade) => props[shade]);
    return shade ? `var(--${shade})` : "";
}

export function getStyleProps(props: CommonProps) {
    let { flex, width, height, color, className } = props;
    let style: any = {
        width,
        height,
        "--color": getColor(props),
        flex: isN(flex) && `${flex} 1 0%`,
        ...(props.style || {}),
    };
    return {
        style: style,
        className: classNames(className, { flex }),
    };
}
