// A simple implementation of a timestamp-based unique ID generator.
// This class generates unique IDs using the current timestamp, a worker ID, and a sequence number to ensure uniqueness within a distributed system.

class TimestampBasedUniqueID {
  constructor(workerId) {
    if (workerId < 0 || workerId >= 1024) {
      throw new Error("Worker ID must be between 0 and 1023.");
    }
    this.workerId = BigInt(workerId);
    this.sequence = BigInt(0);
    this.lastTimestamp = BigInt(-1);
  }

  // Generates a unique ID based on the current timestamp, worker ID, and an internal sequence number.
  // Returns the generated ID as a string to handle large integer values safely.
  generate() {
    let timestamp = BigInt(Date.now());
    const workerIdBits = BigInt(10); // Allows for 1024 different worker IDs
    const sequenceBits = BigInt(12); // Allows for 4096 IDs to be generated per millisecond, per worker
    const workerIdShift = sequenceBits;
    const timestampShift = workerIdBits + sequenceBits;
    const sequenceMask = (BigInt(1) << sequenceBits) - BigInt(1);

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + BigInt(1)) & sequenceMask;
      if (this.sequence === BigInt(0)) {
        while (timestamp <= this.lastTimestamp) {
          timestamp = BigInt(Date.now());
        }
      }
    } else {
      this.sequence = BigInt(0);
    }

    this.lastTimestamp = timestamp;

    const id = ((timestamp << timestampShift) | (this.workerId << workerIdShift) | this.sequence).toString();
    return id;
  }
}
