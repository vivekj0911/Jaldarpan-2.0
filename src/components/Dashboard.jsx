import React, { useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../index.css";

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
    const [selectedDuration, setSelectedDuration] = useState("");
    const [selectedReportType, setSelectedReportType] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Sample data for battery, water level, temperature, and pressure
    const waterLevelData = {
        labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12"],
        datasets: [
            {
                label: "Battery (in voltage)",
                data: [3.59, 3.59, 3.64, 3.64, 3.64, 3.60],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const waterPressureData = {
        labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12"],
        datasets: [
            {
                label: "Water Level (in meter)",
                data: [-5.28, -5.26, -5.27, -5.31, -5.32, -5.29],
                borderColor: "#28a745",
                backgroundColor: "rgba(40, 167, 69, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const temperatureData = {
        labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12"],
        datasets: [
            {
                label: "Temperature (°C)",
                data: [26.36, 26.36, 26.31, 26.33, 26.31, 26.38],
                borderColor: "#ff6347",
                backgroundColor: "rgba(255, 99, 71, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const humidityData = {
        labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12"],
        datasets: [
            {
                label: "Barometric Pressure (mH2O)",
                data: [957.99, 959.32, 960.14, 961.64, 958.99, 959.22],
                borderColor: "#ffc107",
                backgroundColor: "rgba(255, 193, 7, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="container mx-auto p-6 bg-background">
            {/* Search Area */}
            <section className="my-4 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-primary font-nunito">Current Location</h3>
                        <p className="text-lg text-text font-nunito">Daabadiya, Madhya Pradesh</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["State", "District", "Telementry_UID"].map((label, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary font-nunito">{label}</h3>
                            <div className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text">
                                {label === "State" && <span>Madhya Pradesh</span>}
                                {label === "District" && <span>Agarmalwa</span>}
                                {label === "Telementry_UID" && <span>CGWKOL0165</span>}
                            </div>
                        </div>
                    ))}
                </div>

            </section>

            {/* Reading Section with 4 Charts */}
            <section className="graphs-section mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Battery</h3>
                    <Line data={waterLevelData} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Water Level</h3>
                    <Line data={waterPressureData} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Temperature</h3>
                    <Line data={temperatureData} options={options} />
                </div>
                <div className="graph-container bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-4 font-nunito">Barometric Pressure</h3>
                    <Line data={humidityData} options={options} />
                </div>
            </section>


            {/* Past Analytics Section */}
            <section className="report mb-10">
                <h3 className="text-2xl font-semibold text-primary mb-6 font-nunito">Past Analytics</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">

                    {/* Report Type */}
                    <div className="mb-4">
                        <label className="block text-lg text-primary mb-2 font-nunito">Report Type:</label>
                        <select
                            className="p-2 w-full border border-gray-300 rounded-md text-text"
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                        >
                            <option value="" disabled>Report Type</option>
                            <option value="state">State Wise Report</option>
                            <option value="district">District Wise Report</option>
                            <option value="basin">Basin Wise Report</option>
                            <option value="subbasin">Subbasin Wise Report</option>
                        </select>
                    </div>

                    {/* Duration Filter */}
                    <div className="mb-4">
                        <label className="block text-lg text-primary mb-2 font-nunito">Duration:</label>
                        <div className="flex gap-6">
                            {["Monthly", "Weekly", "Yearly"].map((duration) => (
                                <label key={duration} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="duration"
                                        value={duration.toLowerCase()}
                                        checked={selectedDuration === duration.toLowerCase()}
                                        onChange={() => setSelectedDuration(duration.toLowerCase())}
                                        className="form-radio text-primary"
                                    />
                                    <span className="ml-2 text-text font-nunito">{duration}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Download Button */}
                    <div>
                        <button
                            className="w-full bg-primary text-white p-3 rounded-md font-nunito"
                            disabled={!selectedDuration || !selectedReportType || !selectedState || !selectedDistrict}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
