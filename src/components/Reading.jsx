import React, { useState } from 'react';
import '../index.css';

const Reading = () => {
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedReportType, setSelectedReportType] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    return (
        <div className="container mx-auto p-6 bg-background">
            {/* Search Area */}
            <section className="my-4 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-primary font-nunito">Current Location</h3>
                        <p className="text-lg text-text font-nunito">Pimpri, Pune 411018</p>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['State', 'District', 'Pincode'].map((label, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-primary font-nunito">{label}</h3>
                            <select
                                id={label.toLowerCase()}
                                className="mt-2 p-2 w-full border border-gray-300 rounded-md text-text"
                                value={
                                    label === 'State'
                                        ? selectedState
                                        : label === 'District'
                                        ? selectedDistrict
                                        : ''
                                }
                                onChange={(e) =>
                                    label === 'State'
                                        ? setSelectedState(e.target.value)
                                        : setSelectedDistrict(e.target.value)
                                }
                            >
                                <option value="">Select</option>
                                {label === 'State' && (
                                    <>
                                        <option value="california">California</option>
                                        <option value="texas">Texas</option>
                                    </>
                                )}
                                {label === 'District' && (
                                    <>
                                        <option value="district2">District 2</option>
                                        <option value="district3">District 3</option>
                                    </>
                                )}
                                {label === 'Pincode' && <option value="411018">411018</option>}
                            </select>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reading Section with Charts */}
            <section className="mb-10">
                <div className="flex justify-between gap-6">
                    {['Chart', 'Area Chart'].map((altText, index) => (
                        <div key={index} className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src={`./src/assets/${altText.toLowerCase().replace(' ', '-')}.png`}
                                alt={altText}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Alert History Section */}
            <section className="alert mb-10">
                <h3 className="text-2xl font-semibold text-primary mb-6 font-nunito">Alert History</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    {['Sr No.', 'Type', 'Date', 'Location', 'Resolved By', 'Details'].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-2 text-left text-primary font-nunito"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2].map((row, index) => (
                                    <tr key={index}>
                                        {['1', 'Type 1', '2023-09-15', 'Pimpri, Pune', 'John Doe', 'Download'].map(
                                            (content, i) => (
                                                <td key={i} className="px-4 py-2 text-text font-nunito">
                                                    {i === 5 ? (
                                                        <button className="bg-primary text-white p-2 rounded-md">
                                                            {content}
                                                        </button>
                                                    ) : (
                                                        content
                                                    )}
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Past Analytics Section */}
            <section className="report mb-10">
                <h3 className="text-2xl font-semibold text-primary mb-6 font-nunito">Past Analytics</h3>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {/* Duration Filter */}
                    <div className="mb-4">
                        <label className="block text-lg text-primary mb-2 font-nunito">Duration:</label>
                        <div className="flex gap-6">
                            {['Monthly', 'Weekly', 'Yearly'].map((duration) => (
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

                    {/* Report Type */}
                    <div className="mb-4">
                        <label className="block text-lg text-primary mb-2 font-nunito">Report Type:</label>
                        <select
                            className="p-2 w-full border border-gray-300 rounded-md text-text"
                            value={selectedReportType}
                            onChange={(e) => setSelectedReportType(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="sales">Sales</option>
                            <option value="inventory">Inventory</option>
                        </select>
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

export default Reading;
