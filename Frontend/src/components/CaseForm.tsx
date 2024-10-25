import React, { useState, useEffect } from "react";

interface CaseFormData {
    caseNumber: string;
    title: string;
    description: string;
    filedDate: string;
    caseStatus: string;
    officerInChargeID: string;
    criminalID: string;
}

interface CaseFormProps {
    onSubmit: (data: CaseFormData) => void;
    initialData?: CaseFormData;
}

const CaseForm: React.FC<CaseFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<CaseFormData>({
        caseNumber: " ",
    title: " ",
    description: "", 
    caseStatus: "",
    officerInChargeID: "",
    criminalID: "",
    filedDate: new Date().toISOString().split('T')[0], 
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-black bg-opacity-50 p-8 ml-60 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Case Number</label>
                    <input
                        type="text"
                        name="caseNumber"
                        value={formData.caseNumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Filed Date</label>
                    <input
                        type="date"
                        name="filedDate"
                        value={formData.filedDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Case Status</label>
                    <input
                        type="text"
                        name="caseStatus"
                        value={formData.caseStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">OfficerInCharge ID</label>
                    <input
                        type="text"
                        name="officerInChargeID"
                        value={formData.officerInChargeID}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Criminal ID</label>
                    <input
                        type="text"
                        name="criminalID"
                        value={formData.criminalID}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div className="col-span-3 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md w-48"
                    >
                        {initialData ? 'Update ' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CaseForm;
