import React, { useState, useEffect } from "react";
import MadhyaPradeshMap from "./MadhyaPradeshMap"; // Import the map component

const Alert = () => {
  const [alertData, setAlertData] = useState(null); // State for alert details
  const [isLoading, setIsLoading] = useState(true); // State for loading status

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

  return (
    <section className="bg-background font-nunito p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-primary text-xl font-bold">
          {isLoading ? "Loading..." : alertData?.alert ? "Alert Active!!" : "No Alert"}
        </h3>
      </div>

      {alertData?.alert && (
        <div className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
          <p><strong>Telemetry UID:</strong> {alertData.telemetryUID}</p>
          <p><strong>District:</strong> {alertData.district}</p>
          <p><strong>Tahsil:</strong> {alertData.tahsil}</p>
          <p><strong>Village:</strong> {alertData.village}</p>
        </div>
      )}

      <div className="mb-6">
        {/* Include Madhya Pradesh Map and pass alert location data */}
        {alertData?.alert && (
          <MadhyaPradeshMap
            alertLocation={{
              latitude: alertData.latitude,
              longitude: alertData.longitude,
            }}
          />
        )}
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
