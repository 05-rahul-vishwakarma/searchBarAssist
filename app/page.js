/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import data from "./webdata/studentData.json";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setStudents(data);
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 min-h-screen p-6">
      {/* Top bar with search and profile */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg px-4 py-2 w-full sm:w-64 outline-none mb-4 sm:mb-0"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <span className="font-bold text-lg sm:text-sm">Priya Sharma</span>
          <img
            src={"https://randomuser.me/api/portraits/women/50.jpg"}
            alt="profile"
            className="w-14 h-14 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-end space-x-4 mb-8">
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-md ${
            filterStatus === "all" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-md ${
            filterStatus === "active" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterStatus("active")}
        >
          Active
        </button>
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-md ${
            filterStatus === "inactive" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterStatus("inactive")}
        >
          Inactive
        </button>
      </div>

      {/* Employee cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-[#ffffff44] p-6 rounded-lg shadow-lg space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={student.avatar}
                alt={student.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p className="text-gray-500">{student.role}</p>
                <p className="text-gray-400">{student.email}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-6 ">
              <button className="px-5 py-1 bg-[#ffffff2f] border-[1px] border-[black] text-[black] rounded-md">
                Block
              </button>
              <button className="px-5 py-1 bg-[black] text-white rounded-md">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
