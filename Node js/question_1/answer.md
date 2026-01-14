# Node.js Architecture (Point-wise Explanation)

## Overview

* Node.js is a JavaScript runtime used to build scalable network applications
* It follows an **event-driven, non-blocking I/O** model
* Designed to handle many concurrent requests efficiently

---

## Main Components of Node.js

* JavaScript Engine (V8)
* Node.js Core APIs
* Native Bindings
* Event Loop
* libuv

---

## JavaScript Engine (V8)

* Open-source engine developed by Google
* Written in C++
* Converts JavaScript into machine code
* Provides fast execution and garbage collection
* Executes all JavaScript code in Node.js

---

## Node.js Core APIs

* Built-in modules provided by Node.js
* Written using JavaScript and C++
* Used to interact with system resources
* Common modules include:

  * fs (File system)
  * http (Server creation)
  * path, os, events, crypto

---

## Native Bindings

* Connect JavaScript code with C/C++ code
* Allow Node.js to access OS-level features
* Act as a bridge between Core APIs and libuv

---

## Event Loop

* Core mechanism that handles asynchronous operations
* Runs in a single thread
* Continuously checks for pending tasks
* Executes callbacks when tasks are completed

---

## libuv

### What is libuv?

* A multi-platform C library
* Used internally by Node.js
* Provides asynchronous I/O support

### Why Node.js needs libuv

* JavaScript is single-threaded
* Many operations are blocking by nature
* libuv performs these operations asynchronously

### Responsibilities of libuv

* Manages the Event Loop
* Handles:

  * File system operations
  * Network operations
  * Timers
  * DNS resolution
* Manages the thread pool

---

## Thread Pool

### What is a thread pool?

* A collection of background threads
* Managed by libuv
* Default size is 4 threads

### Why Node.js uses a thread pool

* To execute blocking or CPU-heavy operations
* To keep the main event loop non-blocking

### Operations handled by the thread pool

* File system operations (fs module)
* DNS lookup
* Crypto operations
* Compression (zlib)

---

## Worker Threads

### What are worker threads?

* Separate threads for executing JavaScript code
* Each worker has its own event loop and memory

### Why worker threads are needed

* To handle CPU-intensive tasks
* To avoid blocking the main thread

### Difference between thread pool and worker threads

* Thread Pool:

  * Managed by libuv
  * Used internally by Node.js
  * No direct JavaScript control
* Worker Threads:

  * Managed by Node.js
  * Used by developers
  * Run JavaScript in parallel

---

## Event Loop Queues

### Macro Task Queue

* Contains:

  * setTimeout
  * setInterval
  * setImmediate
  * I/O callbacks

### Micro Task Queue

* Contains:

  * Promise.then()
  * catch()
  * finally()
  * process.nextTick()

### Execution Priority

* Micro Task Queue executes first
* Macro Task Queue executes after micro tasks

---

## Examples

### Micro Tasks

* Promise callbacks
* process.nextTick()

### Macro Tasks

* Timers (setTimeout, setInterval)
* I/O operations
* setImmediate

---

## Summary

* Node.js uses a single-threaded event loop
* libuv enables asynchronous operations
* Thread pool and worker threads handle heavy tasks
* This architecture ensures high performance and scalability
