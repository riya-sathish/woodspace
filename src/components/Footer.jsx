import { FaFacebookF, FaYoutube, FaGoogle } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* LEFT — Policy links */}
      
      <div className="footer-left">
        <span>Privacy Policy</span>
        <span className="footer-divider">|</span>
        <span>Terms & Conditions</span>
        <span className="footer-divider">|</span>
        <span>Help</span>
      </div>

      {/* CENTER — Logo */}
      <div className="footer-logo">
        <span className="logo-wood">Wood</span>
        <span className="logo-space">Space</span>
      </div>

      {/* RIGHT — Social */}
      <div className="footer-right">
        <span className="follow-text">Follow Us</span>
        <div className="social-icons">
          <div className="social-icon">
            <FaFacebookF size={14} />
          </div>
          <div className="social-icon">
            <FaYoutube size={14} />
          </div>
          <div className="social-icon">
            <FaGoogle size={14} />
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;