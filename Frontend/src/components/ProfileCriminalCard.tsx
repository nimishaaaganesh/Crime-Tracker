import React from 'react';

interface Criminal {
  criminalID: number;
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

interface ProfileCriminalCardProps {
  criminal: Criminal | null;
  onClose: () => void;
  onDelete?: () => void;  
}

const ProfileCriminalCard: React.FC<ProfileCriminalCardProps> = ({ criminal, onClose, onDelete }) => {
  if (!criminal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="text-yellow-400 float-right">X</button>
        <h2 className="text-yellow-400 text-xl font-bold mb-4">Criminal Profile</h2>
        <p className="text-white"><strong>Name:</strong> {criminal.firstName} {criminal.lastName}</p>
        <p className="text-white"><strong>Gender:</strong> {criminal.gender}</p>
        <p className="text-white"><strong>Date of Birth:</strong> {new Date(criminal.dob).toLocaleDateString()}</p>
        <p className="text-white"><strong>Nationality:</strong> {criminal.nationality}</p>
        <p className="text-white"><strong>Address:</strong> {criminal.address}</p>
        <p className="text-white"><strong>Phone:</strong> {criminal.phone}</p>
        <p className="text-white"><strong>Physical Marks:</strong> {criminal.physicalMarks}</p>
        <p className="text-white"><strong>Known Aliases:</strong> {criminal.knownAliases}</p>
        <p className="text-white"><strong>Status:</strong> {criminal.criminalStatus}</p>
        <p className="text-white"><strong>Date Added:</strong> {new Date(criminal.dateAdded).toLocaleDateString()}</p>

        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 mt-4 rounded w-full"
          >
            Delete Criminal
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCriminalCard;
