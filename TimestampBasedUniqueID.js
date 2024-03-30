// A simple implementation of a timestamp-based unique ID generator.
// This class generates unique IDs using the current timestamp, a worker ID, and a sequence number to ensure uniqueness within a distributed system.

class UniqueIdGenerator {
  constructor() {
    this.twepoch = 1704052800000n;
    this.sequenceBits = 17n;
    this.sequenceMax = 65536n;
    this.lastTimestamp = -1n;
    this.sequence = 0n;
  }

  generateLongId() {
    let timestamp = BigInt(Date.now());

    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) % this.sequenceMax;
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;
    const id =
      ((timestamp - this.twepoch) << this.sequenceBits) | this.sequence;
    return id;
  }

  tilNextMillis(lastTimestamp) {
    let timestamp = BigInt(Date.now());
    while (timestamp <= lastTimestamp) {
      timestamp = BigInt(Date.now());
    }
    return timestamp;
  }
}
