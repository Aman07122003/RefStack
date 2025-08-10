import React from "react";
import { Link } from "react-router-dom";

const Companies = () => {
  // Sample placeholder data
  const companies = [
    {
      _id: "64b12c34abc1234567890def",
      name: "RefStack Technologies",
      industry: "Software",
      location: "Bangalore, India",
      type: "Startup",
    },
    {
      _id: "64b12c34abc1234567890fed",
      name: "TechNova Solutions",
      industry: "IT Services",
      location: "Gurgaon, India",
      type: "Service",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link
          to="/companies/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Company
        </Link>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Industry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company._id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.industry}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{company.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link
                    to={`/companies/${company._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/companies/${company._id}/edit`}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => console.log(`Delete ${company._id}`)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Companies;
