import Layout from "../pageComponents/layout";
import {
    Row,
    Col,
    Button,
    Cap,
    Filler,
    Frame,
    Left,
    Right,
    Gap,
    Grid,
    Art,
    Cell,
    Graph,
    Bar,
    Stack,
    Bottom,
    Cutout,
    Top,
    Axes,
    Connector,
} from "../components";
import * as SVG from "../components/svg";
import { Repeat, ngon } from "../components/core";

/** random number */
function rn(length: number);
function rn(minLength: number, maxLength: number);
function rn(a: number, b?: number) {
    let [min, max] = [a, a];
    if (b !== undefined) [min, max] = [a, b];
    let s = "";
    let n = min + Math.floor(Math.random() * (1 + max - min));
    while (n--) s += Math.floor(Math.random() * 10);
    return <span suppressHydrationWarning>{s}</span>;
}

/** random string */
function rs(length: number);
function rs(minLength: number, maxLength: number);
function rs(a: number, b?: number) {
    let [min, max] = [a, a];
    if (b !== undefined) [min, max] = [a, b];
    let s = "";
    let n = min + Math.floor(Math.random() * (max - min));
    while (n--) s += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return <span suppressHydrationWarning>{s}</span>;
}

/** random element from array */
function ra<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}

/** random color */
function rc() {
    return `var(--${ra(["dark", "dim", "medium", "bright", "light"])})`;
}

interface GaugeProps {
    color?: string;
}
const Gauge = ({ color }: GaugeProps) => (
    <Col flex>
        <Button height={24} color={color}>
            {rn(2)}-{rn(3)}
        </Button>
        <Row flex>
            <Frame t={3} r={3} b={5} flex ro={0} ri={0}>
                <Right>
                    <Filler height={50} />
                    <Filler flex />
                </Right>
            </Frame>
            <Frame t={3} l={1} b={5} flex ro={0} ri={0} dim padding={4}>
                <Grid flex rows={7} strokeWidth={1} />
            </Frame>
        </Row>
    </Col>
);

function Pad() {
    let col = (i: number) =>
        i === 1 || i === 3 ? "var(--blue)" : "var(--bright)";
    return (
        <Row height={170}>
            <svg viewBox="-100 -100 200 200">
                <circle r="20" fill="var(--blue)" />
                <Repeat items={ngon(6, 45, -90)}>
                    {({ x, y }, i) => (
                        <SVG.NGon
                            id={`hex-${i}`}
                            cx={x}
                            cy={y}
                            n={6}
                            r={20}
                            fill={col(i)}
                        />
                    )}
                </Repeat>
            </svg>
            <Col repeat={6} width={75} height={170}>
                {(r) => {
                    let c: any = r >= 3 ? "bl" : "tl";
                    return (
                        <>
                            <Button id={`btn-${r}`} height={20} color={col(r)}>
                                0{r + 1}
                            </Button>
                            <Connector
                                from={`btn-${r}`}
                                to={`hex-${r}`}
                                fromCorner={c}
                                color={col(r)}
                                direction="hv"
                                r={8}
                                strokeWidth={2}
                            />
                        </>
                    );
                }}
            </Col>
        </Row>
    );
}

