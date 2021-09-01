import { useRouter } from 'next/router';
import React, { useRef } from 'react'

import useOnScreen from '../../hooks/useOnScreen';


const HashHeader = ({ text }: { text: string}) => {

  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const isOnScreen = useOnScreen(headerRef)
  
  React.useEffect(() => {
    if (isOnScreen) {
      router.push(`${router.asPath.replace(/#[\w+ -]+/, '')}#${text.toLowerCase().replace(/ /g, '-')}`, undefined, { shallow: true });
    }

  }, [isOnScreen])

  return (
    <h2 ref={headerRef}>
      { text }
    </h2>
  )
}

export default HashHeader


