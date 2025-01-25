import { pgTable, serial, text, timestamp, integer, boolean, decimal, varchar, json, date, time } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
})

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  contactNumber: varchar("contact_number", { length: 20 }),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const visits = pgTable("visits", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  doctorId: integer("doctor_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  weight: decimal("weight", { precision: 5, scale: 2 }),
  temperature: decimal("temperature", { precision: 4, scale: 1 }),
  bloodPressure: varchar("blood_pressure", { length: 20 }),
  pulse: integer("pulse"),
  symptoms: text("symptoms"),
  diagnosis: text("diagnosis"),
  doctorsNotes: text("doctors_notes"),
  status: varchar("status", { length: 20 }).notNull().default("open")
})

export const nursesNotes = pgTable("nurses_notes", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").references(() => visits.id),
  nurseId: integer("nurse_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const fileUploads = pgTable("file_uploadds", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").references(() => visits.id),
  nurseId: integer("nurse_id").references(() => users.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").references(() => visits.id),
  doctorId: integer("doctor_id").references(() => users.id),
  medicine: varchar("medicine", { length: 255 }).notNull(),
  dosage: varchar("dosage", { length: 255 }).notNull(),
  frequency: varchar("frequency", { length: 255 }).notNull(),
  duration: varchar("duration", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const labRequests = pgTable("lab_requests", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").references(() => visits.id),
  doctorId: integer("doctor_id").references(() => users.id),
  testType: varchar("test_type", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const labResults = pgTable("lab_results", {
  id: serial("id").primaryKey(),
  labRequestId: integer("lab_request_id").references(() => labRequests.id),
  technicianId: integer("technician_id").references(() => users.id),
  results: text("results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const labTechnicianNotes = pgTable("lab_technician_notes", {
  id: serial("id").primaryKey(),
  labRequestId: integer("lab_request_id").references(() => labRequests.id),
  technicianId: integer("technician_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(), // "consultation", "lab, medication, etc"
  itemName: varchar("item_name", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"), // "pending", "approved", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
});

export const hospitalFees = pgTable("hospital_fees", {
  id: serial("id").primaryKey(),
  serviceName: varchar("service_name", { length: 255 }).notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const drugPrices = pgTable("pgTable", {
  id: serial("id").primaryKey(),
  drugName: varchar("drug_name", { length: 255 }).notNull().unique(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const labTestFees = pgTable("lab_test_fees", {
  id: serial("id").primaryKey(),
  testName: varchar("test_name", { length: 255 }).notNull().unique(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  itemName: varchar("item_name", { length: 255 }).notNull().unique(),
  quantity: integer("quantity").notNull(),
  unit: text("unit"),
  reorderLevel: integer("reorder_level").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const radiologyRequests = pgTable("radiology_requests", {
  id: serial("id").primaryKey(),
  visitId: integer("visit_id").references(() => visits.id),
  doctorId: integer("doctor_id").references(() => users.id),
  imagingType: varchar("imaging_type", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const radiologyResults = pgTable("radiology_results", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").references(() => radiologyRequests.id),
  radiologistId: integer("radiologist_id").references(() => users.id),
  results: text("results"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const radiologyTechnicianNotes = pgTable("radiology_technician_notes", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").references(() => radiologyRequests.id),
  radiologistId: integer("radiologist_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const radiologyImagingFees = pgTable("radiology_imaging_fees", {
  id: serial("id").primaryKey(),
  imagingType: varchar("imaging_type", { length: 255 }).notNull().unique(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const outpatientVisits = pgTable("outpatient_visits", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  visitDate: date("visit_date").notNull(),
  reasonForVisit: text("reason_for_visit"),
  diagnosis: text("diagnosis"),
  treatment: text("treatment"),
  followupDate: date("followup_date"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const inpatientAdmissions = pgTable("inpatient_admissions", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  admissionDate: date("admission_date").notNull(),
  dischargeDate: date("discharge_date"),
  reasonForAdmission: text("reason_for_admission"),
  assignedNurseId: integer("assigned_nurse_id").references(() => users.id),
  assignedDoctorId: integer("assigned_doctor_id").references(() => users.id),
  roomNumber: varchar("room_number", { length: 255 }),
  status: varchar("status", { length: 255 }).notNull().default("admitted"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const inpatientNotes = pgTable("inpatient_notes", {
  id: serial("id").primaryKey(),
  admissionId: integer("admission_id").references(() => inpatientAdmissions.id),
  userId: integer("user_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: varchar("action", { length: 255 }).notNull(),
  details: json("details"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message"),
  type: varchar("type", { length: 255 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

export const aiAnalysis = pgTable("ai_analysis", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  analysisType: varchar("analysis_type", { length: 255 }).notNull(),
  results: text("results"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id),
  doctorId: integer("doctor_id").references(() => users.id),
  appointmentDate: date("appointment_date").notNull(),
  appointmentTime: time("appointment_time").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("scheduled"),
  createdAt: timestamp("created_at").defaultNow(),
})