function Page() {
    return (
        <Col flex className="lcars-gray">
            <Row flex>
                <Frame
                    flex={0.75}
                    t={36}
                    r={95}
                    b={0}
                    ro={60}
                    ri={40}
                    padding={"4px 4px 4px 0px"}
                >
                    <Top>
                        <Filler flex medium>
                            <Cutout width={300}>
                                <Row height={20}>
                                    <Button rounded="right" dim>
                                        8-XX
                                    </Button>
                                    <Button rounded>8-042</Button>
                                    <Button rounded dim>
                                        8-302
                                    </Button>
                                    <Button rounded>8-205</Button>
                                    <Button rounded dim>
                                        8-000
                                    </Button>
                                </Row>
                            </Cutout>
                        </Filler>
                    </Top>
                    <Right>
                        <Filler height={116} medium />
                        <Gap
                            height={200}
                            width={179}
                            style={{ alignSelf: "flex-end", zIndex: 2 }}
                        >
                            <Row flex>
                                <Gauge color="var(--dim)" />
                                <Gauge color="var(--bright)" />
                                <Gauge color="var(--bright)" />
                            </Row>
                        </Gap>
                        <Gap height={10} />
                        <Filler height={100} medium />
                        <Filler height={75} medium />
                        <Col>
                            <Button light>LCARSLad</Button>
                            <Button dark>LCARSLad</Button>
                            <Gap height={30} />
                            <Button dim>LCARSLad</Button>
                            <Button bright>LCARSLad</Button>
                            <Button dim>LCARSLad</Button>
                            <Button dim>LCARSLad</Button>
                            <Button bright>LCARSLad</Button>
                            <Button dark>LCARSLad</Button>
                            <Button light>LCARSLad</Button>
                        </Col>
                        <Filler flex medium />
                    </Right>
                    <Frame
                        flex
                        t={5}
                        r={80}
                        b={20}
                        dim
                        ro={36}
                        padding={"20px 20px 75px 0"}
                    >
                        <Right>
                            <Filler height={107} dim />
                            <Filler height={200} dim />
                            <Gap height={10} />
                            <Filler height={100} dim br>
                                427
                            </Filler>
                            <Filler height={75} dim br>
                                803
                            </Filler>
                            <Col>
                                <Button light>Check</Button>
                                <Button dark>Check</Button>
                                <Gap height={30} />
                                <Button dark>Check</Button>
                                <Button light>Check</Button>
                                <Button light>Check</Button>
                                <Button dark>Check</Button>
                                <Button light>Check</Button>
                                <Button dim>Check</Button>
                                <Button light>Check</Button>
                            </Col>
                            <Filler flex dim />
                        </Right>
                        <Bottom>
                            <Filler width={50} />
                            <Filler flex br>
                                <Cutout offset={[0, 8]} flex height={64}>
                                    <Row repeat={6} flex gap={10}>
                                        <Col flex>
                                            <Filler bright />
                                            <Button br flex>
                                                {rs(2)}-{rs(3)}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Cutout>
                            </Filler>
                            <Filler width={150} />
                        </Bottom>
                        <Frame flex t={15} r={35} b={20} dark padding={50}>
                            <Top>
                                <Gap width={300} />
                                <Filler flex dark />
                            </Top>
                            <Col flex>
                                <Row flex>
                                    <Frame
                                        flex
                                        l={40}
                                        b={10}
                                        dark
                                        ro={32}
                                        ri={12}
                                        padding={8}
                                    >
                                        <Grid flex rows={7} cols={7}>
                                            This example is based on the
                                            excellent work of LCARSLad London.
                                            Make sure to see his work on{" "}
                                            <a href="https://www.instagram.com/lcarslad/">
                                                Instagram
                                            </a>{" "}
                                            and{" "}
                                            <a href="https://twitter.com/lcarslad">
                                                Twitter
                                            </a>
                                        </Grid>
                                    </Frame>
                                    <Gap width={170} />
                                </Row>
                                <Row height={50}>
                                    <Gap height={50} flex />
                                    <Filler width={150} br>
                                        3765
                                    </Filler>
                                </Row>
                                <Row flex>
                                    <Frame
                                        flex
                                        l={40}
                                        t={20}
                                        b={10}
                                        dark
                                        ro={32}
                                        ri={12}
                                        padding={8}
                                    >
                                        <Grid flex rows={7} cols={7} dim />
                                    </Frame>
                                    <Gap width={20} />
                                    <Col>
                                        <Gap flex />
                                        <Frame
                                            width={150}
                                            height={80}
                                            t={4}
                                            r={4}
                                            b={4}
                                            l={30}
                                            bright
                                            ro={0}
                                            ri={0}
                                            padding={4}
                                        >
                                            {/* <Left>
                                        <Filler flex bright />
                                        <Filler flex bright />
                                    </Left> */}
                                            <Row
                                                flex
                                                style={{
                                                    background:
                                                        "center/cover url('https://motionarray.imgix.net/preview-1231063-48im9zP94W-high_0004.jpg')",
                                                }}
                                            />
                                        </Frame>
                                        <Row height={25}>
                                            <Button flex dark>
                                                Engage
                                            </Button>
                                            <Filler dark />
                                            <Button flex dim rounded="right">
                                                Engage
                                            </Button>
                                        </Row>
                                        <Row height={25}>
                                            <Button flex dark>
                                                Engage
                                            </Button>
                                            <Filler dark />
                                            <Button flex dim rounded="right">
                                                Engage
                                            </Button>
                                        </Row>
                                        <Gap flex />
                                    </Col>
                                </Row>
                                <Gap height={50} />
                                <Row flex>
                                    <Frame
                                        flex
                                        l={40}
                                        t={20}
                                        dark
                                        ro={32}
                                        ri={12}
                                        padding={8}
                                    >
                                        <Stack flex>
                                            <Grid rows={7} cols={7} />
                                            <Graph values={[0, 1]} dashed />
                                            <Graph
                                                values={[0, 1]}
                                                max={1.5}
                                                dashed
                                            />
                                            <Graph
                                                values={[
                                                    2, 3, 2, 5, 6, 4, 7, 2,
                                                ]}
                                                max={10}
                                                light
                                                dotted
                                                strokeWidth={2}
                                            />
                                            <Graph
                                                values={[
                                                    4, 5, 7, 3, 8, 9, 8, 5,
                                                ]}
                                                max={10}
                                                bright
                                                dashed
                                            />
                                        </Stack>
                                    </Frame>
                                    <Gap width={20} />
                                    <Col width={150}>
                                        <Row height={20}>
                                            <Filler width={20} />
                                            <Button flex dark>
                                                42-2
                                            </Button>
                                        </Row>
                                        <Gap height={40} />
                                        <Frame
                                            flex
                                            r={15}
                                            b={5}
                                            ro={20}
                                            ri={10}
                                            padding={10}
                                        >
                                            <Right>
                                                <Filler height={25} light />
                                                <Filler flex />
                                            </Right>
                                            <Col repeat={5} flex>
                                                {() => (
                                                    <Row height={20}>
                                                        <Filler bright />
                                                        <Filler dim />
                                                        <Button flex light>
                                                            {rn(3, 5)}
                                                        </Button>
                                                        <Gap
                                                            flex
                                                            color="var(--blue)"
                                                            cr
                                                        >
                                                            {rn(1, 3)}
                                                        </Gap>
                                                        <Filler bright />
                                                    </Row>
                                                )}
                                            </Col>
                                        </Frame>
                                    </Col>
                                </Row>
                            </Col>
                        </Frame>
                    </Frame>
                </Frame>
                <Gap width={20} />
                <Frame flex t={30} l={75} b ro={60} ri={40} padding={20}>
                    <Left>
                        <Filler height={116} medium />
                        <Gap height={200} width={75}>
                            <Gauge />
                        </Gap>
                        <Gap height={10} />
                        <Filler height={100} medium />
                        <Filler height={75} dark />
                        <Col>
                            <Button light>London</Button>
                            <Button light>London</Button>
                            <Gap height={30} />
                            <Button light>London</Button>
                            <Button light>London</Button>
                            <Button dark>London</Button>
                            <Button light>London</Button>
                            <Button light>London</Button>
                            <Button dark>London</Button>
                            <Button bright>London</Button>
                        </Col>
                        <Filler flex medium />
                    </Left>
                    <Frame flex t={30} l={35} b dark ro={36} padding={20}>
                        <Left>
                            <Filler height={66} dark />
                            <Filler height={200} dark />
                            <Gap height={10} />
                            <Filler height={100} dark />
                            <Filler height={75} dark />
                            <Filler flex dark />
                        </Left>
                        <Row height={130}>
                            <Gap flex />
                            <Frame
                                t={5}
                                l={20}
                                flex
                                dim
                                ro={20}
                                ri={10}
                                padding={20}
                            >
                                <Left>
                                    <Filler height={25} dark />
                                    <Filler height={30} medium />
                                    <Filler flex dim />
                                </Left>
                                <Row
                                    flex
                                    style={{
                                        background:
                                            "center/cover url('https://motionarray.imgix.net/preview-1231063-48im9zP94W-high_0004.jpg')",
                                        boxShadow: "inset 0 0 20px 10px black",
                                    }}
                                >
                                    <Grid rows={7} cols={7} flex dark />
                                </Row>
                            </Frame>
                        </Row>
                        <Gap height={20} />
                        <Row flex>
                            <Frame
                                flex
                                height={300}
                                bright
                                ri={24}
                                def={`
                                    g   *   400 200
                                    20  *   *   .
                                    *   .   *   .
                                    20  .   *   *
                                `}
                            >
                                <Cell cell="A1">
                                    <Filler width={75} />
                                    <Filler flex bright />
                                </Cell>
                                <Cell
                                    cell="A2"
                                    end="A3"
                                    padding={"24px 24px 0 0 "}
                                >
                                    <Pad />
                                </Cell>

                                <Cell cell="B2">
                                    <Row flex color="var(--blue)">
                                        <Button flex tc>
                                            01
                                        </Button>
                                        <Button flex tc>
                                            02
                                        </Button>
                                        <Button flex tc>
                                            03
                                        </Button>
                                        <Button flex tc>
                                            04
                                        </Button>
                                        <Button flex tc>
                                            05
                                        </Button>
                                        <Button flex tc>
                                            06
                                        </Button>
                                    </Row>
                                    <Row height={24}>
                                        <Button flex bright>
                                            95-257
                                        </Button>
                                        <Button flex bright>
                                            95-332
                                        </Button>
                                        <Button flex>95-401</Button>
                                        <Button flex>95-534</Button>
                                        <Button flex>95-693</Button>
                                        <Button flex>95-835</Button>
                                    </Row>
                                </Cell>
                                <Cell
                                    cell="C1"
                                    end="C2"
                                    padding={"0 0 24px 24px"}
                                >
                                    <Row dim flex>
                                        <Col width={40} gap={2}>
                                            <Cap height={12} r={8} dark />
                                            <Bar
                                                value={65}
                                                steps={20}
                                                type="square"
                                                flex
                                            />
                                            <Cap height={20} bright r={8} cc>
                                                {rn(2)}-{rn(3)}
                                            </Cap>
                                        </Col>
                                        <Col width={40} gap={2}>
                                            <Cap height={12} r={8} dark />
                                            <Bar
                                                value={50}
                                                steps={20}
                                                type="square"
                                                flex
                                            />
                                            <Cap height={20} bright r={8} cc>
                                                {rn(2)}-{rn(3)}
                                            </Cap>
                                        </Col>
                                        <Col width={40} gap={2}>
                                            <Cap height={12} r={8} dark />
                                            <Bar
                                                value={77}
                                                steps={20}
                                                type="square"
                                                flex
                                            />
                                            <Cap height={20} bright r={8} cc>
                                                {rn(2)}-{rn(3)}
                                            </Cap>
                                        </Col>
                                    </Row>
                                </Cell>
                                <Cell cell="C3">
                                    <Filler width={120} />
                                    <Filler flex bright />
                                </Cell>
                            </Frame>
                        </Row>
                        <Gap height={20} />
                        <Row height={200}>
                            <Frame
                                b={5}
                                ri={0}
                                ro={0}
                                dark
                                width={100}
                                padding={4}
                            >
                                <Col repeat={6} gap={4}>
                                    {() => (
                                        <Row flex height={20}>
                                            <Button flex color={rc()}>
                                                {rn(2)}-{rn(3)}
                                            </Button>
                                            <Gap width={20} cr>
                                                {rn(0, 2)}
                                            </Gap>
                                            <Filler width={5} color={rc()} />
                                        </Row>
                                    )}
                                </Col>
                            </Frame>
                            <Frame
                                l={10}
                                t={20}
                                b={5}
                                ri={0}
                                ro={0}
                                dark
                                width={300}
                            >
                                <Top>
                                    <Filler flex cr dark>
                                        HEISENBERG COMPENSATORS
                                    </Filler>
                                </Top>
                                <Col repeat={10} flex gap={4}>
                                    {(r) => {
                                        let color = [
                                            "var(--medium)",
                                            "var(--blue)",
                                            "var(--light)",
                                        ][[0, 1, 0, 0, 0, 2, 0, 1, 0][r]];
                                        return (
                                            <Row flex cr height={11}>
                                                <Repeat items={4}>
                                                    {() => (
                                                        <Gap
                                                            flex
                                                            cr
                                                            color={color}
                                                        >
                                                            {rn(1, 9)}
                                                        </Gap>
                                                    )}
                                                </Repeat>
                                                <Gap width={20} />
                                                <Filler
                                                    width={20}
                                                    height={4}
                                                    color={color}
                                                />
                                            </Row>
                                        );
                                    }}
                                </Col>
                            </Frame>
                            <Row width={150} gap={20}>
                                <Gauge color="var(--dim)" />
                                <Gauge color="var(--medium)" />
                            </Row>
                            <Frame
                                t={24}
                                b={5}
                                r={40}
                                ri={0}
                                ro={0}
                                dark
                                width={200}
                                padding={4}
                            >
                                <Col repeat={6} gap={4}>
                                    {() => (
                                        <Row flex height={20}>
                                            <Button rounded color={rc()}>
                                                {rn(2)}-{rn(3)}
                                            </Button>
                                            <Button
                                                rounded="left"
                                                color={rc()}
                                            />
                                            <Button flex color={rc()}>
                                                {rn(2)}-{rn(3)}
                                            </Button>
                                            <Gap width={20} cr dim>
                                                {rn(0, 2)}
                                            </Gap>
                                            <Filler width={5} color={rc()} />
                                        </Row>
                                    )}
                                </Col>
                            </Frame>
                        </Row>
                        <Gap height={50} />
                    </Frame>
                </Frame>
            </Row>
            <Gap height={50} />
            <Row height={24}>
                <Filler width={10} bright />
                <Button rounded width={100} dark>
                    789536-5
                </Button>
                <Button rounded width={75}>
                    789536-5
                </Button>
                <Gap width={75} />
                <Row>
                    <Button width={75} dim>
                        789536-5
                    </Button>
                    <Button width={75}>789536-5</Button>
                    <Button width={75}>789536-5</Button>
                    <Filler width={10} />
                    <Cap wide />
                </Row>
                <Gap width={75} />
                <Row>
                    <Button width={75} dim>
                        789536-5
                    </Button>
                    <Button width={75}>789536-5</Button>
                    <Button width={75}>789536-5</Button>
                    <Filler width={10} />
                    <Cap wide />
                </Row>
                <Gap width={75} />
                <Button rounded width={100}>
                    789536-5
                </Button>
                <Button rounded width={75} dim>
                    789536-5
                </Button>
                <Gap flex />
            </Row>
        </Col>
    );
}

export default function () {
    return (
        <Layout title="Example">
            <Page />
        </Layout>
    );
}
