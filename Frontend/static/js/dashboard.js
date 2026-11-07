
const API_URL = "/api/observation"; // Defines the Flask endpoint that provides observations.

function setText(id, value) { // Finds an HTML element and updates its text.
    const element = document.getElementById(id); // Retrieves the element using its ID.
    if (element) element.textContent = value; // Updates it only if the element exists.
}

function setProgress(id, value) { // Updates a progress bar.
    const element = document.getElementById(id); // Retrieves the progress bar.
    if (element) element.style.width = `${Math.min(100, Math.max(0, value))}%`; // Keeps the bar between 0 and 100%.
}

function formatGB(value) { // Converts a byte value into gigabytes.
    return `${(value / (1024 ** 3)).toFixed(1)} GB`; // Divides by 1024 three times and formats the result.
}

function renderHardware(data) { // Displays additional hardware information.
    const container = document.getElementById("hardware-details"); // Finds the hardware panel.
    const cpu = data.cpu; // Gets CPU information.
    const memory = data.memory; // Gets RAM information.
    const gpu = data.gpu?.[0]; // Gets the first GPU, if one exists.
    const system = data.system; // Gets operating system information.

    const details = [ // Creates the rows that will appear in the panel.
        ["Processor cores", `${cpu.physical_cores} physical / ${cpu.logical_cores} logical`],
        ["CPU frequency", `${cpu.frequency.toFixed(0)} MHz`],
        ["RAM capacity", formatGB(memory.total * (1024 ** 3))],
        ["Operating system", `${system.name} ${system.release}`],
        ["Graphics card", gpu?.name ?? "Not detected"],
        ["Running processes", data.processes.length]
    ];

    container.replaceChildren(); // Removes the previous hardware rows.

    details.forEach(([label, value]) => { // Creates one HTML row for each detail.
        const row = document.createElement("div"); // Creates a new row.
        row.className = "detail-row"; // Applies the row styling.

        const name = document.createElement("span"); // Creates the label.
        name.textContent = label; // Sets the label text.

        const result = document.createElement("span"); // Creates the value.
        result.textContent = value; // Sets the value text.

        row.append(name, result); // Adds both elements to the row.
        container.appendChild(row); // Adds the row to the hardware panel.
    });
}

function renderEvents(events) { // Displays detected system events.
    const container = document.getElementById("system-events"); // Finds the event panel.
    container.replaceChildren(); // Clears previous events.

    if (!events || events.length === 0) { // Checks whether any events were detected.
        const message = document.createElement("p"); // Creates an empty-state message.
        message.className = "muted"; // Applies secondary text styling.
        message.textContent = "No events detected."; // Displays the message.
        container.appendChild(message); // Adds the message to the panel.
        return; // Stops the function here.
    }

    events.forEach(event => { // Processes every detected event.
        const row = document.createElement("div"); // Creates an event row.
        row.className = "event-row"; // Applies event styling.

        const type = document.createElement("span"); // Creates the event type.
        type.className = "event-type"; // Applies the gold event styling.
        type.textContent = event.type.toUpperCase(); // Displays the event type.

        const message = document.createElement("span"); // Creates the event description.
        message.textContent = event.message; // Displays the event message.

        row.append(type, message); // Adds both elements to the row.
        container.appendChild(row); // Adds the event to the panel.
    });
}

function renderObservation(data) { // Updates the entire dashboard with a new observation.
    const cpu = data.cpu; // Extracts CPU information.
    const memory = data.memory; // Extracts RAM information.
    const gpu = data.gpu?.[0]; // Extracts the first GPU, if available.
    const disk = data.disk?.[0]; // Extracts the first disk, if available.

    setText("cpu-usage", `${cpu.usage.toFixed(1)}%`); // Displays CPU utilization.
    setProgress("cpu-bar", cpu.usage); // Updates CPU progress bar.
    setText("cpu-detail", `${cpu.frequency.toFixed(0)} MHz · ${cpu.logical_cores} logical cores`); // Displays CPU details.

    setText("memory-usage", `${memory.percent.toFixed(1)}%`); // Displays RAM utilization.
    setProgress("memory-bar", memory.percent); // Updates RAM progress bar.
    setText("memory-detail", `${memory.used.toFixed(1)} / ${memory.total.toFixed(1)} GB used`); // Displays RAM capacity.

    if (gpu) { // Checks whether a GPU was detected.
        setText("gpu-usage", `${gpu.usage.toFixed(1)}%`); // Displays GPU utilization.
        setProgress("gpu-bar", gpu.usage); // Updates GPU progress bar.
        setText("gpu-detail", `${gpu.temperature.toFixed(0)} °C · ${gpu.name}`); // Displays GPU temperature and name.
    } else {
        setText("gpu-usage", "N/A"); // Displays unavailable GPU data.
        setText("gpu-detail", "No GPU detected"); // Explains missing GPU data.
    }

    if (disk) { // Checks whether a disk was detected.
        setText("disk-usage", `${disk.Percent.toFixed(1)}%`); // Displays disk utilization.
        setProgress("disk-bar", disk.Percent); // Updates disk progress bar.
        setText("disk-detail", `${disk.Used.toFixed(1)} / ${disk.Total.toFixed(1)} GB used`); // Displays disk capacity.
    } else {
        setText("disk-usage", "N/A"); // Displays unavailable disk data.
        setText("disk-detail", "No disk detected"); // Explains missing disk data.
    }

    renderHardware(data); // Updates the hardware information panel.
    renderEvents(data.events); // Updates the system events panel.

    setText("last-update", new Date().toLocaleTimeString()); // Displays the time of the latest observation.
}

async function updateDashboard() { // Requests a new observation from CHAOS.
    try {
        const response = await fetch(API_URL); // Sends a request to the Flask API.

        if (!response.ok) throw new Error("API request failed"); // Detects unsuccessful HTTP responses.

        const data = await response.json(); // Converts the response into a JavaScript object.

        renderObservation(data); // Sends the observation to the dashboard.

        setText("connection-status", "SYSTEM ONLINE"); // Updates connection status.
    } catch (error) {
        console.error("CHAOS observation error:", error); // Prints the error in the browser console.
        setText("connection-status", "CONNECTION LOST"); // Shows that the API is unavailable.
    }
}

updateDashboard(); // Performs the first observation immediately.

setInterval(updateDashboard, 3000); // Requests new observations every three seconds.
