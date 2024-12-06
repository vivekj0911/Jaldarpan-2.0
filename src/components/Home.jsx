import React from 'react';
import '../index.css';
import About from './About';
import Description from './Description';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-screen bg-cover bg-center" id="home" style={{ backgroundImage: `url('./src/assets/bg.jpg')` }}>
                <div className="flex flex-col justify-center items-center h-full z-10 relative text-center px-6">
                    {/* Hero Title */}
                    <div className="mb-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow-lg">
                            Jaldarpan
                        </h1>
                    </div>
                    {/* Hero Subtitle */}
                    <div>
                        <h3 className="text-lg md:text-2xl text-secondary font-medium drop-shadow-sm">
                            Real-Time Insights and Alerts
                        </h3>
                    </div>
                </div>
            </section>
            {/* Additional Sections */}
            <Description />
            <About />
        </>
    );
};

export default Home;
