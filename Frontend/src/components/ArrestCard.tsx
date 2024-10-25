import React from 'react';

interface Arrest {
    arrestID: number;
    criminalID: string;
    arrestDate: string;
    location: string;
    charges: string;
    arrestingOfficerID: string;
    remarks: string;
}

interface ArrestCardProps {
    arrest: Arrest | null;
    onClose: () => void;
    onDelete: (arrestId: number) => Promise<void>;
    onEdit: (arrestId: number) => Promise<void>;
}

const ArrestCard: React.FC<ArrestCardProps> = ({ arrest, onClose, onDelete, onEdit }) => {

    if (!arrest) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <button onClick={onClose} className="text-yellow-400 float-right">X</button>
                <h2 className="text-yellow-400 text-xl font-bold mb-4">Arrest Details</h2>
                <p className="text-white"><strong>Criminal Id:</strong> {arrest.criminalID}</p>
                <p className="text-white"><strong>Officer Id:</strong> {arrest.arrestingOfficerID}</p>
                <p className="text-white"><strong>Location:</strong> {arrest.location}</p>
                <p className="text-white"><strong>Charges:</strong> {arrest.charges}</p>
                <p className="text-white"><strong>Remarks:</strong> {arrest.remarks}</p>
                <p className="text-white"><strong>Arrest Date:</strong> {new Date(arrest.arrestDate).toLocaleDateString()}</p>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => onEdit(arrest.arrestID)} 
                        // onClick={()=>console.log(arrest.arrestID)}
                        className="bg-blue-500 text-white p-2 rounded w-48 mr-2"
                    >
                        Edit
                    </button>
                    
                    <button
                        onClick={() => onDelete(arrest.arrestID)}
                        className="bg-red-500 text-white p-2 rounded w-48"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArrestCard;
