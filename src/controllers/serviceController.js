const User = require("../models/user");
const ServiceProvider = require("../models/serviceProvider");

exports.becomeServiceProvider = async (req, res) => {
  try {
    // TEMP: userId body se
    const { userId, serviceType, experience, location, } = req.body;

    if (!userId || !serviceType || !experience || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "provider") {
      return res.status(400).json({ message: "Already a service provider" });
    }

    const provider = await ServiceProvider.create({
      userId: userId,
      name: user.name,
      serviceType,
      experience,
      location,
    });

    user.role = "provider";
    await user.save();

    res.status(201).json({
      message: "You are now a service provider",
      provider,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
