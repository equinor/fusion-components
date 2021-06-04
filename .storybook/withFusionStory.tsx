import Header from '../src/components/core/Header';
import Content from '../src/components/core/Content';
import Overlay from '../src/components/general/ApplicationGuidance/components/Overlay';
import { Fragment, ReactNode } from 'react';

export default (title: string, padding: number = 16) => (stories: () => ReactNode) => {
    return (
        <Fragment>
            <Header aside={null} start={null} content={null} settings={null}/>
            <Content>
                <Overlay>
                    <div
                        style={{
                            padding,
                            height: '100%',
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                        }}
                    >{stories()}</div>
                </Overlay>
            </Content>
        </Fragment>
    );
};
