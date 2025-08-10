import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        setError("Failed to fetch employee details.");
      }
    };
    fetchEmployee();
  }, [id]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!employee) {
    return <div className="p-4">Loading employee profile...</div>;
  }

  const { fullName, email, PhoneNumber, designation, successlevel, linkedIn, github, twitter, companyId } = employee;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{fullName}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">Designation</p>
          <p className="font-semibold">{designation}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="font-semibold">{PhoneNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Success Level</p>
          <p className="font-semibold">{successlevel} / 10</p>
        </div>
      </div>

      {companyId && (
        <div className="mb-6">
          <p className="text-sm text-gray-500">Company</p>
          <Link
            to={`/companies/${companyId._id}`}
            className="text-blue-600 hover:underline font-semibold"
          >
            {companyId.name} ({companyId.type})
          </Link>
          <p className="text-sm text-gray-600">{companyId.industry} – {companyId.location}</p>
        </div>
      )}

      <div className="flex space-x-4">
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
            LinkedIn
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
            GitHub
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Twitter
          </a>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
