import renderer from 'react-test-renderer';
import addons, { mockChannel } from '@storybook/addons';
import { withFusionContext } from '../../.storybook/withFusionContext';

addons.setChannel(mockChannel());

export const action = (actionName) => jest.fn();
const fusionContext = withFusionContext();
export const storiesOf = (groupName) => {
    const api = {
        decorators: [],
        parameters: {},

        add(storyName, story) {
            if (api.parameters.skipTest) {
                return;
            }

            describe(groupName, () => {
                it(storyName, () => {
                    // const decoratedStory = api.decorators.reduce((s, decorator) => {
                    //     try {
                    //         return decorator(s, { parameters: api.parameters });
                    //     } catch (e) {
                    //         return s;
                    //     }
                    // }, story);

                    const component = renderer.create(fusionContext(story));

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

        addParameters(parameters) {
            api.parameters = { ...api.parameters, ...parameters };
            return api;
        },
    };

    return api;
};

export const addDecorator = () => {};
