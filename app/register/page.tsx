"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Role = "individual" | "corporate" | "institution" | "";
type VerificationMode = "email" | "image" | "";

export default function Register() {
  const [role, setRole] = useState<Role>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [verificationMode, setVerificationMode] = useState<VerificationMode>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [sentVerificationCode, setSentVerificationCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [step, setStep] = useState(1); // 1: form, 2: verify email or image, 3: complete
  const [error, setError] = useState("");

  const validateAadhaar = (num: string) => /^\d{12}$/.test(num);
  const validateMobile = (num: string) => /^\d{10}$/.test(num);
  const validateZipcode = (code: string) => /^\d{5,6}$/.test(code);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const sendVerificationCode = () => {
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentVerificationCode(code);
    alert(`Verification code sent to ${email}: ${code} (Simulated)`);
    setStep(2);
  };

  const verifyEmailCode = () => {
    if (emailVerificationCode === sentVerificationCode) {
      setEmailVerified(true);
      setStep(3);
      setError("");
    } else {
      setError("Incorrect verification code");
    }
  };

  const handleSubmit = (e: FormEvent | undefined = undefined) => {
    if (e) e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role");
      setStep(1);
      return;
    }
    if (!email || !password) {
      setError("Please enter email and password");
      setStep(1);
      return;
    }
    if (!emailVerified && verificationMode === "email") {
      setError("Please verify your email");
      setStep(2);
      return;
    }
    if (!validateAadhaar(aadhaar)) {
      setError("Please enter valid 12-digit Aadhaar number");
      setStep(1);
      return;
    }
    if (!state || !city || !address) {
      setError("Please enter state, city, and address");
      setStep(1);
      return;
    }
    if (!validateZipcode(zipcode)) {
      setError("Please enter a valid zipcode");
      setStep(1);
      return;
    }
    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      setStep(1);
      return;
    }
    if (!verificationMode) {
      setError("Please select a verification mode");
      setStep(1);
      return;
    }
    if (verificationMode === "image" && !imageFile) {
      setError("Please upload an image for verification");
      setStep(1);
      return;
    }

    alert(`Registered successfully as ${role}.`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left gold panel */}
      <div className="hidden md:block w-1/2 bg-[#DEAC34]">
       <img
            src="https://sevasahayog.org/wp-content/uploads/2023/03/Group-6399_1.webp"
            alt="Donor-Connect Icon"
            className="w-288 h-288 object-contain"
          /></div>
      {/* Right navy panel with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#1B2A41] p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#1B2A41]">Register</h2>

          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); sendVerificationCode(); }}>
              <label className="block mb-4">
                <span className="block mb-1 font-medium">Select Role</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select Role --</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                  <option value="institution">Institution</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  minLength={6}
                  required
                />
              </label>

              
              <label className="block mb-4">
                <span className="block mb-1 font-medium">State</span>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">City</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">Zipcode</span>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">Address</span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="block mb-1 font-medium">Mobile Number</span>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>
              <label className="block mb-4">
                <span className="block mb-1 font-medium">Aadhar Number</span>
                <input
                  type="text"
                  maxLength={12}
                  value={mobile}
                  onChange={(e) => setAadhaar(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </label>

              
              {verificationMode === "image" && (
                <label className="block mb-4">
                  <span className="block mb-1 font-medium">Upload Verification Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                    required
                  />
                </label>
              )}

              {error && <p className="text-red-600 my-2">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#DEAC34] hover:bg-yellow-400 text-[#1B2A41] font-bold py-2 rounded transition"
              >
                Send Email Verification Code
              </button>
            </form>
          )}

          {step === 2 && verificationMode === "email" && (
            <div>
              <p className="mb-4 text-[#1B2A41]">
                Verification code sent to {email}. Please enter the code below:
              </p>
              <input
                type="text"
                maxLength={6}
                value={emailVerificationCode}
                onChange={(e) => setEmailVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full border rounded px-3 py-2 mb-4"
              />
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <button
                onClick={verifyEmailCode}
                className="w-full bg-[#DEAC34] hover:bg-yellow-400 text-[#1B2A41] font-bold py-2 rounded transition"
              >
                Verify Email
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 border border-gray-400 text-gray-700 py-2 rounded"
              >
                Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="mb-4 text-green-700 font-semibold">
                Email verified successfully! Click below to complete registration:
              </p>
              <button
                onClick={() => handleSubmit(undefined)}
                className="w-full bg-[#DEAC34] hover:bg-yellow-400 text-[#1B2A41] font-bold py-2 rounded transition"
              >
                Complete Registration
              </button>
              {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
          )}

          {step === 2 && verificationMode === "image" && (
            <div>
              <p className="mb-4 text-[#1B2A41]">
                Image uploaded, please complete registration:
              </p>
              <button
                onClick={() => handleSubmit(undefined)}
                className="w-full bg-[#DEAC34] hover:bg-yellow-400 text-[#1B2A41] font-bold py-2 rounded transition"
              >
                Complete Registration
              </button>
              {error && <p className="text-red-600 mt-4">{error}</p>}
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 border border-gray-400 text-gray-700 py-2 rounded"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
