import { useLocation } from "react-router-dom";
import OtpPanel from "../../components/otp/OtpPanel";

function VerifyOtpPage() {
  // Retrieve email from the navigation state
  const { state } = useLocation();
  const { email } = state || {};

  return (
    <div>
      {email ? (
        <OtpPanel email={email} />
      ) : (
        <p>No email provided. Please register first.</p>
      )}
    </div>
  );
}

export default VerifyOtpPage;
