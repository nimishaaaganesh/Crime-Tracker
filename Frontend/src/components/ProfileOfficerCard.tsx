import React from 'react';

interface Officer {
  officerId:number;
  firstName:string;
  lastName:string;
  role:string;
  email:string;
  phone:string;
  dateJoined:string;
  officerName:string;
  passwordHash:string;
}

interface ProfileOfficerCardProps {
  officer: Officer | null;
  onClose: () => void;
  onDelete?: () => void;  
}

const ProfileOfficerCard: React.FC<ProfileOfficerCardProps> = ({ officer, onClose, onDelete }) => {
  if (!officer) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="text-yellow-400 float-right">X</button>
        <h2 className="text-yellow-400 text-xl font-bold mb-4">Officer Profile</h2>
        <p className="text-white"><strong>Name:</strong> {officer.firstName} {officer.lastName}</p>
        <p className="text-white"><strong>Role:</strong> {officer.role}</p>
        <p className="text-white"><strong>Email:</strong> {officer.email}</p>
        <p className="text-white"><strong>Phone:</strong> {officer.phone}</p>
        <p className="text-white"><strong>User Name:</strong> {officer.officerName}</p>
        <p className="text-white"><strong>Password:</strong> {officer.passwordHash}</p>
        <p className="text-white"><strong>Date Joined:</strong> {new Date(officer.dateJoined).toLocaleDateString()}</p>
       
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 mt-4 rounded w-full"
          >
            Delete Officer
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileOfficerCard;
