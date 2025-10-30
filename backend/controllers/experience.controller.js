import Experience from "../models/experience.model.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences" });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.json(experience);
  } catch (error) {
    res.status(404).json({ message: "Experience not found" });
  }
};
