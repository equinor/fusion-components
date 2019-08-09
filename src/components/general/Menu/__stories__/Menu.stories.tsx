import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import withFusionStory from "../../../../../.storybook/withFusionStory";
import Menu from "../index";

const MenuStory = () => {
    const [ref, setRef] = React.useState<HTMLElement | null>(null);

    return (
        <React.Fragment>
        <input placeholder="Focus here to navigate" ref={setRef} />
            <Menu
                onClick={action("click")}
                keyboardNavigationRef={ref}
                sections={[
                    {
                        key: "This is the only section, but I still need a key",
                        items: [
                            {
                                key: "1",
                                title: "First",
                            },
                            {
                                key: "2",
                                title: "Selected",
                                isSelected: true,
                            },
                            {
                                key: "3",
                                title: "Disabled",
                                isDisabled: true,
                            },
                            {
                                key: "4",
                                title: "Last",
                            },
                        ],
                    },
                ]}
            />
        </React.Fragment>
    );
};

storiesOf("General|Menu", module)
    .addDecorator(withFusionStory("Menu"))
    .add("Default", () => <MenuStory />);
