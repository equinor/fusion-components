import renderer from 'react-test-renderer';

export const action = actionName => jest.fn();

export const storiesOf = groupName => {
    const api = {
        add(storyName, story) {
            describe(groupName, () => {
                it(storyName, () => {
                    const component = renderer.create(story());

                    // @TODO Enable custom names once released:
                    // > https://github.com/facebook/jest/pull/2094
                    expect(component.toJSON())
                        .toMatchSnapshot
                        // `${groupName}.${storyName}`
                        ();
                });
            });

            return api;
        },

        addDecorator() {
            return api;
        },

        addParameters() {
            return api;
        },
    };

    return api;
};

export const addDecorator = () => {};
