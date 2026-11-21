import mongoose, { Document, Schema } from "mongoose";

export interface ISiteSettings extends Document {
  phone1Number: string;
  phone1Label: string;
  phone2Number: string;
  phone2Label: string;
  availabilityText: string;
  companyEmail?: string;
  whatsappNumber?: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phone1Number: { type: String, default: "+91-9461560344", trim: true },
    phone1Label: { type: String, default: "Sales & Marketing Team", trim: true },
    phone2Number: { type: String, default: "+91-6201533997", trim: true },
    phone2Label: { type: String, default: "Founder Sumit Kumar Mishra", trim: true },
    availabilityText: { type: String, default: "Available Mon - Sat (9am - 8pm IST)", trim: true },
    companyEmail: { type: String, default: "info@websitedevelopmentcompany4u.com", trim: true },
    whatsappNumber: { type: String, default: "+919461560344", trim: true },
  },
  { timestamps: true }
);

export const SiteSettingsModel = mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
