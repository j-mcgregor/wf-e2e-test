import React from 'react';

export interface IconTagProps {
    // eslint-disable-next-line no-unused-vars
    icon: (props: React.ComponentProps<'svg'>)=> JSX.Element
    className?: string;
}

const IconTag = (props: IconTagProps) => {
    const TagName = props.icon;
    return <TagName className={props.className}/>
}
export default IconTag;