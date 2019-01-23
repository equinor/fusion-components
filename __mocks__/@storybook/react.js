import renderer from "react-test-renderer";

export const action = (actionName) => jest.fn();

export const storiesOf = groupName => {
    const api = {
        parameters: {
            includeVisualTesting: true,
        },

        add(storyName, story) {
            describe(groupName, () => {
                it(storyName, () => {
                    const component = renderer.create(story());

                    expect(component.toJSON()).toMatchSnapshot(
                        `${groupName}.${storyName}`
                    );
                });

                if(api.parameters.includeVisualTesting) {
                    it("visually looks correct", async () => {
                        // APIs from jest-puppeteer
                        await page.goto(`http://localhost:9002/iframe.html?selectedKind=${encodeURIComponent(groupName)}&selectedStory=${encodeURIComponent(storyName)}`);
                        const image = await page.screenshot();

                        // API from jest-image-snapshot
                        expect(image).toMatchImageSnapshot();
                    });
                }
            });

            return api;
        },

        addDecorator() {
            return api;
        },

        addParameters(parameters) {
            api.parameters = { ...api.parameters, ...parameters };
            return api;
        },
    };

    return api;
};

export const addDecorator = () => {};