import React, { useState, useEffect } from "react";

interface OfficerFormData {
    officerName:string;
    passwordHash:string;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
    phone:string;
    dateJoined:string;
}

interface OfficerFormProps {
    onSubmit: (data: OfficerFormData) => void;
    initialData?: OfficerFormData;
}

const OfficerForm: React.FC<OfficerFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<OfficerFormData>({
        officerName:"",
        passwordHash:"",
        email:"",
        firstName:"",
        lastName:"",
        role:"",
        phone:"",
        dateJoined:new Date().toISOString().split('T')[0], 
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
                    <label className="block text-yellow-400 font-bold mb-2">User Name</label>
                    <input
                        type="text"
                        name="officerName"
                        value={formData.officerName}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Password</label>
                    <input
                        type="text"
                        name="passwordHash"
                        value={formData.passwordHash}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>

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
                    <label className="block text-yellow-400 font-bold mb-2">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Phone Number</label>
                    <input
                        type="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-yellow-500 rounded-md bg-transparent text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-400 font-bold mb-2">Date Joined</label>
                    <input
                        type="date"
                        name="dateJoined"
                        value={formData.dateJoined}
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

export default OfficerForm;
