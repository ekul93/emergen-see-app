"use client";
import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";

function register() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(e.target);

    // Send the form data to your server or API route

    console.log("sending", formData);
    fetch("/api/scoring", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setisLoading(false);
        console.log("Form submitted:", data);
        Swal.fire({
          title: `Patient may have: <br> <u>${data.response.diagnosis}</u>`, // No <div> needed
          icon: "info",
          html: `
    Their severity is ${data.response.severity}. <br>, 
    estimated wait time is ${data.response.estimatedWaitTime}.
  `,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {!session ? (
        " Please sign in"
      ) : (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-xl shadow-2xl space-y-8 w-full max-w-3xl"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Patient Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <input
                  type="date"
                  name="admissionDate"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
                <input
                  type="text"
                  name="symptoms"
                  placeholder="Symptoms"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full px-6 py-4 mt-6 bg-indigo-600 text-white text-xl font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
                //disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit Information"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default register;
