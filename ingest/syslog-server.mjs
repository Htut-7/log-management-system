import dgram from "node:dgram";

const server = dgram.createSocket("udp4");

const PORT = Number(process.env.SYSLOG_PORT || 5514);

const INGEST_URL =
  process.env.SYSLOG_INGEST_URL || "http://localhost:3000/api/ingest/syslog";

const API_KEY = process.env.INGEST_API_KEY_TENANTA;

server.on("message", async (buffer, remote) => {
  const message = buffer.toString("utf8").trim();

  console.log(`Syslog from ${remote.address}:${remote.port}`);
  console.log(message);

  try {
    const response = await fetch(INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        source: "firewall",
        message,
      }),
    });

    const result = await response.json();

    console.log("Ingestion result:", result);
  } catch (error) {
    console.error("Failed to forward Syslog:", error);
  }
});

server.bind(PORT, "0.0.0.0", () => {
  console.log(`Syslog UDP receiver listening on port ${PORT}`);
});
