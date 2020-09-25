import '../src/customElements/index.ts';
import { addDecorator } from '@storybook/react';
import results from '../.jest-test-results.json';
import { withTests } from '@storybook/addon-jest';
import { withFusionContext } from './withFusionContext.tsx';

addDecorator(withFusionContext());
addDecorator(withTests({ results }));
