import { Resource, User } from "./models/index.js";
import { sequelize } from "./config/db.js";

const seedData = async () => {
  try {
    await sequelize.sync({ alter: true });

    // Seed Resources
    const resources = [
      {
        title: "Careers After 10th",
        description: "A comprehensive guide on choosing the right stream after 10th grade.",
        category: "Career Guides",
        content: "Draft content for 10th grade guide...",
        is_published: true
      },
      {
        title: "JEE Main Preparation Guide",
        description: "Essential tips and study strategies for JEE Main.",
        category: "Entrance Exams",
        content: "Preparation strategies...",
        is_published: true
      },
      {
        title: "Top Engineering Colleges in India",
        description: "A curated list of IITs, NITs, and top private institutes.",
        category: "College Information",
        content: "College list...",
        is_published: true
      }
    ];

    for (const res of resources) {
      await Resource.findOrCreate({
        where: { title: res.title },
        defaults: res
      });
    }

    // Seed a mock student and admin if they don't exist
    await User.findOrCreate({
      where: { email: "student@example.com" },
      defaults: {
        full_name: "John Doe Student",
        password: "password123", // In a real app, hash this!
        role: "student"
      }
    });

    await User.findOrCreate({
      where: { email: "admin@example.com" },
      defaults: {
        full_name: "Admin User",
        password: "adminpassword",
        role: "admin"
      }
    });

    console.log("🌱 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};

export default seedData;
