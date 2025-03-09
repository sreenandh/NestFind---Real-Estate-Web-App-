import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./otpPanel.scss";

function OtpPanel({ email }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.post("/auth/verify-otp", { email, otp });
      setMessage(res.data.message);
      if (res.data.message === "OTP verified successfully") {
        // Redirect to login page after a brief delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="otp-panel">
      <h2>Enter OTP</h2>
      <p>Please check your email for the OTP code.</p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default OtpPanel;
