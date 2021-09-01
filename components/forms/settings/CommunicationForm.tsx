import React, {FC} from 'react';

import {useSettingsNavItemsProps} from "../../../hooks/useNavigation";
import HashHeader from "../../elements/HashHeader";
import {SubmitHandler, useForm} from "react-hook-form";

interface CommunicationFormProps {
    headings: useSettingsNavItemsProps[]

}
interface CommunicationFormInput {
    comments:string;
    candidates:string;
    offers:string;
}
const CommunicationForm: FC<CommunicationFormProps> = ({headings}) => {
    const { register, handleSubmit } = useForm<CommunicationFormInput>();
    // eslint-disable-next-line no-console
    const onSubmit: SubmitHandler<CommunicationFormInput> = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                        <div>
                            <HashHeader text={headings[3]['title']}
                                        classname={"text-lg leading-6 font-medium text-gray-900"}/>

                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Decide which communications you would like to receive.
                        </p>
                    </div>

                    <fieldset>
                        <legend className="text-base font-medium text-gray-900">By Email
                        </legend>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                                <div className="h-5 flex items-center">
                                    <input
                                        {...register("comments")}
                                        // value={"comments"}
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="comments"
                                           className="font-medium text-gray-700">
                                        Batch report completion
                                    </label>
                                    <p className="text-gray-500">Get notified when a batch report
                                        has completed all reports.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <div className="h-5 flex items-center">
                                        <input
                                            {...register("candidates")}
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="candidates"
                                               className="font-medium text-gray-700">
                                            Service Updates
                                        </label>
                                        <p className="text-gray-500">Get the latest updates on the
                                            Wiserfunding platform..</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-start">
                                    <div className="h-5 flex items-center">
                                        <input
                                            {...register("offers")}
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="offers"
                                               className="font-medium text-gray-700">
                                            Company updates
                                        </label>
                                        <p className="text-gray-500">Get all the latest updates
                                            relating to Wiserfunding.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        className="bg-indigo-600 border border-transparent
                        rounded-none shadow-sm py-2 px-4 inline-flex justify-center
                        text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CommunicationForm;