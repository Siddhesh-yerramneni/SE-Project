import React from "react";

const teamMembers = [
  { name: "SRI SURYA TARUN NARALA", role: "Frontend Developer" },
  { name: "MEGHANA PUTTA", role: "Frontend Developer" },
  { name: "SIDDHESH YERRAMNENI", role: "Backend Developer" },
  { name: "RAJESH UPPALA", role: "Backend Developer" },
];

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">About Us</h1>
      
      <p className="text-lg text-gray-600 mb-4 text-center max-w-3xl mx-auto">
        We are a team of four Computer Science students collaborating on this project
        for our Software Engineering course. Our goal is to build a full-stack application
        that applies real-world software development principles like agile practices,
        modular design, and thorough testing.
      </p>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        This project has helped us grow as developers and as a team. We hope you enjoy exploring our work!
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Meet the Team</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
            <p className="text-gray-500 mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
