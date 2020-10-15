import React from 'react';
import Header from '../src/components/core/Header';
import Content from '../src/components/core/Content';
import Overlay from '../src/components/general/ApplicationGuidance/components/Overlay';

export default (title: string, padding: number = 16) => (stories: () => React.ReactNode) => {
    return (
        <>
            <Overlay fixed>
                <Header aside={null} start={null} content={null} />
            </Overlay>
            <Content>
                <Overlay>
                    <div
                        style={{
                            padding,
                            minHeight: '100%',
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        {stories()}
                    </div>
                </Overlay>
            </Content>
        </>
    );
};
