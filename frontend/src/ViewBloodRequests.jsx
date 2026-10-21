
import { useCallback, useEffect, useState } from "react";
import BloodRequestList from "./BloodRequestList";
import "./ViewBloodRequests.css";

function ViewBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/blood-requests"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load blood requests."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response from the server.");
      }

      setRequests(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  function resetFilters() {
    setBloodGroup("");
    setCity("");
    setUrgency("");
  }

  return (
    <main className="view-requests-page">
      <section className="vr-hero">
        <span className="vr-tag">♥ JEEVANSETU</span>

        <h1>
          Blood Requests <span>Board</span>
        </h1>

        <p>
          Find blood requests by blood group, city, and urgency.
          Every connection can make a difference.
        </p>

        <div className="vr-stats">
          <div className="vr-stat">
            <strong>{requests.length}</strong>
            <span>Total Requests</span>
          </div>

          <div className="vr-stat">
            <strong>
              {requests.filter(
                (request) => request.urgency === "Emergency"
              ).length}
            </strong>
            <span>Emergency Requests</span>
          </div>
        </div>
      </section>

      <section className="vr-content">
        <div className="vr-heading-row">
          <div>
            <h2>Find a Blood Request</h2>
            <p>Use the filters to narrow down the results.</p>
          </div>

          <button
            type="button"
            className="vr-refresh"
            onClick={fetchRequests}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        <div className="vr-filters">
          <div className="vr-filter">
            <label htmlFor="filterBlood">Blood Group</label>
            <select
              id="filterBlood"
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

          <div className="vr-filter">
            <label htmlFor="filterCity">City</label>
            <input
              id="filterCity"
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="vr-filter">
            <label htmlFor="filterUrgency">Urgency</label>
            <select
              id="filterUrgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="">All Urgencies</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <button
            type="button"
            className="vr-reset"
            onClick={resetFilters}
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <div className="vr-state">
            <div className="vr-spinner" />
            <p>Loading blood requests...</p>
          </div>
        ) : error ? (
          <div className="vr-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={fetchRequests}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            <p className="vr-results">
              Showing requests matching your filters
            </p>

            <BloodRequestList
              requests={requests}
              bloodGroup={bloodGroup}
              city={city.trim()}
              urgency={urgency}
            />
          </>
        )}
      </section>

      <p className="vr-disclaimer">
        For emergencies, contact your hospital or a licensed blood
        bank immediately. Requests shown here do not guarantee blood
        availability or verified donor matching.
      </p>
    </main>
  );
}

export default ViewBloodRequests;
