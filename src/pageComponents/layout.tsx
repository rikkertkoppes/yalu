import Link from "next/link";
import { Frame, Top, Filler, Cap, Left, Button, Gap } from "../components";

export default function Layout({ children, title }) {
    return (
        <Frame flex padding={20} l={150} t={40} className="lcars-gray">
            <Top>
                <Filler flex />
                <Gap bright>{title}</Gap>
                <Cap wide />
            </Top>
            <Left>
                <Link href="/">
                    <Button>Frames</Button>
                </Link>
                <Link href="/buttons">
                    <Button>Buttons</Button>
                </Link>
                <Link href="/example">
                    <Button>Example</Button>
                </Link>
                <Filler flex />
            </Left>
            <div className="lcars-reset lcars-boot">{children}</div>
        </Frame>
    );
}
