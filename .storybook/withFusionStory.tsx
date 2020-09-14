import React from 'react';
import Header from '../src/components/core/Header';
import Content from '../src/components/core/Content';

export default (title: string, padding: number = 16) => (stories: () => React.ReactNode | React.ReactNode) => {
    return (
        <>
            <Header aside={null} start={null} content={null} />
            <Content>
                <div
                    style={{
                        padding,
                        height: '100%',
                        width: '100%',
                        maxWidth: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    {typeof stories === 'function' ? stories() : stories}
                </div>
            </Content>
        </>
    );
};
