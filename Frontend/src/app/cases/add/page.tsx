'use client'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CaseForm from '@/components/CaseForm';
import { useEffect, useState } from 'react';

interface CaseFormData {
    CaseNumber: string;
    Title: string;
    Description: string;
    FiledDate: string;
    CaseStatus: string;
    OfficerInChargeID: string;
    CriminalID: string;
}

const AddCasePage = () => {
    const [role,setRole]=useState<"admin" | "officer">("officer");
    const router = useRouter();
    useEffect(()=>{
        const storedRole=localStorage.getItem("role");
        if(storedRole === 'admin' || storedRole === "officer")
        {
            setRole(storedRole as "admin" | "officer");
        }
        else{
            router.push("/login");
        }
    },[]);
    if(!role){
        return <div>Loading....</div>
    }
    

    const handleSubmit = async (formData: CaseFormData) => {
        try {
            const response = await fetch('http://localhost:5051/api/Case', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Case added successfully!');
                router.push('/manage-cases');
            } else {
                const errorData = await response.json();
                alert('Error adding arrest: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while adding the Caase.');
        }
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
          backgroundImage: "url(/crimebg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}>
        <Sidebar role={role}/>
      <CaseForm onSubmit={handleSubmit} />
  </div>
    );
};

export default AddCasePage;
