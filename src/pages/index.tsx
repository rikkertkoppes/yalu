import React from "react";
import { Button, Filler, Frame, Left } from "../components";

export default function () {
    return (
        <Frame flex top left bottom right padding={10}>
            <p>
                start with a frame and specify the sides that should be visible:
            </p>
            <Frame left={4} top={50} height={200}></Frame>
            <Frame left top bottom height={400}>
                <Left>
                    <Button>Engage</Button>
                    <Filler flex />
                </Left>
                content here
            </Frame>
            <Frame
                left={100}
                top={4}
                height={400}
                className="lcars-gray"
                ro={20}
                ri={16}
            >
                <Left>
                    <Button>Engage</Button>
                    <Filler flex />
                </Left>
                <Frame left={2} top={2} ri={12} ro={12} flex>
                    <Frame right={24} bottom={12} flex ri={48} ro={64}>
                        content here
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    );
}
