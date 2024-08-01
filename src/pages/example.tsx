import Layout from "../pageComponents/layout";
import {
    ButtonRow,
    ButtonCol,
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
} from "../components";

export function Gauge() {
    return (
        <ButtonRow flex>
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
                <Grid flex rows={7} strokeWidth={3} />
            </Frame>
        </ButtonRow>
    );
}

function Page() {
    return (
        <ButtonCol flex className="lcars-gray">
            <ButtonRow flex>
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
                            width={184}
                            style={{ alignSelf: "flex-end", zIndex: 2 }}
                        >
                            <ButtonRow flex>
                                <Gauge />
                                <Gauge />
                                <Gauge />
                            </ButtonRow>
                        </Gap>
                        <Gap height={10} />
                        <Filler height={100} medium />
                        <Filler height={75} medium />
                        <ButtonCol>
                            <Button light>Engage</Button>
                            <Button dark>Engage</Button>
                            <Gap height={30} />
                            <Button dim>Engage</Button>
                            <Button bright>Engage</Button>
                            <Button dim>Engage</Button>
                            <Button dim>Engage</Button>
                            <Button bright>Engage</Button>
                            <Button dim>Engage</Button>
                            <Button light>Engage</Button>
                        </ButtonCol>
                        <Filler flex medium />
                    </Right>
                    <Frame
                        flex
                        top={5}
                        right={80}
                        bottom={20}
                        dim
                        ro={36}
                        padding={20}
                    >
                        <Right>
                            <Filler height={107} medium />
                            <Filler height={200} medium />
                            <Gap height={10} />
                            <Filler height={100} medium>
                                427
                            </Filler>
                            <Filler height={75} medium>
                                803
                            </Filler>
                            <ButtonCol>
                                <Button light>Engage</Button>
                                <Button light>Engage</Button>
                                <Gap height={30} />
                                <Button light>Engage</Button>
                                <Button light>Engage</Button>
                                <Button dim>Engage</Button>
                                <Button light>Engage</Button>
                                <Button light>Engage</Button>
                                <Button dim>Engage</Button>
                                <Button bright>Engage</Button>
                            </ButtonCol>
                            <Filler flex medium />
                        </Right>
                        <Frame
                            flex
                            top={5}
                            right={35}
                            bottom={20}
                            dark
                            padding={50}
                        >
                            <ButtonCol flex>
                                <ButtonRow flex>
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
                                            Make sure to see his work on
                                            [Instagram](https://www.instagram.com/lcarslad/)
                                            and [X /
                                            Twitter](https://twitter.com/lcarslad)
                                        </Grid>
                                    </Frame>
                                    <Gap width={170} />
                                </ButtonRow>
                                <ButtonRow height={50}>
                                    <Gap height={50} flex />
                                    <Filler width={150}>3765</Filler>
                                </ButtonRow>
                                <ButtonRow flex>
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
                                    <ButtonCol>
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
                                            <ButtonRow
                                                flex
                                                style={{
                                                    background:
                                                        "center/cover url('https://motionarray.imgix.net/preview-1231063-48im9zP94W-high_0004.jpg')",
                                                }}
                                            />
                                        </Frame>
                                        <ButtonRow height={25}>
                                            <Button flex dim>
                                                Engage
                                            </Button>
                                            <Button flex dim>
                                                Engage
                                            </Button>
                                            <Cap />
                                        </ButtonRow>
                                        <ButtonRow height={25}>
                                            <Button flex dim>
                                                Engage
                                            </Button>
                                            <Button flex dim>
                                                Engage
                                            </Button>
                                            <Cap />
                                        </ButtonRow>
                                        <Gap flex />
                                    </ButtonCol>
                                </ButtonRow>
                                <Gap height={50} />
                                <ButtonRow flex>
                                    <Frame
                                        flex
                                        left={40}
                                        top={20}
                                        dark
                                        ro={32}
                                        ri={12}
                                        padding={8}
                                    >
                                        <Grid flex rows={7} cols={7} />
                                    </Frame>
                                    <Gap width={170} />
                                </ButtonRow>
                            </ButtonCol>
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
                        <ButtonCol>
                            <Button light>Engage</Button>
                            <Button light>Engage</Button>
                            <Gap height={30} />
                            <Button light>Engage</Button>
                            <Button light>Engage</Button>
                            <Button dim>Engage</Button>
                            <Button light>Engage</Button>
                            <Button light>Engage</Button>
                            <Button dim>Engage</Button>
                            <Button bright>Engage</Button>
                        </ButtonCol>
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
                        <ButtonRow height={130}>
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
                                <ButtonRow
                                    flex
                                    style={{
                                        background:
                                            "center/cover url('https://motionarray.imgix.net/preview-1231063-48im9zP94W-high_0004.jpg')",
                                        boxShadow: "inset 0 0 20px 10px black",
                                    }}
                                >
                                    <Grid rows={7} cols={7} flex dark />
                                </ButtonRow>
                            </Frame>
                        </ButtonRow>
                        <Gap height={20} />
                        <ButtonRow flex>
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
                                <Cell cell="A2">
                                    <Grid rows={10} cols={7} flex dark />
                                </Cell>
                                <Cell cell="A2">
                                    <Graph
                                        values={[2, 3, 2, 5, 6, 4, 7, 2]}
                                        flex
                                        max={10}
                                        light
                                    />
                                </Cell>

                                <Cell cell="B2">
                                    <ButtonRow flex>
                                        <Button flex outline>
                                            01
                                        </Button>
                                        <Button flex>02</Button>
                                        <Button flex>03</Button>
                                        <Button flex>04</Button>
                                        <Button flex>05</Button>
                                        <Button flex>06</Button>
                                    </ButtonRow>
                                    <ButtonRow height={24}>
                                        <Button flex outline>
                                            01
                                        </Button>
                                        <Button flex>02</Button>
                                        <Button flex>03</Button>
                                        <Button flex>04</Button>
                                        <Button flex>05</Button>
                                        <Button flex>06</Button>
                                    </ButtonRow>
                                </Cell>
                                <Cell cell="C3">
                                    <Filler width={120} />
                                    <Filler flex bright />
                                </Cell>
                            </Composite>
                        </ButtonRow>
                        <Gap height={20} />
                        <ButtonRow flex={2}>
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
                                <Grid rows={7} cols={7} flex />
                                Composite curves
                            </Frame>
                        </ButtonRow>
                        <Gap height={50} />
                    </Frame>
                </Frame>
            </ButtonRow>
            <ButtonRow>
                <Filler width={10} bright />
                <Button rounded width={100} dim>
                    789536-5
                </Button>
                <Button rounded width={75}>
                    789536-5
                </Button>
                <Gap width={75} />
                <ButtonRow>
                    <Button width={75} dim>
                        789536-5
                    </Button>
                    <Button width={75}>789536-5</Button>
                    <Button width={75}>789536-5</Button>
                    <Filler width={10} />
                    <Cap wide />
                </ButtonRow>
                <Gap width={75} />
                <ButtonRow>
                    <Button width={75} dim>
                        789536-5
                    </Button>
                    <Button width={75}>789536-5</Button>
                    <Button width={75}>789536-5</Button>
                    <Filler width={10} />
                    <Cap wide />
                </ButtonRow>
                <Gap width={75} />
                <Button rounded width={100}>
                    789536-5
                </Button>
                <Button rounded width={75} dim>
                    789536-5
                </Button>
            </ButtonRow>
        </ButtonCol>
    );
}

export default function () {
    return (
        <Layout title="Example">
            <Page />
        </Layout>
    );
}
