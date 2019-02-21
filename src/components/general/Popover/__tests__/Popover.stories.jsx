import React, { useState, createRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "components/general/Button";
import Popover from "..";

const buttonRef = createRef();
const ControlledPopover = () => {
    const [showPopover, setShowPopover] = useState(false);

    return (
        <React.Fragment>
            <Button
                primary
                contained
                onClick={() => setShowPopover(!showPopover)}
                ref={buttonRef}
            >
                Click me
            </Button>
            <Popover
                isOpen={showPopover}
                relativeTo={buttonRef.current}
                onClose={() => action("close")}
            >
                <div
                    style={{
                        padding: 8,
                        width: 400,
                        fontFamily: "Equinor",
                    }}
                >
                    <h2>Hello there!</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce eu mi eu ipsum venenatis aliquam nec auctor ante.
                        Interdum et malesuada fames ac ante ipsum primis in
                        faucibus.
                    </p>
                    <div style={{ textAlign: "right" }}>
                        <Button
                            small
                            primary
                            frameless
                            onClick={() => setShowPopover(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Popover>
        </React.Fragment>
    );
};

storiesOf("General components/Popover", module)
    .addParameters({ jest: ["Popover.stories"] })
    .add("Inline", () => (
        <div>
            <Popover isOpen>
                <div style={{ padding: 8 }}>Some content</div>
            </Popover>
        </div>
    ))
    .add("Relative", () => <ControlledPopover />);
