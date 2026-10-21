
import { useState, useEffect } from "react";
import "./FindDonors.css";

function FindDonors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDonors = async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (bloodGroup) {
        params.append("bloodGroup", bloodGroup);
      }

      if (city.trim()) {
        params.append("city", city.trim());
      }

      const response = await fetch(
        `http://localhost:5001/api/donors?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch donors from server.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid donor data received from server.");
      }

      setDonors(
        data.map((donor) => ({
          ...donor,
          group: donor.bloodGroup || donor.group || "",
        }))
      );
    } catch (err) {
      setError(
        "Could not connect to the server. Please check whether the backend is running on port 5001."
      );
      setDonors([]);
      console.error("Donor fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const resetFilters = () => {
    setBloodGroup("");
    setCity("");
    setTimeout(() => {
      fetchDonorsWithoutFilters();
    }, 0);
  };

  const fetchDonorsWithoutFilters = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/donors"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch donors.");
      }

      const data = await response.json();

      setDonors(
        data.map((donor) => ({
          ...donor,
          group: donor.bloodGroup || donor.group || "",
        }))
      );
    } catch (err) {
      setError("Could not load donors. Please check the backend server.");
      setDonors([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="donor-page">
      <section className="donor-heading">
        <span className="donor-tag">♥ FIND A DONOR</span>
        <h1>Find Blood Donors Near You</h1>
        <p>
          Search by blood group and city to find matching
          donors in your area.
        </p>
      </section>

      <section className="donor-search">
        <div className="search-field">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>
        </div>

        <div className="search-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button
          className="search-button"
          onClick={() => {
            fetchDonors();
            document.getElementById("donor-results")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Donors →"}
        </button>

        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </section>

      <section className="donor-results" id="donor-results">
        <div className="results-heading">
          <div>
            <h2>Matching Donors</h2>
            <p>Browse donor profiles available on JeevanSetu.</p>
          </div>
          <span className="results-count">
            {donors.length} found
          </span>
        </div>

        {error ? (
          <div className="no-donors">
            <h3>Unable to load donors</h3>
            <p>{error}</p>
            <button className="reset-button" onClick={fetchDonors}>
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="no-donors">
            <h3>Finding donors...</h3>
            <p>Please wait while we load donor information.</p>
          </div>
        ) : donors.length > 0 ? (
          <div className="donor-grid">
            {donors.map((donor) => (
              <article className="donor-card" key={donor.id}>
                <div className="donor-card-top">
                  <div className="donor-avatar">
                    {(donor.name || "D").charAt(0).toUpperCase()}
                  </div>
                  <span className="blood-badge">
                    {donor.group}
                  </span>
                </div>

                <h3>{donor.name}</h3>
                <p className="donor-location">
                  <span>⌖</span> {donor.city}, Gujarat
                </p>

                <div className="donor-status">
                  <span className="status-dot"></span>
                  Registered donor
                </div>

                <button
                  className="donor-card-button"
                  onClick={() =>
                    alert(
                      `Donor: ${donor.name}\nBlood Group: ${donor.group}\nCity: ${donor.city}\nPhone: ${
                        donor.phone || "Not available"
                      }`
                    )
                  }
                >
                  View Details →
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-donors">
            <span>⌕</span>
            <h3>No matching donors found</h3>
            <p>Try a different blood group or city.</p>
            <button className="reset-button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <p className="sample-notice">
        Note: Donor information is provided by the JeevanSetu backend.
        Please verify donor details before contacting them.
      </p>
    </main>
  );
}

export default FindDonors;
