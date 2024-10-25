import React from 'react';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "url(/backgroundcrms.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>

      <main className="flex-grow pt-16 pb-16"> 
        <div className="flex">
          <div className="w-1/2 p-10">
            <h1 className="text-8xl font-serif text-yellow-500" style={{ textShadow: "3px 3px 6px black" }}>
              Criminal Report Management System
            </h1>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-center p-10">
            <h1 className="text-6xl font-bold text-black-400 mb-4" style={{ textShadow: "1px 1px 2px yellow" }}>
              Welcome!
            </h1>
            <p className="bg-opacity-75 p-4 rounded shadow-lg text-2xl text-center text-black" style={{ textShadow: "1px 1px 2px yellow" }}>
              "Experience seamless management of criminal data with<br /> the Criminal
              Report Management System, your comprehensive solution for tracking<br />
              cases and supporting law enforcement efforts."
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default MainPage;
