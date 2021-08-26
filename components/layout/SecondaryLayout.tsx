import React, {FC, useEffect} from 'react';
import {useRouter} from "next/router";

interface SeconcaryLayoutProps {
    content: string[]
}

const SecondaryLayout: FC<SeconcaryLayoutProps> = ({children, content}) => {
    // return router.push(`${path}#${_value}`, undefined, {shallow: true})
    const router = useRouter()
    //FIXME: i removed a 'redundant escape character' here, if it breaks, its probably here id check first
    // original:  "const s = ss.replace(/#/g, '')"
    function titleCase(ss: string) {
        const s = ss.replace(/#/g, '')
        const splitStr = s.toLowerCase().split('_');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join('_');
    }

    useEffect(() => {
        const asPath = router.asPath.replace(/\//g, "").toLowerCase()
        const capitalAsPath = titleCase(asPath)
        const el1 = document.querySelector(`#${capitalAsPath}`)



        if(el1 && capitalAsPath === el1.id){
            console.log({hi: el1 && capitalAsPath === el1.id})
            el1.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }, [router.asPath])


    return (
        <>
            {/*FIXME: instead of adding a new colour ive used a tw bg*/}
            <aside className="hidden bg-gray-300 lg:flex lg:flex-shrink-0">
                <div className="w-64 flex flex-col">
                    {children}
                </div>
            </aside>
            <div className="z-10 bg-gray-100 w-full p-20 overflow-scroll">overflow scroll container
                {content && content.map((c) => {
                    const regexValue = c.replace(/\s/g, "_")
                    // console.log({regexValue})
                    return (
                        <div
                            id={regexValue}
                            // ref={(r) => {
                            //     // @ts-ignore
                            //     ref.current[regexValue] = r
                            // }}
                            className="bg-gray-900 text-white w-full mt-64"
                        >{c}</div>
                    )
                })
                }
            </div>
        </>
    );
}

export default SecondaryLayout;