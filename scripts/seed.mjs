import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const required = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
};

const users = [
  {
    username: "admin.secops",
    email: "admin.secops@example.com",
    password: required("SEED_TENANTA_ADMIN_PASSWORD"),
    role: "ADMIN",
    tenant: "tenantA",
  },
  {
    username: "viewer.secops",
    email: "viewer.secops@example.com",
    password: required("SEED_TENANTA_VIEWER_PASSWORD"),
    role: "VIEWER",
    tenant: "tenantA",
  },
  {
    username: "admin.blue",
    email: "admin.blue@example.com",
    password: required("SEED_TENANTB_ADMIN_PASSWORD"),
    role: "ADMIN",
    tenant: "tenantB",
  },
  {
    username: "viewer.blue",
    email: "viewer.blue@example.com",
    password: required("SEED_TENANTB_VIEWER_PASSWORD"),
    role: "VIEWER",
    tenant: "tenantB",
  },
];

await mongoose.connect(uri);

const db = mongoose.connection.db;

if (!db) {
  throw new Error("Database connection failed");
}

const userCollection = db.collection("users");
const ruleCollection = db.collection("alertrules");

for (const user of users) {
  const hashedPassword = await bcrypt.hash(user.password, 12);

  await userCollection.updateOne(
    { email: user.email },
    {
      $set: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        tenant: user.tenant,
        isActive: true,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  console.log(`Seeded user: ${user.email}`);
}

const tenants = ["tenantA", "tenantB"];

for (const tenant of tenants) {
  await ruleCollection.updateOne(
    {
      tenant,
      name: "Repeated Failed Login",
    },
    {
      $set: {
        description: "Detect repeated failed login attempts from the same IP",
        event: "LOGIN_FAILED",
        threshold: 5,
        timeWindow: 5,
        severity: "HIGH",
        isActive: true,
        tenant,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );

  console.log(`Seeded alert rule for ${tenant}`);
}

await mongoose.disconnect();

console.log("Seed completed successfully");