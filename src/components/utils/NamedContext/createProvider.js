import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { contextMounted, contextUpdated, contextUnmounted } from './helpers';

export default (name) => {
    const Provider = ({ value, children }) => {
        const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            if (!isMounted) {
                setIsMounted(true);
                contextMounted(name);
            }

            contextUpdated(name, value);

            return () => contextUnmounted(name);
        }, [value]);

        return children;
    };

    Provider.propTypes = {
        value: PropTypes.shape.isRequired,
        children: PropTypes.node.isRequired,
    };

    Provider.displayName = 'NamedContextProvider';
};
