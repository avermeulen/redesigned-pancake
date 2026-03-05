# redesigned-pancake

A Node-RED project that reads messages from an MQTT broker, extracts text from the message payload, and forwards it to another MQTT topic when it matches a given scenario.

## How It Works

```
[MQTT In: input/messages]
        │
        ▼
[Extract Text (Function)]
        │
        ▼
[Match Scenario (Switch)]
        ├── contains "ALERT"   → [Prepare Alert]   → [MQTT Out: output/alerts]
        └── contains "WARNING" → [Prepare Warning] → [MQTT Out: output/warnings]
```

### Flow Description

| Node | Type | Description |
|------|------|-------------|
| Subscribe: input/messages | MQTT In | Listens for messages on the `input/messages` topic |
| Extract Text | Function | Parses the JSON payload and extracts the `text` field |
| Match Scenario | Switch | Routes the message based on whether the text contains `ALERT` or `WARNING` |
| Prepare Alert Message | Function | Enriches the payload with scenario metadata |
| Prepare Warning Message | Function | Enriches the payload with scenario metadata |
| Publish: output/alerts | MQTT Out | Publishes matched ALERT messages to `output/alerts` |
| Publish: output/warnings | MQTT Out | Publishes matched WARNING messages to `output/warnings` |

## Message Format

### Input (`input/messages`)

The flow expects a JSON payload with a `text` field:

```json
{
  "text": "ALERT: sensor threshold exceeded",
  "source": "sensor-01"
}
```

Plain strings are also supported — the entire string is treated as the text.

### Output (`output/alerts` or `output/warnings`)

```json
{
  "text": "ALERT: sensor threshold exceeded",
  "scenario": "ALERT",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "input/messages"
}
```

## Scenarios

| Keyword in `text` | Routed to Topic |
|-------------------|-----------------|
| `ALERT` | `output/alerts` |
| `WARNING` | `output/warnings` |

A single message can match **both** scenarios (e.g. `"ALERT and WARNING: ..."`) and will be published to both output topics.

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- An MQTT broker running on `localhost:1883` (e.g. [Mosquitto](https://mosquitto.org/))

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the MQTT broker

By default the flow connects to `localhost:1883`. To change the broker address, open `flows.json` and update the `mqtt-broker` config node:

```json
{
  "id": "mqtt-broker",
  "type": "mqtt-broker",
  "broker": "your-broker-host",
  "port": "1883"
}
```

Alternatively, edit the broker settings directly in the Node-RED editor after starting the application.

### 3. Start Node-RED

```bash
npm start
```

The Node-RED editor will be available at [http://localhost:1880](http://localhost:1880).

### 4. Test the flow

With an MQTT client (e.g. `mosquitto_pub`), publish a test message:

```bash
# Trigger the ALERT scenario
mosquitto_pub -h localhost -t "input/messages" -m '{"text": "ALERT: high temperature detected", "source": "sensor-01"}'

# Trigger the WARNING scenario
mosquitto_pub -h localhost -t "input/messages" -m '{"text": "WARNING: battery low", "source": "sensor-02"}'

# Trigger both scenarios at once
mosquitto_pub -h localhost -t "input/messages" -m '{"text": "ALERT and WARNING: critical failure", "source": "sensor-03"}'
```

Subscribe to the output topics to see the routed messages:

```bash
mosquitto_sub -h localhost -t "output/#"
```

## Project Structure

```
.
├── flows.json      # Node-RED flow definition
├── settings.js     # Node-RED runtime settings
├── package.json    # Node.js project manifest
└── README.md       # This file
```
