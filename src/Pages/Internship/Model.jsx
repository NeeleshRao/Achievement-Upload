import React, { useState } from "react";

function Model() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Energy",
    "Telecommunication",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedIndustry(option);
    setIsOpen(false);
  };

  const [typeisOpen, typesetIsOpen] = useState(false);
  const [typeselectedType, typesetSelectedType] = useState("");
  const internshipTypes = [
    "Summer Intern",
    "Associate",
    "Part-time",
    "Freelancing",
    "Virtual Internship",
    "Research Internship",
  ];

  const typetoggleDropdown = () => {
    typesetIsOpen(!typeisOpen);
  };

  const typehandleOptionClick = (option) => {
    typesetSelectedType(option);
    typesetIsOpen(false);
  };

  return (
    <div className="p-5 h-2/3 w-2/3 rounded-2xl shadow-2xl bg-white border-black-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-scroll">
      <div className=" flex flex-col pl-5 m-[15px]">
        <div className="flex flex-row">
          <h1 className="font-semibold text-xl">Add Internship</h1>
        </div>

        <div className="flex flex-row gap-6 flex-wrap p-100">
          <div className="flex flex-col">
            <p className="text-left mt-4 mb-4">Designation</p>
            <input
              type="text"
              placeholder="Enter Designation"
              className="w-[630px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
            />
            <p className="text-left mt-4 mb-4">Industry Sector</p>
            <div className="relative w-full">
              <input
                type="text"
                value={selectedIndustry}
                onClick={toggleDropdown}
                placeholder="Select Industry"
                readOnly
                required
                className="w-[630px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              />
              {isOpen && (
                <ul className="list-none p-0 m-0 absolute top-full left-0 w-full border border-gray-300 rounded bg-white z-50">
                  {industryOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-left mt-4 mb-4">
              Organization<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter Organization"
              className="w-[630px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              required
            />
            <p className="text-left mt-4 mb-4">Stipend in INR</p>
            <input
              type="text"
              placeholder="Stipend(in INR)"
              className="w-[630px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <div className="flex gap-10 flex-wrap">
            <div className="flex flex-col">
              <p className="text-left mt-4 mb-4">
                Internship Type<span className="text-red-500">*</span>
              </p>
              <div className="relative w-full">
                <input
                  type="text"
                  value={typeselectedType}
                  onClick={typetoggleDropdown}
                  placeholder="Select Internship Type"
                  readOnly
                  required
                  className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
                />
                {isOpen && (
                  <ul className="list-none p-0 m-0 absolute top-full left-0 w-full border border-gray-300 rounded bg-white z-50">
                    {internshipTypes.map((option) => (
                      <li
                        key={option}
                        onClick={() => typehandleOptionClick(option)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-left mt-4 mb-4">
                From<span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                id="Internstart"
                name="InternStart"
                placeholder="Start Date"
                className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
                required
              />
            </div>
            <div className="flex flex-col">
              <p className="text-left mt-4 mb-4">To</p>
              <input
                type="date"
                id="Internend"
                name="Internend"
                placeholder="End Date"
                className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 flex-wrap mt-5">
          <div className="flex flex-col">
            <p className="text-left mt-4 mb-4">
              Country<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter Country"
              className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left mt-4 mb-4">
              City<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter City"
              className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              required
            />
          </div>
          <div className="flex flex-col">
            <p className="text-left mt-4 mb-4">
              State<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter State"
              className="w-[400px] p-3 rounded-lg text-lg border-2 border-gray-300 cursor-pointer"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse mr-2.5 pr-5">
        <form action="" method="post">
          <button
            type="submit"
            className="rounded-lg bg-white text-black m-2.5 text-lg p-2.5 border-2 border-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-white text-black m-2.5 text-lg p-2.5 border-2 border-gray-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Model;
