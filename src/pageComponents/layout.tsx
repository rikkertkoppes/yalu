import { Frame, Top, Filler, Cap, Left, Button } from "../components";

export default function Layout({ children, title }) {
    return (
        <Frame padding={20} left={150} top={40} className="lcars-gray">
            <Top>
                <Filler flex />
                {title}
                <Cap wide />
            </Top>
            <Left>
                <Button>Frames</Button>
                <Filler flex />
            </Left>
            <div className="lcars-reset">{children}</div>
        </Frame>
    );
}
