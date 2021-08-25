import React, {FC} from 'react';

interface ReportNavProps {
    current: number;
}

const ReportNav: FC<ReportNavProps> = ({current, children}) => {


    const navItems = ['Summary', 'Risk Metrics', 'Highlights', 'Financial trends', 'Corporate Governance', 'Legal Events', 'Macro Economics Trends', 'ESG', 'News']
    current = 2


//         .row {
//         display: flex; /* equal height of the children */
//     }
//
// .col {
//         flex: 1; /* additionally, equal width */
//
//         padding: 1em;
//         border: solid;
//     }
    return (
        <div className="p-4">
            <h3>Contents</h3>
            <ul>
                {navItems && navItems.map((i, index) => {


                    return (
                        <div className="flex items-center mt-3">

                            <div key={index} className={`${(current === index) ? 'bg-highlight' : 'bg-highlight-2'}` +
                            " z-10 inline rounded-full w-3 h-3 mr-3"}/>
                            <li key={index} className={`${(current === index) ? 'bg-highlight' : ''} + "  z-10 text-center"`}
                                >{i}</li>

                        </div>
                    )
                })}
            </ul>


        </div>
    );
}

export default ReportNav;