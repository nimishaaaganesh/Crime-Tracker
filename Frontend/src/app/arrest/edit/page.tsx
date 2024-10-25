"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ArrestForm from "@/components/ArrestForm";

interface ArrestFormData {
  criminalID: string;
  arrestDate: string;
  location: string;
  charges: string;
  arrestingOfficerID: string;
  remarks: string;
}

const EditSearchPage = () => {
  const [role, setRole] = useState<"admin" | "officer">("officer");
  const [searchTerm, setSearchTerm] = useState("");
  const [arrestData, setArrestData] = useState<ArrestFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "admin" || storedRole === "officer") {
      setRole(storedRole as "admin" | "officer");
    } else {
      router.push("/login");
    }
  }, [router]);

  const searchArrest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5051/api/Arrest/Search?query=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setArrestData({
            criminalID: data.criminalID,
            arrestDate: data.arrestDate ? data.arrestDate.split("T")[0] : "",
            location: data.location,
            charges: data.charges,
            arrestingOfficerID: data.arrestingOfficerID,
            remarks: data.remarks,
          });
          console.log("Arrest Data:", data);
        } else {
          alert("No arrest found with the provided ID.");
          setArrestData(null);
        }
      } else {
        alert("Error searching for arrest.");
      }
    } catch (error) {
      console.error("Error searching for arrest:", error);
    }
    setLoading(false);
  };

  const handleUpdate = async (formData: ArrestFormData) => {
    try {
      const response = await fetch(
        `http://localhost:5051/api/Arrest/${searchTerm}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Arrest updated successfully!");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert("Error updating arrest: " + errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while updating the arrest.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      style={{
        backgroundImage: "url(/crimebg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Sidebar role={role} />

      <div className="p-6 bg-black bg-opacity-50 rounded-md shadow-md w-4/5 md:w-2/5 mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Criminal ID"
            className="border border-yellow-500 rounded-md p-2 w-full bg-transparent text-white placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={searchArrest}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>

      {loading && <div>Loading arrest data...</div>}

      {arrestData ? (
        <ArrestForm onSubmit={handleUpdate} initialData={arrestData} />
      ) : (
        <div className="text-gray-200">
          No arrest data found. Please search using a valid ID.
        </div>
      )}
    </div>
  );
};

export default EditSearchPage;
