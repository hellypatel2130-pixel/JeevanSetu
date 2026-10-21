
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Schemas
// --------------------

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: null,
      min: 1,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const bloodRequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    hospital: {
      type: String,
      required: true,
      trim: true,
    },
    units: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      validate: {
        validator: Number.isInteger,
        message: "Units must be a whole number.",
      },
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Normal", "Urgent", "Emergency"],
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Explicit collection names
const Donor = mongoose.model("Donor", donorSchema, "donors");

const BloodRequest = mongoose.model(
  "BloodRequest",
  bloodRequestSchema,
  "bloodRequests"
);

// --------------------
// Home Route
// --------------------

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to JeevanSetu Backend API ❤️",
    status: "Server is running",
  });
});

// --------------------
// GET All Donors
// Optional filters: bloodGroup, city
// --------------------

app.get("/api/donors", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const filter = {};

    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    if (city) {
      filter.city = {
        $regex: mongoose.trusted(
          new RegExp(
            city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "i"
          )
        ),
      };
    }

    const donors = await Donor.find(filter).sort({ createdAt: -1 });

    res.json(donors);
  } catch (error) {
    console.error("Error fetching donors:", error.message);
    res.status(500).json({ message: "Failed to fetch donors." });
  }
});

// --------------------
// POST Register a Donor
// --------------------

app.post("/api/donors", async (req, res) => {
  try {
    const { name, age, bloodGroup, city, phone, email } = req.body;

    if (
      !name?.trim() ||
      !bloodGroup ||
      !city?.trim() ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    const validBloodGroups = [
      "A+", "A-", "B+", "B-",
      "AB+", "AB-", "O+", "O-",
    ];

    if (!validBloodGroups.includes(bloodGroup)) {
      return res.status(400).json({
        message: "Please select a valid blood group.",
      });
    }

    let donorAge = null;

    if (age !== undefined && age !== null && age !== "") {
      donorAge = Number(age);

      if (!Number.isInteger(donorAge) || donorAge < 1 || donorAge > 120) {
        return res.status(400).json({
          message: "Please enter a valid age.",
        });
      }
    }

    const newDonor = await Donor.create({
      name: name.trim(),
      age: donorAge,
      bloodGroup,
      city: city.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
    });

    res.status(201).json({
      message: "Donor registered successfully!",
      donor: newDonor,
    });
  } catch (error) {
    console.error("Error registering donor:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to register donor.",
    });
  }
});

// --------------------
// GET All Blood Requests
// --------------------

app.get("/api/blood-requests", async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find().sort({
      createdAt: -1,
    });

    res.json(bloodRequests);
  } catch (error) {
    console.error("Error fetching blood requests:", error.message);

    res.status(500).json({
      message: "Failed to fetch blood requests.",
    });
  }
});

// --------------------
// POST Submit a Blood Request
// --------------------

app.post("/api/blood-requests", async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      city,
      hospital,
      units,
      urgency,
      contact,
      details,
    } = req.body;

    if (
      !patientName?.trim() ||
      !bloodGroup ||
      !city?.trim() ||
      !hospital?.trim() ||
      !contact?.trim()
    ) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    if (!/^[6-9]\d{9}$/.test(contact.trim())) {
      return res.status(400).json({
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    const validBloodGroups = [
      "A+", "A-", "B+", "B-",
      "AB+", "AB-", "O+", "O-",
    ];

    if (!validBloodGroups.includes(bloodGroup)) {
      return res.status(400).json({
        message: "Please select a valid blood group.",
      });
    }

    const requestedUnits = Number(units);

    if (
      !Number.isInteger(requestedUnits) ||
      requestedUnits < 1 ||
      requestedUnits > 10
    ) {
      return res.status(400).json({
        message: "Units must be between 1 and 10.",
      });
    }

    const validUrgencies = ["Normal", "Urgent", "Emergency"];

    if (!validUrgencies.includes(urgency)) {
      return res.status(400).json({
        message: "Please select a valid urgency level.",
      });
    }

    const newRequest = await BloodRequest.create({
      patientName: patientName.trim(),
      bloodGroup,
      city: city.trim(),
      hospital: hospital.trim(),
      units: requestedUnits,
      urgency,
      contact: contact.trim(),
      details: details?.trim() || "",
      status: "Pending",
    });

    res.status(201).json({
      message: "Blood request submitted successfully!",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error submitting blood request:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to submit blood request.",
    });
  }
});

// --------------------
// Connect MongoDB and Start Server
// --------------------

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing from the .env file.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`JeevanSetu server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
