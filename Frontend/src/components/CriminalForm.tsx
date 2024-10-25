import React, { useState, useEffect } from "react";

interface CriminalFormData {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    nationality: string;
    address: string;
    phone: string;
    physicalMarks: string;
    knownAliases: string;
    criminalStatus: string;
    dateAdded: string;
}

interface CriminalFormProps {
    onSubmit: (data: CriminalFormData) => void;
    initialData?: CriminalFormData;
}

const CriminalForm: React.FC<CriminalFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<CriminalFormData>({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        nationality: "",
        address: "",
        phone: "",
        physicalMarks: "",
        knownAliases: "",
        criminalStatus: "",
        dateAdded: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        console.log("Intial Data:",initialData)
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
                    <label className="block text-yellow-400 font-bold mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-black"
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Nationality</label>
                    <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Physical Marks</label>
                    <input
                        type="text"
                        name="physicalMarks"
                        value={formData.physicalMarks}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Known Aliases</label>
                    <input
                        type="text"
                        name="knownAliases"
                        value={formData.knownAliases}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                    />
                </div>

                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Criminal Status</label>
                    <input
                        type="text"
                        name="criminalStatus"
                        value={formData.criminalStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Date Added</label>
                    <input
                        type="date"
                        name="dateAdded"
                        value={formData.dateAdded}
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

export default CriminalForm;
