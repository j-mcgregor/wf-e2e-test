import {useRouter} from 'next/router';
import React, {useEffect,useRef} from 'react'

import useOnScreen from '../../hooks/useOnScreen';


const HashHeader = ({text, classname}: { text: string, classname: string }) => {

    const headerRef = useRef<HTMLDivElement>(null);
    const {asPath, push} = useRouter()
    const isOnScreen = useOnScreen(headerRef)

    useEffect(() => {
        if (isOnScreen) {
            push(`${asPath.replace(/#[\w+ -]+/, '')}#${text.toLowerCase().replace(/ /g, '-')}`,
                undefined, {shallow: true});
        }
    //FIXME: linter suggested this, i don't see why, maybe have a look @sam
    }, [isOnScreen])

    return (
        <h3 className={classname} ref={headerRef}>
            {text}
        </h3>
    )
}

export default HashHeader


