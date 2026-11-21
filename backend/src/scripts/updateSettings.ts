import mongoose from "mongoose";
import dotenv from "dotenv";
import { SiteSettingsModel } from "../models/SiteSettings";

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is missing");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB successfully");

  let settings = await SiteSettingsModel.findOne();
  if (!settings) {
    settings = new SiteSettingsModel();
  }
  settings.phone1Number = "+91-9461560344";
  settings.phone1Label = "Sales & Marketing Team";
  settings.phone2Number = "+91-6201533997";
  settings.phone2Label = "Founder Sumit Kumar Mishra";
  settings.whatsappNumber = "+919461560344";
  settings.companyEmail = "info@websitedevelopmentcompany4u.com";
  settings.availabilityText = "Available Mon - Sat (9am - 8pm IST)";

  await settings.save();
  console.log("Updated SiteSettings in DB successfully:", settings);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
