import React from 'react';

interface Case {
  caseID: number;
  caseNumber: string;
  title: string;
  description: string;
  filedDate: string;
  caseStatus: string;
  officerInChargeID: string;
  criminalID: string;
}

interface CaseCardProps {
  caseData: Case | null;
  onClose: () => void;
  onDelete?: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, onClose, onDelete }) => {
  if (!caseData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="text-yellow-400 float-right">X</button>
        <h2 className="text-yellow-400 text-xl font-bold mb-4">Case Profile</h2>
        <p className="text-white"><strong>Title:</strong> {caseData.title}</p>
        <p className="text-white"><strong>Description:</strong> {caseData.description}</p>
        <p className="text-white"><strong>Case Status:</strong> {caseData.caseStatus}</p>
        <p className="text-white"><strong>Officer In Charge ID:</strong> {caseData.officerInChargeID}</p>
        <p className="text-white"><strong>Criminal ID:</strong> {caseData.criminalID}</p>
        <p className="text-white"><strong>Filed Date:</strong> {new Date(caseData.filedDate).toLocaleDateString()}</p>

        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 mt-4 rounded w-full"
          >
            Delete Case
          </button>
        )}
      </div>
    </div>
  );
};

export default CaseCard;
