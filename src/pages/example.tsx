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
    Composite,
    Art,
    Cell,
    Graph,
    Bar,
    Stack,
    Array,
    Bottom,
    Cutout,
} from "../components";

function randomLengthNumber(length: number) {
    let s = "";
    let n = 1 + Math.floor(Math.random() * length);
    while (n--) s += Math.floor(Math.random() * 10);
    return parseInt(s, 10);
}

interface GaugeProps {
    color?: string;
}
export function Gauge({ color }: GaugeProps) {
    return (
        <Col flex>
            <Button height={24} color={color}>
                27-423
            </Button>
            <Row flex>
                <Frame top={3} right={3} bottom={3} flex ro={0} ri={0}>
                    <Right>
                        <Filler height={50} />
                        <Filler flex />
                    </Right>
                </Frame>
                <Frame
                    top={3}
                    left={3}
                    bottom={3}
                    flex
                    ro={0}
                    ri={0}
                    dim
                    padding={4}
                >
                    <Grid flex rows={7} strokeWidth={1} />
                </Frame>
            </Row>
        </Col>
    );
}

function Page() {
    return (
        <Col flex className="lcars-gray">
            <Row flex>
                <Frame
                    flex={0.75}
                    top={30}
                    right={95}
                    bottom={0}
                    ro={60}
                    ri={40}
                    padding={4}
                >
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
                        top={5}
                        right={80}
                        bottom={20}
                        dim
                        ro={36}
                        padding={"20px 20px 75px 0"}
                    >
                        <Right>
                            <Filler height={107} medium />
                            <Filler height={200} medium />
                            <Gap height={10} />
                            <Filler height={100} medium br>
                                427
                            </Filler>
                            <Filler height={75} medium br>
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
                            <Filler flex medium />
                        </Right>
                        <Bottom>
                            <Filler width={50} />
                            <Filler flex br>
                                <Cutout offset={[0, 8]} flex height={64}>
                                    <Array cols={6} flex>
                                        {() => (
                                            <Col width={50}>
                                                <Filler bright />
                                                <Button br flex>
                                                    woop
                                                </Button>
                                            </Col>
                                        )}
                                    </Array>
                                </Cutout>
                            </Filler>
                            <Filler width={150} />
                        </Bottom>
                        <Frame
                            flex
                            top={5}
                            right={35}
                            bottom={20}
                            dark
                            padding={50}
                        >
                            <Col flex>
                                <Row flex>
                                    <Frame
                                        flex
                                        left={40}
                                        bottom={10}
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
                                        left={40}
                                        top={20}
                                        bottom={10}
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
                                            top={4}
                                            right={4}
                                            bottom={4}
                                            left={30}
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
                                        left={40}
                                        top={20}
                                        dark
                                        ro={32}
                                        ri={12}
                                        padding={8}
                                    >
                                        <Stack flex>
                                            <Grid rows={7} cols={7} />
                                            <Graph
                                                values={[
                                                    2, 3, 2, 5, 6, 4, 7, 2,
                                                ]}
                                                max={10}
                                                light
                                            />
                                            <Graph
                                                values={[
                                                    4, 5, 7, 3, 8, 9, 8, 5,
                                                ]}
                                                max={10}
                                                bright
                                            />
                                        </Stack>
                                    </Frame>
                                    <Gap width={170} />
                                </Row>
                            </Col>
                        </Frame>
                    </Frame>
                </Frame>
                <Gap width={20} />
                <Frame
                    flex
                    top={30}
                    left={75}
                    bottom
                    ro={60}
                    ri={40}
                    padding={20}
                >
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
                    <Frame
                        flex
                        top={30}
                        left={35}
                        bottom
                        dark
                        ro={36}
                        padding={20}
                    >
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
                                top={5}
                                left={20}
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
                            <Composite
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
                                    <Stack flex>
                                        <Grid rows={10} cols={7} flex dark />
                                        <Graph
                                            values={[2, 3, 2, 5, 6, 4, 7, 2]}
                                            flex
                                            max={10}
                                            light
                                        />
                                    </Stack>
                                </Cell>

                                <Cell cell="B2">
                                    <Row flex color="var(--blue)">
                                        <Button flex>01</Button>
                                        <Button flex>02</Button>
                                        <Button flex>03</Button>
                                        <Button flex>04</Button>
                                        <Button flex>05</Button>
                                        <Button flex>06</Button>
                                    </Row>
                                    <Row height={24}>
                                        <Button flex outline>
                                            01
                                        </Button>
                                        <Button flex>02</Button>
                                        <Button flex>03</Button>
                                        <Button flex>04</Button>
                                        <Button flex>05</Button>
                                        <Button flex>06</Button>
                                    </Row>
                                </Cell>
                                <Cell
                                    cell="C1"
                                    end="C2"
                                    padding={"0 0 24px 24px"}
                                >
                                    <Row dim flex>
                                        <Bar
                                            value={50}
                                            steps={20}
                                            type="square"
                                            flex
                                        />
                                        <Bar
                                            value={50}
                                            steps={20}
                                            type="square"
                                            flex
                                        />
                                        <Bar
                                            value={77}
                                            steps={20}
                                            type="square"
                                            flex
                                        />
                                    </Row>
                                </Cell>
                                <Cell cell="C3">
                                    <Filler width={120} />
                                    <Filler flex bright />
                                </Cell>
                            </Composite>
                        </Row>
                        <Gap height={20} />
                        <Row flex={2}>
                            <Frame
                                top={15}
                                right={100}
                                flex
                                height={300}
                                bright
                                padding={20}
                                style={{
                                    transform:
                                        "perspective(100px) rotateX(2deg)",
                                    transformOrigin: "bottom left",
                                }}
                            >
                                <Right>
                                    <Button outline>845-56</Button>
                                    <Button outline>845-56</Button>
                                    <Button outline>845-56</Button>
                                    <Button outline>845-56</Button>
                                    <Filler flex />
                                </Right>
                                <Stack flex>
                                    {/* <Grid rows={7} cols={7} /> */}
                                    <Array rows={7} cols={7}>
                                        {({ r, c }) => (
                                            <div suppressHydrationWarning>
                                                {randomLengthNumber(7)}
                                            </div>
                                        )}
                                    </Array>
                                </Stack>
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
