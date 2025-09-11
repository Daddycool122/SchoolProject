import { useState } from "react";

export default function Login({ onLogin }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMsg("OTP sent to your email.");
      } else {
        setMsg(data.error || "Error sending OTP.");
      }
    } catch {
      setMsg("Network error.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Login successful!");
        if (onLogin) onLogin(email);
      } else {
        setMsg(data.error || "Invalid OTP.");
      }
    } catch {
      setMsg("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              required
              maxLength={6}
              onChange={e => setOtp(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {msg && <p className="mt-4 text-center text-sm text-red-700">{msg}</p>}
      </div>
    </div>
  );
}