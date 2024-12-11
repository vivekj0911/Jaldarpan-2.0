import React, { useState, useEffect } from "react";
import MadhyaPradeshMap from "./MadhyaPradeshMap"; // Import the map component

const Alert = () => {
  const [alertData, setAlertData] = useState(null); // State for alert details
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [role, setRole] = useState("Employee"); // State for role selection

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
    // Add additional resolve logic here (e.g., send a request to update the alert status)
  };

  const handleFakeAlert = () => {
    console.log("Marked as fake alert");
    // Add additional fake alert logic here (e.g., send a request to mark it as fake)
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

      {alertData?.alert ? (
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
            {/* Include Madhya Pradesh Map with markers */}
            <MadhyaPradeshMap
              alertLocation={{
                latitude: alertData.latitude,
                longitude: alertData.longitude,
              }}
              villageName={alertData.village}  // Pass village from alertData
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
              Fake Alert
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center h-32 mb-6">
            <p className="text-gray-500 text-lg">No Alert</p>
          </div>

          <div className="mb-6">
            {/* Include Madhya Pradesh Map without markers */}
            <MadhyaPradeshMap />
          </div>
        </>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Sr No.</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Resolved By</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm">1</td>
              <td className="px-6 py-4 text-sm">Type 1</td>
              <td className="px-6 py-4 text-sm">2023-09-15</td>
              <td className="px-6 py-4 text-sm">Pimpri, Pune</td>
              <td className="px-6 py-4 text-sm">John Doe</td>
              <td className="px-6 py-4 text-sm">
                <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary">
                  Download
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm">2</td>
              <td className="px-6 py-4 text-sm">Type 2</td>
              <td className="px-6 py-4 text-sm">2023-08-18</td>
              <td className="px-6 py-4 text-sm">Pimpri, Pune</td>
              <td className="px-6 py-4 text-sm">Jane Smith</td>
              <td className="px-6 py-4 text-sm">
                <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary">
                  Download
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Alert;
