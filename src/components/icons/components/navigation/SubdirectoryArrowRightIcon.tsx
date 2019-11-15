import * as React from 'react';

import useIcon, { IconProps } from '../../../../hooks/useIcon';

const SubdirectoryArrowRightIcon = (props: IconProps) => {
    const iconFactory = useIcon(
        <path
            d="M18.9987 15.4187L14.4187 19.9987C14.0287 20.3887 13.3887 20.3887 12.9987 19.9987C12.6087 19.6087 12.6087 18.9687 12.9987 18.5787L15.8787 15.7087H5.70874C5.15874 15.7087 4.70874 15.2587 4.70874 14.7087V4.70874C4.70874 4.15874 5.15874 3.70874 5.70874 3.70874C6.25874 3.70874 6.70874 4.15874 6.70874 4.70874V13.7087H15.8787L12.9987 10.8387C12.6087 10.4487 12.6087 9.80874 12.9987 9.41874C13.3887 9.02874 14.0287 9.02874 14.4187 9.41874L18.9987 13.9987C19.3887 14.3887 19.3887 15.0287 18.9987 15.4187Z"
            fill="currentColor"
        />
    );
    return iconFactory(props);
};

export default SubdirectoryArrowRightIcon;
