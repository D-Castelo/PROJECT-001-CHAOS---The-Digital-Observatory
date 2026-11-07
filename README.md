# PROJECT 001: CHAOS — The Digital Observatory

> Observe. Understand. Create. Improve.

## Overview

CHAOS is a personal engineering and technology laboratory designed to observe, understand, analyze, and eventually interact with the digital and physical world.

It begins as a Digital Observatory: a system capable of collecting information from computer hardware, organizing observations, storing historical data, identifying events, and presenting information through a visual interface.

However, the long-term vision extends far beyond system monitoring.

CHAOS is intended to evolve into an integrated environment for experimentation, engineering, simulation, intelligent systems, and technological creation.

The project follows a continuous cycle:

**Observe → Represent → Store → Analyze → Reason → Create → Build → Measure → Improve.**

## Current Stage — V0.8: Visual Observatory

CHAOS has evolved from a command-line observation system into a web-based observatory.

The current architecture includes hardware monitoring, data collection, SQLite storage, basic analysis, deterministic event detection, and a live dashboard accessible through a local web server.

The project also contains an initial Environment module for future physical-world observations.

## System Architecture

### 1. Hardware Observation — Core

The Core modules collect information about the computer's hardware and operating environment.

**CPU**
- CPU usage.
- Current frequency.
- Physical cores.
- Logical cores.

**GPU**
- GPU identification.
- GPU utilization.
- Temperature.
- Clock speed.
- VRAM.
- Power consumption.
- Fan speed.

GPU monitoring currently uses AMD ADLX.

**Disk**
- Storage devices.
- Mount points.
- Filesystem.
- Total capacity.
- Used and available space.
- Usage percentage.

**Memory**
- RAM total, available, used, and usage percentage.
- Swap total, used, and usage percentage.

**System**
- Operating system.
- Hostname.
- OS release.
- Machine architecture.
- Python version.
- Boot time.
- Uptime.

### 2. Activity Observation

CHAOS also observes activity occurring inside the operating system.

**Processes**
- Process identification.
- PID.
- Process name.
- Status.
- CPU usage.
- Memory usage.

**Network**
- Network interfaces.
- Interface addresses.
- Address families.
- Bytes sent and received.
- Packets sent and received.

### 3. Environment — Physical Observation

The Environment module establishes the initial structure for observing conditions outside the computer itself.

Current modules:
- `humidity.py` — humidity observation.
- `light.py` — light observation.
- `temperature.py` — temperature observation.

These modules are part of the developing architecture. Physical sensor integration and unified environmental observation remain future development tasks.

### 4. Data System

The Data system provides the foundation for organizing and preserving observations.

Current capabilities:
- Python data structures.
- SQLite database.
- SQL tables.
- Historical observation storage.
- Data retrieval.
- Parameterized queries.
- JSON serialization.

Complete observations can be stored as structured JSON records in the database.

### 5. Orchestration — CHAOS

The `CHAOS` module acts as the central orchestrator.

It brings together the observation modules and creates a unified representation of the system.

Current observation flow:

`CPU + GPU + Disk + Memory + System + Processes + Network`

The resulting observation can be processed by the event detection system and stored in the database.

### 6. Event Detection

CHAOS currently supports deterministic event detection.

Implemented example:
- High disk usage detection.
- Configurable threshold logic.
- Structured event creation.

Events contain:
- Type.
- Source.
- Message.
- Associated data.

The current disk usage alert uses a 90% threshold.

### 7. Data Analysis

The project includes initial analytical capabilities.

Current examples:
- Average CPU usage calculation.
- Retrieval of historical CPU observations.
- Basic analysis of collected information.

Future analytical capabilities include:
- Trend analysis.
- Threshold monitoring.
- Anomaly detection.
- Historical comparisons.
- Correlation analysis.
- Pattern recognition.

Current analysis is deterministic and rule-based, not AI-driven.

### 8. Continuous Observation

CHAOS includes scheduled observation capabilities.

The current scheduler can collect CPU usage at regular intervals, with a 10-minute interval configured for the initial scheduled observation workflow.

The long-term objective is to establish continuous observation cycles across the entire system.

### 9. Visual Observatory — Frontend

V0.8 introduces a web-based interface for visualizing system observations.

The frontend is built with Flask, HTML, CSS, and JavaScript.

Current capabilities:
- Local Flask web server.
- JSON observation API.
- Hardware monitoring dashboard.
- CPU, memory, GPU, and storage metrics.
- Hardware information panels.
- System event visualization.
- Automatic dashboard updates every 3 seconds.

The frontend retrieves information through the `/api/observation` endpoint.

The dashboard provides a visual layer over the existing observation architecture.

## Project Structure

```text
PROJECT-001-CHAOS/
│
├── Core/
│   ├── __init__.py
│   ├── cpu.py
│   ├── disk.py
│   ├── memory.py
│   ├── system.py
│   └── gpu.py
│
├── Data/
│   ├── __init__.py
│   ├── data.py
│   └── database.py
│
├── Events/
│   ├── __init__.py
│   └── events.py
│
├── Network/
│   ├── __init__.py
│   └── network.py
│
├── Processes/
│   ├── __init__.py
│   └── processes.py
│
├── Environment/
│   ├── humidity.py
│   ├── light.py
│   └── temperature.py
│
├── CHAOS/
│   ├── __init__.py
│   └── chaos.py
│
├── Frontend/
│   ├── app.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── css/
│       │   └── style.css
│       └── js/
│           └── dashboard.js
│
├── .gitignore
└── README.md
```

## Technologies

**Programming**
- Python

**Hardware and System Observation**
- psutil
- AMD ADLX
- platform

**Data and Storage**
- SQLite
- sqlite3
- JSON

**Automation**
- schedule
- time

**Web Interface**
- Flask
- HTML
- CSS
- JavaScript

## Conceptual Model

CHAOS currently follows this development model:

`Observe → Store → Retrieve → Analyze → Detect → Visualize → Improve → Observe Again`

This model will evolve as the system gains more sophisticated analytical, engineering, and reasoning capabilities.

## Future Development

The next stages will expand the observatory into a broader engineering environment.

Potential development directions include:

- Historical data visualization.
- More comprehensive event detection.
- Continuous observation across all modules.
- Physical sensor integration.
- Environmental monitoring.
- Advanced data analysis.
- Anomaly detection and predictive capabilities.
- Simulation and experimentation tools.
- AI-assisted analysis and reasoning.

AI and more advanced reasoning systems will be introduced on top of this foundation as the architecture matures.

## Project Status

**Development Status:** In active development.

**Current Version:** V0.8 — Visual Observatory.

**Core Observation**
- CPU.
- GPU.
- Disk.
- Memory.
- System information.

**Activity Observation**
- Processes.
- Network interfaces and traffic.

**Environment**
- Initial humidity, light, and temperature modules.
- Physical sensor integration still under development.

**Data**
- SQLite storage.
- Historical observation retrieval.
- Complete observation serialization.

**Analysis**
- Basic CPU analysis.
- Deterministic event detection.

**Automation**
- Scheduled CPU observation.

**Orchestration**
- Unified observation through `CHAOS`.

**Frontend**
- Flask server.
- JSON API.
- Live hardware dashboard.
- Automatic updates.

**Next Milestones**
- Historical visualization.
- Expanded event detection.
- Continuous observation.
- Physical sensor integration.
- More sophisticated analysis.

---

*CHAOS is not intended to remain a system monitor. The Digital Observatory is only the beginning.*