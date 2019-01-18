import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import Button from "components/general/Button";
import Popover from "../";

const eventsFromNames = actions("onClose");

class RelativePopoverContainer extends Component {
    state = {
        showPopover: false,
    };

    button = React.createRef();

    onClose = () => {
        this.setState({ showPopover: false });
        eventsFromNames.onClose();
    }

    render() {
        const { showPopover } = this.state;

        return (
            <React.Fragment>
                <Button primary contained onClick={() => this.setState({ showPopover: !showPopover })} ref={this.button}>Click me</Button>
                <Popover isOpen={showPopover} relativeTo={this.button.current} onClose={this.onClose}>
                    <div style={{ padding: 8, width: 400, fontFamily: "Equinor" }}>
                        <h2>Hello there!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mi eu ipsum venenatis aliquam nec auctor ante. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        <div style={{ textAlign: "right" }}>
                            <Button small primary frameless onClick={() => this.setState({ showPopover: false })}>Close</Button>
                        </div>
                    </div>
                </Popover>
            </React.Fragment>
        );
    }
}

storiesOf("General components/Popover", module)
    .addParameters({ jest: [ "Popover.stories" ] })
    .add("Inline", () => (
        <div>
            <Popover
                isOpen
                {...eventsFromNames}
            >
                <div style={{ padding: 8 }}>
                    Some content
                </div>
            </Popover>
        </div>
    ))
    .add("Relative", () => <RelativePopoverContainer />);