"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { 
  School, 
  MapPin, 
  Building, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from "lucide-react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // "success" or "error"

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMsg("");
    setSubmitStatus("");

    try {
      const res = await fetch("/api/schools/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setMsg("School added successfully! 🎉");
        setSubmitStatus("success");
        reset();

        setTimeout(() => {
          setMsg("");
          setSubmitStatus("");
        }, 5000);
      } else {
        throw new Error(result.error || "Failed to add school");
      }
    } catch (error) {
      setMsg(error.message || "Something went wrong. Please try again.");
      setSubmitStatus("error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <School className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New School
          </h1>
          <p className="text-lg text-gray-600">
            Register a new educational institution to our platform
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 backdrop-blur-sm bg-opacity-95">
          {msg && (
            <div className={`mb-6 p-4 rounded-2xl flex items-center space-x-3 ${
              submitStatus === "success" 
                ? "bg-green-50 border border-green-200" 
                : "bg-red-50 border border-red-200"
            }`}>
              {submitStatus === "success" ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              <p className={`font-medium ${submitStatus === "success" ? "text-green-800" : "text-red-800"}`}>
                {msg}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <School className="h-4 w-4 mr-2 text-blue-500" />
                School Name
              </label>
              <input
                {...register("name", { required: "School name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
                placeholder="Enter school name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.name.message}</p>}
            </div>

            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2 text-green-500" />
                Address
              </label>
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Enter full address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              />
              {errors.address && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Building className="h-4 w-4 mr-2 text-orange-500" />
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  placeholder="Enter city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                />
                {errors.city && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.city.message}</p>}
              </div>

              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Building className="h-4 w-4 mr-2 text-purple-500" />
                  State
                </label>
                <input
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter state"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                />
                {errors.state && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.state.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="h-4 w-4 mr-2 text-indigo-500" />
                  Contact Number
                </label>
                <input
                  {...register("contact", { 
                    required: "Contact number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" }
                  })}
                  placeholder="Enter 10-digit number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                />
                {errors.contact && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.contact.message}</p>}
              </div>

              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="h-4 w-4 mr-2 text-pink-500" />
                  Email Address
                </label>
                <input
                  {...register("email_id", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" }
                  })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                />
                {errors.email_id && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.email_id.message}</p>}
              </div>
            </div>

            {/* Image URL */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <School className="h-4 w-4 mr-2 text-cyan-500" />
                School Image URL
              </label>
              <input
                {...register("image", { 
                  required: "Image URL is required",
                  pattern: { value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/i, message: "Enter a valid image URL" }
                })}
                placeholder="Enter image URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              />
              {errors.image && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" />{errors.image.message}</p>}
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Adding School...</span>
                  </>
                ) : (
                  <>
                    <School className="h-5 w-5" />
                    <span>Add School</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            All fields are required. Make sure to provide accurate information for school registration.
          </p>
        </div>
      </div>
    </div>
  );
}
