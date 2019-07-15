import React from "react";
import Header from "../src/components/core/Header";
import Content from "../src/components/core/Content";

export default (title: string) => (stories: () => React.ReactNode) => {
    return (
        <>
            <Header
                aside={null}
                start={null}
                content={<div>{title}</div>}
            />
            <Content>
                <div style={{ padding: 16, height: "100%", boxSizing: "border-box" }}>
                    {stories()}
                </div>
            </Content>
        </>
    );
};