
import { useState } from "react";
import "./BloodRequest.css";

const initialForm = {
  patientName: "",
  bloodGroup: "",
  city: "",
  hospital: "",
  units: "1",
  urgency: "Normal",
  contact: "",
  details: "",
};

function BloodRequest() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (
      !form.patientName.trim() ||
      !form.bloodGroup ||
      !form.city.trim() ||
      !form.hospital.trim() ||
      !form.contact.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.contact.trim())) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/blood-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName: form.patientName.trim(),
            bloodGroup: form.bloodGroup,
            city: form.city.trim(),
            hospital: form.hospital.trim(),
            units: Number(form.units),
            urgency: form.urgency,
            contact: form.contact.trim(),
            details: form.details.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit blood request."
        );
      }

      setMessage(
        data.message || "Blood request submitted successfully!"
      );
      setForm({ ...initialForm });
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="blood-request-page">
      <section className="request-intro">
        <span className="request-tag">♥ REQUEST BLOOD</span>

        <h1>
          Every second <span>matters.</span>
        </h1>

        <p>
          Submit blood requirements to help organize the search
          for a suitable donor.
        </p>

        <div className="request-info">
          <div className="request-info-icon">+</div>

          <div>
            <h3>Need blood urgently?</h3>
            <p>
              For emergencies, contact your hospital or a licensed
              blood bank immediately. This demo website does not
              provide emergency response.
            </p>
          </div>
        </div>
      </section>

      <section className="request-form-card">
        <h2>Blood Request Form</h2>

        <p className="request-subtitle">
          Provide accurate information. Fields marked * are required.
        </p>

        {message && (
          <div
            className="request-message success"
            role="status"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            className="request-message error"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="request-fields">
            <div className="request-field">
              <label htmlFor="patientName">
                Patient Name *
              </label>

              <input
                id="patientName"
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                maxLength={80}
                required
              />
            </div>

            <div className="request-field">
              <label htmlFor="requestGroup">
                Blood Group *
              </label>

              <select
                id="requestGroup"
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select blood group</option>

                {[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="request-field">
              <label htmlFor="requestCity">City *</label>

              <input
                id="requestCity"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                maxLength={80}
                required
              />
            </div>

            <div className="request-field">
              <label htmlFor="hospital">Hospital Name *</label>

              <input
                id="hospital"
                name="hospital"
                value={form.hospital}
                onChange={handleChange}
                placeholder="Enter hospital name"
                maxLength={150}
                required
              />
            </div>

            <div className="request-field">
              <label htmlFor="units">Required Units *</label>

              <select
                id="units"
                name="units"
                value={form.units}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (unit) => (
                    <option key={unit} value={unit}>
                      {unit} {unit === 1 ? "unit" : "units"}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="request-field">
              <label htmlFor="urgency">Urgency *</label>

              <select
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                required
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div className="request-field full-width">
              <label htmlFor="contact">
                Contact Mobile Number *
              </label>

              <input
                id="contact"
                name="contact"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                value={form.contact}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div className="request-field full-width">
              <label htmlFor="details">
                Additional Details (Optional)
              </label>

              <textarea
                id="details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Add any other relevant information"
                maxLength={500}
                rows={4}
              />
            </div>
          </div>

          <p className="request-disclaimer">
            This form is a project demonstration. Submission does
            not contact donors or guarantee blood availability.
          </p>

          <button
            type="submit"
            className="request-submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Blood Request →"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default BloodRequest;
