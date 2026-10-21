
import { useState } from "react";
import "./DonorRegistration.css";

const initialForm = {
  name: "",
  age: "",
  bloodGroup: "",
  city: "",
  phone: "",
  email: "",
};

function DonorRegistration() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setMessage("");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !form.name.trim() ||
      !form.age ||
      !form.bloodGroup ||
      !form.city.trim() ||
      !form.phone.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(form.age) < 18 || Number(form.age) > 65) {
      setError("For this demo, enter an age between 18 and 65.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/donors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            age: Number(form.age),
            bloodGroup: form.bloodGroup,
            city: form.city.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Donor registration failed."
        );
      }

      setMessage(
        data.message || "Donor registered successfully!"
      );
      setForm(initialForm);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="registration-page">
      <section className="registration-intro">
        <span className="registration-tag">♥ BECOME A DONOR</span>
        <h1>
          Be someone's <span>lifeline.</span>
        </h1>
        <p>
          Register as a blood donor and take a step towards
          helping people in need.
        </p>

        <div className="registration-points">
          <p>♥ Make a difference in someone's life</p>
          <p>♥ Help connect people with potential donors</p>
          <p>♥ Be part of the JeevanSetu community</p>
        </div>
      </section>

      <section className="registration-card">
        <h2>Donor Registration</h2>
        <p className="registration-subtitle">
          Enter your details below. Fields marked * are required.
        </p>

        {message && (
          <div className="form-message success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="form-message error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="registration-fields">
            <div className="registration-field">
              <label htmlFor="donor-name">Full Name *</label>
              <input
                id="donor-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                maxLength={80}
                autoComplete="name"
                required
              />
            </div>

            <div className="registration-field">
              <label htmlFor="donor-age">Age *</label>
              <input
                id="donor-age"
                name="age"
                type="number"
                min="18"
                max="65"
                value={form.age}
                onChange={handleChange}
                placeholder="Your age"
                required
              />
            </div>

            <div className="registration-field">
              <label htmlFor="donor-group">Blood Group *</label>
              <select
                id="donor-group"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select blood group</option>
                {[
                  "A+", "A-", "B+", "B-",
                  "AB+", "AB-", "O+", "O-",
                ].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="registration-field">
              <label htmlFor="donor-city">City *</label>
              <input
                id="donor-city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter your city"
                maxLength={80}
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="registration-field">
              <label htmlFor="donor-phone">Mobile Number *</label>
              <input
                id="donor-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                required
              />
            </div>

            <div className="registration-field">
              <label htmlFor="donor-email">Email (optional)</label>
              <input
                id="donor-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={120}
                autoComplete="email"
              />
            </div>
          </div>

          <p className="registration-disclaimer">
            Registration does not confirm medical eligibility to donate.
            Eligibility must be assessed by qualified blood-bank staff.
          </p>

          <button
            type="submit"
            className="registration-submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as a Donor →"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default DonorRegistration;
