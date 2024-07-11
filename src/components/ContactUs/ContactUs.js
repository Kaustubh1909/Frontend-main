import styles from "./ConatctUs.module.css";
import logo from "../../assets/ContactUs/inventory_logo.png";
const ContactUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.title}>INVENTORY MANAGEMENT SYSTEM</span>
        <div>
          <span className={styles.reach_us}>Reach Us At</span>
          <p>Contact Us: +91-9182736450</p>
          <p>E-mail:  Team157_feedback.org</p>
          <p>Address: B-305, Ocean Heights, Marine Drive, Nariman Point, Mumbai, Maharashtra 400021</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
