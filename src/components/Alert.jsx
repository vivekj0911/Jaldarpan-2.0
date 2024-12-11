import React, { useState, useEffect } from "react";

const Alert = () => {
  const [title, setTitle] = useState("Loading..."); // State for the title
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  // Fetch title from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/get-title") // Replace with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title || "No Alert"); // Set the title from backend data
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching title:", error);
        setTitle("Error fetching title"); // Fallback title in case of error
        setIsLoading(false);
      });
  }, []);

  // Handle button clicks
  const handleResolve = () => {
    console.log("Alert resolved");
    // Add any additional logic here
  };

  const handleFakeAlert = () => {
    console.log("Marked as fake alert");
    // Add any additional logic here
  };

  return (
    <section className="bg-background font-nunito p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-primary text-xl font-bold">
          {isLoading ? "Loading..." : `${title}!!`}
        </h3>
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
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Sr No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Resolved By
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Details
              </th>
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
