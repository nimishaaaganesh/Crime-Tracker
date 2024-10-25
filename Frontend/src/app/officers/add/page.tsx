'use client'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import OfficerForm from '@/components/OfficerForm';
import { useEffect, useState } from 'react';

interface OfficerFormData {
    OfficerName:string;
    PasswordHash:string;
    Email:string;
    FirstName:string;
    LastName:string;
    Role:string;
    Phone:string;
    DateJoined:string;
}

const AddOfficerPage = () => {
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

    const handleSubmit = async (formData: OfficerFormData) => {
        try {
            const response = await fetch('http://localhost:5051/api/Officers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Officer added successfully!');
                router.push('/manage-officer');
            } else {
                const errorData = await response.json();
                alert('Error adding officer: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while adding the officer.');
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
      <OfficerForm onSubmit={handleSubmit} />
  </div>
    );
};

export default AddOfficerPage;
