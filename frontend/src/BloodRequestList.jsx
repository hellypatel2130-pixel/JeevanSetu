import { useMemo, useState } from "react";
import "./BloodRequestList.css";


function BloodRequestList({
  requests = [],
  bloodGroup = "",
  city = "",
  urgency = "",
}) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [copied, setCopied] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesBloodGroup =
        !bloodGroup ||
        request.bloodGroup?.toLowerCase() === bloodGroup.toLowerCase();

      const matchesCity =
        !city ||
        request.city?.toLowerCase().includes(city.toLowerCase());

      const matchesUrgency =
        !urgency ||
        request.urgency?.toLowerCase() === urgency.toLowerCase();

      return matchesBloodGroup && matchesCity && matchesUrgency;
    });
  }, [requests, bloodGroup, city, urgency]);

  const openContactModal = (request) => {
    setSelectedRequest(request);
    setCopied(false);
  };

  const closeContactModal = () => {
    setSelectedRequest(null);
    setCopied(false);
  };

  const copyContact = async () => {
    const contact = selectedRequest?.contact;

    if (!contact) {
      alert("Contact number is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(String(contact));
      setCopied(true);
    } catch {
      alert("Unable to copy. Please copy the number manually.");
    }
  };

  return (
    <>
      <div className="blr-request-grid">
        {filteredRequests.length === 0 ? (
          <div className="blr-empty">
            <span className="blr-empty-icon">♡</span>
            <h3>No blood requests found</h3>
            <p>Try changing your filters or check again later.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <article
              className="blr-request-card"
              key={request._id || request.id}
            >
              <div className="blr-card-top">
                <div className="blr-blood-badge">
                  {request.bloodGroup || "N/A"}
                </div>

                <span
                  className={`blr-urgency ${
                    request.urgency?.toLowerCase() === "urgent"
                      ? "blr-urgent"
                      : ""
                  }`}
                >
                  {request.urgency || "Normal"}
                </span>
              </div>

              <h3 className="blr-patient-name">
                {request.patientName || "Patient"}
              </h3>

              <p className="blr-request-city">
                <span>📍</span> {request.city || "City not provided"}
              </p>

              <div className="blr-request-details">
                <div>
                  <span>Hospital</span>
                  <strong>{request.hospital || "Not specified"}</strong>
                </div>

                <div>
                  <span>Required units</span>
                  <strong>{request.units ?? "Not specified"}</strong>
                </div>
              </div>

              {request.details && (
                <p className="blr-request-description">
                  {request.details}
                </p>
              )}

              <button
                type="button"
                className="blr-contact-button"
                onClick={() => openContactModal(request)}
              >
                <span>☎</span> Contact Requester
              </button>
            </article>
          ))
        )}
      </div>

      {selectedRequest && (
        <div
          className="blr-modal-overlay"
          onClick={closeContactModal}
        >
          <section
            className="blr-contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blr-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="blr-modal-close"
              onClick={closeContactModal}
              aria-label="Close contact details"
            >
              ×
            </button>

            <div className="blr-modal-icon">♥</div>

            <h2 id="blr-modal-title">Requester Information</h2>
            <p className="blr-modal-subtitle">
              Contact the requester about this blood requirement.
            </p>

            <div className="blr-modal-blood">
              <span>Blood Group</span>
              <strong>{selectedRequest.bloodGroup || "N/A"}</strong>
            </div>

            <div className="blr-contact-info">
              <div className="blr-info-row">
                <span>Patient / Requester</span>
                <strong>
                  {selectedRequest.patientName || "Not provided"}
                </strong>
              </div>

              <div className="blr-info-row">
                <span>Contact Number</span>
                <strong>
                  {selectedRequest.contact || "Not provided"}
                </strong>
              </div>

              <div className="blr-info-row">
                <span>Hospital</span>
                <strong>
                  {selectedRequest.hospital || "Not provided"}
                </strong>
              </div>

              <div className="blr-info-row">
                <span>City</span>
                <strong>{selectedRequest.city || "Not provided"}</strong>
              </div>

              <div className="blr-info-row">
                <span>Required Units</span>
                <strong>{selectedRequest.units ?? "Not specified"}</strong>
              </div>

              <div className="blr-info-row">
                <span>Urgency</span>
                <strong>{selectedRequest.urgency || "Normal"}</strong>
              </div>
            </div>

            {selectedRequest.contact ? (
              <div className="blr-modal-actions">
                <button
                  type="button"
                  className="blr-copy-button"
                  onClick={copyContact}
                >
                  {copied ? "✓ Number Copied" : "▢ Copy Number"}
                </button>

                <a
                  className="blr-call-button"
                  href={`tel:${String(selectedRequest.contact).replace(/[^\d+]/g, "")}`}
                >
                  ☎ Call Requester
                </a>
              </div>
            ) : (
              <p className="blr-no-contact">
                No contact number is available for this request.
              </p>
            )}

            <button
              type="button"
              className="blr-modal-done"
              onClick={closeContactModal}
            >
              Close
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default BloodRequestList;