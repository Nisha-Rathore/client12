import React from "react";
import { ShieldCheck, Lock, CreditCard, Eye, Server, Key } from "lucide-react";
import Layout from "../../components/Layout";

const securityFeatures = [
  {
    id: 1,
    title: "Member Data Protection",
    description:
      "All personal and health data is securely encrypted using AES-256 technology to prevent unauthorized access.",
    icon: <ShieldCheck className="text-blue-500 w-8 h-8" />,
  },
  {
    id: 2,
    title: "Secure Authentication",
    description:
      "Multi-level authentication ensures only authorized users and admins can access sensitive gym data.",
    icon: <Lock className="text-green-500 w-8 h-8" />,
  },
  {
    id: 3,
    title: "Safe Online Payments",
    description:
      "We integrate trusted payment gateways with SSL certification to ensure 100% secure transactions.",
    icon: <CreditCard className="text-purple-500 w-8 h-8" />,
  },
  {
    id: 4,
    title: "Activity Monitoring",
    description:
      "Every login, update, and transaction is logged and monitored to detect unusual activities instantly.",
    icon: <Eye className="text-orange-500 w-8 h-8" />,
  },
  {
    id: 5,
    title: "Cloud Backup & Recovery",
    description:
      "Automatic daily backups to secure cloud servers protect gym data against loss or corruption.",
    icon: <Server className="text-cyan-500 w-8 h-8" />,
  },
  {
    id: 6,
    title: "Role-Based Access Control",
    description:
      "Admins, trainers, and members get custom access levels — keeping the system safe and organized.",
    icon: <Key className="text-pink-500 w-8 h-8" />,
  },
];

const Security = () => {
  return (
    <Layout>
        <section className="min-h-screen bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          Security at Our Gym Management System
        </h1>
        <p className="text-gray-300 text-lg">
          We prioritize your privacy and data protection with advanced security practices and
          trusted technologies.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {securityFeatures.map((feature) => (
          <div
            key={feature.id}
            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
          Learn More About Our Security
        </button>
      </div>
    </section>
    </Layout>
  );
};

export default Security;