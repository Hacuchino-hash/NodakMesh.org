---
title: "Introducing the RAK WisMesh 1W Booster Starter Kit (RAK10724)"
description: "RAKwireless releases the WisMesh 1W Booster Starter Kit, a high-power Meshtastic-ready node featuring 1W (30 dBm) output, SX1262 transceiver, SKY66122 PA, and integrated SAW filter for extended range mesh networking."
date: 2026-01-11
author: "Josh"
category: "news"
tags: ["news", "meshtastic", "rakwireless", "hardware", "high-power", "wisblock"]
image: "/images/blog/rak-wismesh-1w-booster-kit.png"
featured: false
---

RAKwireless just released the WisMesh 1W Booster Starter Kit, a high-power mesh node that doesn't require soldering or custom RF work. It combines a Nordic nRF52840 microcontroller with a 1-watt LoRa radio on a standard WisBlock base board. You get significantly longer range than typical Meshtastic devices, right out of the box.

![RAK WisMesh 1W Booster Starter Kit](/images/blog/rak-wismesh-1w-booster-kit.png)

The kit includes the RAK3401 core module (nRF52840 MCU), the RAK13302 1W LoRa radio module, a WisBlock base board, antennas, cables, and mounting hardware.

## A High-Power Addition to the WisBlock Family

If you know WisBlock, you know it's modular. Base board, core module, optional sensors-all snap together. The WisMesh 1W kit follows that pattern: a RAK3401 core (nRF52840 with BLE) paired with the RAK13302 LoRa transceiver, mounted on the RAK19007 base board. Together they make a Meshtastic-compatible node with serious range. Think of it as the long-distance option in the WisBlock lineup-more power draw, but much better reach.

![WisMesh 1W Booster Kit Components](/images/blog/rak-wismesh-1w-booster-components.png)

The base board has multiple expansion slots. Want a weather station that also relays messages? Add sensor modules. Need GPS tracking? Snap in a GPS module. No soldering. The 1W kit isn't a closed box-it's a platform you can build on.

## What Makes It Different

Most LoRa mesh nodes (including the RAK4631) transmit at 100-160 mW (20-22 dBm). Fine for around town, but limiting in open country or hilly terrain. The WisMesh kit pushes 1 watt (30 dBm). That's nearly 10x the power. You can cover several times the distance-think valley-scale coverage from a single node instead of neighborhood-scale.

![1W RF Chain Architecture](/images/blog/rak-wismesh-1w-booster-rf-chain.png)

RAK didn't just bolt on a stronger amp. The RAK13302 module includes a Skyworks SKY66122 power amplifier plus an integrated SAW filter and LNA for the receiver. This matters because many high-power LoRa setups blast out signals but can't hear replies-the amp desensitizes the receiver. The filtered front-end here keeps receive sensitivity strong even at 1W output. You get better transmission and better reception.

![RAK13302 1W LoRa Module](/images/blog/rak-wismesh-1w-booster-module.png)

The nRF52840 MCU is a known quantity-it's in plenty of IoT devices and handles Meshtastic well. BLE support for phone configuration, enough flash and RAM for complex firmware, low power when idle. The kit ships with Meshtastic pre-loaded, so you can power it on and start messaging immediately.

## vs. Standard RAK4631 Nodes

If you're coming from a RAK4631 setup, here's what's different:

### Power Output

RAK4631: ~100 mW (20 dBm). WisMesh 1W: 1000 mW (30 dBm). That's the main event. Range goes from hundreds of meters to multiple kilometers depending on terrain. Where a standard node starts dropping packets, this one keeps going.

### Receiver Performance

The WisMesh kit has a dedicated SAW filter and LNA. Standard nodes don't. The RAK4631's receiver is decent, but the WisMesh kit picks up weaker signals. Important in mesh networks-no point in shouting if you can't hear the reply.

### Architecture

The RAK4631 integrates the LoRa transceiver into the core module. The WisMesh kit separates them: RAK3401 handles MCU and BLE, RAK13302 handles the radio. This means you could theoretically swap radio modules later. For most users, the kit comes pre-assembled and works the same way.

### Power Requirements

Standard nodes sip power from a 3.3V supply. The 1W module needs more-it can't run from 3.3V alone. Use USB, a Li-Ion battery, or solar with battery backup. The base board supports all three. At 1W, expect higher current draw during transmission, so plan your power budget accordingly.

Setup is still straightforward. Same Meshtastic app, same web interface. The extra power happens automatically.

## Field Ready

RAK built this for outdoor deployments. The RAK19007 base has USB-C for power and programming, a battery connector, and solar panel input. Mount it on a hilltop with a solar panel and battery, and it'll run indefinitely. The kit includes the cables you need for battery hookup.

![WisMesh 1W Booster Assembled](/images/blog/rak-wismesh-1w-booster-assembled.png)

The base board has four expansion slots. Add GPS for location tracking, environmental sensors for monitoring, or an OLED display for on-site status. All WisBlock modules use standard connectors, so mixing and matching is easy. Start with a basic mesh node, add capabilities as needed.

The physical build is solid. RAK includes screws to secure the modules-important if you're mounting this somewhere it'll get bumped around. The RF design handles heat from the PA properly.

## Firmware Support

Meshtastic works now. RAKwireless ships the kit with it pre-installed, and the official Meshtastic project has a dedicated firmware target for the RAK3401+RAK13302 combo. Use the standard apps (Android, iOS, web) to configure it. Your 1W node talks to regular nodes just fine-it just reaches further.

MeshCore doesn't support this hardware yet (as of January 2025). The nRF52840 + SX1262 foundation is common enough that support will probably come eventually. For now, Meshtastic is the option.

## Bottom Line

The WisMesh 1W Booster Starter Kit is $39 from RAKwireless. For that you get a 1W mesh node with proper RF filtering, WisBlock expandability, and Meshtastic pre-installed. A year ago, getting 1W LoRa meant expensive amplifiers or janky DIY setups. This is a clean, ready-to-use package.

Good for remote repeaters, rural coverage, emergency comms, or anywhere you need to push range beyond what standard nodes can do.

**Get it:** [$39 USD from the RAKwireless store](https://store.rakwireless.com/products/wismesh-1w-booster-starter-kit)

---

*New to mesh networking? Check out our [Meshtastic Getting Started Guide](/meshtastic/getting-started), [MeshCore Getting Started Guide](/meshcore/getting-started), or browse [compatible devices](/meshtastic/devices).*
