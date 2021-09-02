
import React from 'react';

const useOnScreen = (ref: React.RefObject<Element>) => {

  const [isIntersecting, setIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          const container = document.getElementById('secondary-layout-container')
          const top = entry.boundingClientRect.top
          const scrollTop =container.scrollTop
          const id = entry.target.id
          const halfWindowHeight = window.innerHeight /2
          // console.log(!((halfWindowHeight + scrollTop) < top &&  top > scrollTop ), id )
        }
      
        return setIntersecting(entry.isIntersecting)}
    )
    if (ref.current) observer.observe(ref.current)

    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [ref])

  return isIntersecting
}

export default useOnScreen
