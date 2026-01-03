const User = require("../models/user");
const ServiceProvider = require("../models/serviceProvider");

exports.becomeServiceProvider = async (req, res) => {
  try {
    const { userId, serviceType, experience, location } = req.body;

    // 🔴 Bad Request
    if (!userId || !serviceType || !experience || !location) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔴 Not Found
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 🔴 Forbidden (already provider)
    if (user.role === "provider") {
      return res.status(403).json({
        message: "User is already a service provider",
      });
    }

    // 🔴 Conflict (provider already exists)
    const existingProvider = await ServiceProvider.findOne({ user: userId });
    if (existingProvider) {
      return res.status(409).json({
        message: "Service provider already exists",
      });
    }

    // ✅ Create provider
    const provider = await ServiceProvider.create({
      user: userId, // ✅ correct field
      serviceType,
      experience,
      location,
    });

    user.role = "provider";
    await user.save();

    // ✅ Created
    return res.status(201).json({
      message: "You are now a service provider",
      provider,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while becoming provider",
    });
  }
};
