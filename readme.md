# TimestampBasedUniqueID-Generator

A simple, scalable, and efficient timestamp-based unique ID generator for distributed systems, implemented in JavaScript. This implementation generates unique identifiers using a combination of the current timestamp, a worker/machine ID, and an internal sequence number, ensuring uniqueness across different instances and distributed deployments.

## Features

- **High Performance:** Capable of generating thousands of unique IDs per second.
- **Distributed System Friendly:** Incorporates worker IDs to ensure uniqueness across multiple instances.
- **BigInt Support:** Uses JavaScript's BigInt for handling large numbers, avoiding issues with precision and range.

## Installation

No installation required. You can copy the `TimestampBasedUniqueID.js` class into your project and use it as shown below.

## Usage

```javascript
const generator = new UniqueIdGenerator(); // Initialize
const uniqueID = generator.generateLongId(); // Generate a unique ID
console.log(uniqueID.toString());
