import React, { useState, useEffect } from "react";
import MadhyaPradeshMap from "./MadhyaPradeshMap"; // Import the map component

const Alert = () => {
  const [alertData, setAlertData] = useState(null); // State for alert details
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [role, setRole] = useState("Employee"); // State for role selection
  const [totalStations, setTotalStations] = useState(150); // Total number of stations
  const [monitoredStations, setMonitoredStations] = useState(87);
  
  useEffect(() => {
    // Fetch alert details from the backend
    fetch("http://localhost:5000/api/alert") // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setAlertData(data); // Set the fetched alert data
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching alert data:", error);
        setAlertData(null); // Fallback if fetching fails
        setIsLoading(false);
      });
  }, []);

  const handleResolve = () => {
    console.log("Alert resolved");
    // Send resolved status to the server (this will need an endpoint to update alert status)
    sendAlertDataToServer({ alert: false });
  };

  const handleFakeAlert = () => {
    console.log("Marked as fake alert");
    // Send fake alert status to the server (this will need an endpoint to update alert status)
    sendAlertDataToServer({ alert: false });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <section className="bg-background font-nunito p-6 rounded-lg shadow-md">
      <div className="mb-6 text-center">
        <h3 className="text-primary text-xl font-bold">
          {isLoading ? "Loading..." : alertData?.alert ? "Alert Active!!" : "No Alert"}
        </h3>
      </div>

      {/* Dropdown for selecting Employee or Admin */}
      <div className="mb-6">
        <label htmlFor="role" className="text-lg font-semibold">Select Role:</label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          className="mt-2  p-2 border border-gray-300 rounded-md"
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {role === "Admin" ? (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Total Stations */}
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-primary font-nunito">Total Stations</h3>
    <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
      <span>{totalStations}</span>
    </div>
  </div>

  {/* Monitored Stations */}
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-primary font-nunito">Monitored Stations</h3>
    <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
      <span>{monitoredStations}</span>
    </div>
  </div>
</div>


          <div className="my-6">
          {/* Include Madhya Pradesh Map with multiple markers for Admin */}
          <MadhyaPradeshMap
            alertData={alertData} // Pass the alertData array for admin role
            totalStations={totalStations} // Passing stats for Admin
            monitoredStations={monitoredStations}
          />
        </div>
        </>
      ) : (
        alertData?.alert && (
          <>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Telemetry UID */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary font-nunito">Telemetry UID</h3>
                <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
                  <span>{alertData.telemetryUID}</span>
                </div>
              </div>

              {/* District */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary font-nunito">District</h3>
                <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
                  <span>{alertData.district}</span>
                </div>
              </div>

              {/* Tahsil */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary font-nunito">Tahsil</h3>
                <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
                  <span>{alertData.tahsil}</span>
                </div>
              </div>

              {/* Village */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-primary font-nunito">Village</h3>
                <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
                  <span>{alertData.village}</span>
                </div>
              </div>
            </div>

            <div className="my-6">
              {/* Include Madhya Pradesh Map with alert location */}
              <MadhyaPradeshMap
                alertLocation={{
                  latitude: alertData.latitude,
                  longitude: alertData.longitude,
                }}
                villageName={alertData.village}
              />
            </div>

            <div className="flex gap-4 mb-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                onClick={handleResolve}
              >
                Resolved
              </button>
              <button
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
                onClick={handleFakeAlert}
              >
                False Alert
              </button>
            </div>
          </>
        )
      )}
    </section>
  );
};

export default Alert;
