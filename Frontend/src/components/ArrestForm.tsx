import React, { useState, useEffect } from 'react';

interface ArrestFormData {
    criminalID: string;
    arrestDate: string;
    location: string;
    charges: string;
    arrestingOfficerID: string;
    remarks: string;
}

interface ArrestFormProps {
    onSubmit: (data: ArrestFormData) => void;
    initialData?: ArrestFormData;
}

const ArrestForm: React.FC<ArrestFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<ArrestFormData>({
        criminalID: "",
        location: "",
        charges: "",
        arrestingOfficerID: "",
        remarks: "",
        arrestDate: new Date().toISOString().split('T')[0], 
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
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Charges</label>
                    <input
                        type="text"
                        name="charges"
                        value={formData.charges}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Arresting Officer ID</label>
                    <input
                        type="text"
                        name="arrestingOfficerID"
                        value={formData.arrestingOfficerID}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Remarks</label>
                    <input
                        type="text"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Arrest Date</label>
                    <input
                        type="date"
                        name="arrestDate"
                        value={formData.arrestDate}
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
                        {initialData ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ArrestForm;
