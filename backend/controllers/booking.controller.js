import Booking from "../models/booking.model.js";
import Experience from "../models/experience.model.js";

export const createBooking = async (req, res) => {
  try {
    const { experienceId, name, email, date, time, promoCode, totalPrice } = req.body;

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    const slot = experience.slots.find(s => s.date === date && s.time === time);
    if (!slot || !slot.available) return res.status(400).json({ message: "Slot not available" });

    slot.available = false;
    await experience.save();

    const booking = new Booking({ experienceId, name, email, date, time, promoCode, totalPrice });
    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error });
  }
};
