"use client";

import React from "react";

const ContactSection: React.FC = () => {
  const email = "contact" + "@" + "justinsmith.sh";

  return (
    <section className="bg-gray-100 dark:bg-[#1f2d39] py-16" id="contact">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Let&apos;s <span className="text-primary">Connect</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          I&apos;m passionate about data engineering and software development,
          always eager for new challenges. If you have exciting projects or
          opportunities, let&apos;s connect and create something amazing
          together!
        </p>
        <div className="flex justify-center">
          <a
            href={`mailto:${email}?subject=Let's%20Connect`}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Get in touch!
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
