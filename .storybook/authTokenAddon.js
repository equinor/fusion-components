import * as React from "react";
import addons from "@storybook/addons";

const AuthTokenInput = ({ active }) => {
    const [authToken, setAuthToken] = React.useState("");

    const onAuthTokenInputChange = (e) => {
        setAuthToken(e.target.value);
        window.authContainer.setAuthToken(e.target.value);
    };

    if(!active) {
        return null;
    }

    return (
        <textarea
            onChange={onAuthTokenInputChange}
            placeholder="JWT Token"
            style={{
                margin: 24,
                width: "calc(100% - 48px)",
                height: "calc(100% - 80px)",
                borderRadius: 4,
                padding: 8,
                boxSizing: "border-box",
            }}
        >
            {authToken}
        </textarea>
    );
}

addons.register("FUSION", api => {
    addons.addPanel("FUSION/authtoken", {
        title: "Auth",
        render: ({ active, key }) => <AuthTokenInput key={key} active={active} />
    });
});