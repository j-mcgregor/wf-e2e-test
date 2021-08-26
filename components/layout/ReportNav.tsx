import React, {FC, useState} from 'react';

interface ReportNavProps {
    navItems: string[]
}

const ReportNav: FC<ReportNavProps> = ({ navItems}) => {
    const router = useRouter()

    const [currentIndex, setCurrentIndex] = useState<string>('summary')

    const changeSelection = (e: string) => {
        const path = router.pathname
        const _value = e.replace(/\s/g, "_").toLowerCase();
        setCurrentIndex(e)
        return router.push(`${path}#${_value}`, undefined, {shallow: true})
    }

    return (
        <div className="p-6 pr-0 mt-5">
            <h2 className="font-bold text-xl">Contents</h2>
            <div className="flow-root mt-5 p-2">
                <ul role="list" className="-mb-8">
                    {navItems.map((value, index) => {
                        return(
                            <li className="cursor-pointer" key={index} onClick={() => changeSelection(value)}>
                                <div className="relative pb-6">
                                    {index !== navItems.length - 1 ? (
                                        <span
                                            className={`${(currentIndex === value) ? "bg-highlight" : "bg-gray-400"}` + " absolute top-2 h-full w-0.5"}
                                            aria-hidden="true"/>
                                    ) : null}
                                    <div className="relative flex items-center ">
                                    <span
                                        className={`${(currentIndex === value) ? "bg-highlight ring-highlight" : "bg-gray-400 ring-gray-400"}` + " h-0.5 w-0.5 rounded-full ring-8 "}/>
                                        <p className={`${(currentIndex === value) ? 'text-highlight' : ''} + " ml-6 z-10 text-center"`}>{value}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    );
}

export default ReportNav;
