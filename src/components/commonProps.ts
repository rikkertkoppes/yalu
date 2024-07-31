import classNames from "classnames";

export interface LayoutProps {
    width?: number;
    height?: number;
    flex?: boolean | number;
}

export interface StyleProps {
    color?: string;
    style?: React.CSSProperties;
    className?: string;
}

export interface CommonProps extends LayoutProps, StyleProps {}

function isN(n: any): n is number {
    return typeof n === "number";
}

export function getStyleProps(props: CommonProps) {
    let { flex, width, height, color, className } = props;
    let style: any = {
        width,
        height,
        "--color": color,
        flex: isN(flex) && `${flex} 1 0%`,
        ...(props.style || {}),
    };
    return {
        style,
        className: classNames(className, { flex }),
    };
}
