import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const SubdirectoryArrowLeftIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M5.00124 15.4187L9.58124 19.9987C9.97124 20.3887 10.6112 20.3887 11.0012 19.9987C11.3912 19.6087 11.3912 18.9687 11.0012 18.5787L8.12124 15.7087H18.2912C18.8412 15.7087 19.2912 15.2587 19.2912 14.7087V4.70874C19.2912 4.15874 18.8412 3.70874 18.2912 3.70874C17.7412 3.70874 17.2912 4.15874 17.2912 4.70874V13.7087H8.12124L11.0012 10.8387C11.3912 10.4487 11.3912 9.80874 11.0012 9.41874C10.6112 9.02874 9.97124 9.02874 9.58124 9.41874L5.00124 13.9987C4.61124 14.3887 4.61124 15.0287 5.00124 15.4187Z"
            fill="currentColor"
        />

    );
    return iconFactory(props);
};

export default SubdirectoryArrowLeftIcon;
