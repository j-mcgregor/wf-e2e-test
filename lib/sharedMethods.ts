export const scrollTo = (ref: { current: { scrollIntoView: (arg0: { behavior: string; block: string }) => void } }) => {
    if (ref && ref.current /* + other conditions */) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}