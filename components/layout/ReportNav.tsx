import React, {FC, useState} from 'react';

interface ReportNavProps {
    current: number;
}

const ReportNav: FC<ReportNavProps> = ({children}) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const navItems = ['Summary', 'Risk Metrics', 'Highlights', 'Financial trends', 'Corporate Governance', 'Legal Events', 'Macro Economics Trends', 'ESG', 'News']

    const changeSelection = (e: number) => {
        console.log({e: e})
        return setCurrentIndex(e)
    }


    return (
        <div className="p-6 mt-5">
            <h2 className="font-bold text-xl">Contents</h2>
            <div className="flow-root mt-5 p-2">
                <ul role="list" className="-mb-8">
                    {navItems.map((value, index) => (
                        <li className="cursor-pointer" key={index} onClick={() => changeSelection(index)}>
                            <div className="relative pb-6">
                                {index !== navItems.length - 1 ? (
                                    <span className="absolute top-2  h-full w-0.5 bg-gray-400"
                                          aria-hidden="true"/>
                                ) : null}
                                <div className="relative flex items-center ">
                                    <span
                                        className={`${(currentIndex === index) ? "bg-highlight ring-highlight" : "bg-gray-400 ring-gray-400"}` + " h-0.5 w-0.5 rounded-full ring-8 "}/>
                                    <p className={`${(currentIndex === index) ? 'text-highlight' : ''} + " ml-10 z-10 text-center"`}>{value}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default ReportNav;