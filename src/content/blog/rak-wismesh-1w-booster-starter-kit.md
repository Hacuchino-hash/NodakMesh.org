---
title: "RAK WisMesh 1W Booster Starter Kit: High-Power Meshtastic Node Now Available"
description: "RAKwireless releases the WisMesh 1W Booster Starter Kit, a high-power Meshtastic-ready node featuring 1W (30 dBm) output, SX1262 transceiver, SKY66122 PA, and integrated SAW filter for extended range mesh networking."
date: 2025-01-11
author: "Josh"
category: "news"
tags: ["news", "meshtastic", "rakwireless", "hardware", "high-power"]
image: "/images/blog/rak-wismesh-1w-booster-kit.png"
featured: false
---

RAKwireless has released the **WisMesh 1W Booster Starter Kit**, a new high-power entry point into Meshtastic mesh networking that's generating genuine excitement in the community.

![RAK WisMesh 1W Booster Starter Kit](/images/blog/rak-wismesh-1w-booster-kit.png)

## What's in the Box

The kit comes as a complete package ready for assembly:

- **RAK19007 WisBlock Base Board** - The foundation with 4 sensor slots, battery charging, solar panel connector, and USB-C connectivity
- **RAK3401 WisBlock Core** - Powered by the Nordic nRF52840 microcontroller
- **RAK13302 1W LoRa Module** - The star of the show with SX1262 transceiver, SKY66122 PA, and integrated SAW filter
- **2x 900 MHz LoRa Antennas** - Both SMA and IPEX options included
- **USB-C Cable** - For programming and charging
- **Screws and Standoffs** - Everything needed for assembly

![RAK WisMesh 1W Booster Kit Components](/images/blog/rak-wismesh-1w-booster-components.png)

## The 1W RF Chain

What makes this kit stand out is the RF architecture. The signal path flows from the **nRF52840 MCU** through the **SX1262 LoRa transceiver**, then through an integrated **SAW filter** for clean RF filtering, and finally to the **SKY66122 power amplifier** which boosts output to a full 1W (30 dBm).

![1W RF Chain Architecture](/images/blog/rak-wismesh-1w-booster-rf-chain.png)

For context, most standard Meshtastic nodes operate around 100-250mW. This 4-10x power increase translates directly to extended range potential, which matters in regions like ours where nodes can be miles apart.

## RAK13302 LoRa Module

The RAK13302 is the key component that enables the high-power output. It combines the SX1262 transceiver with the SKY66122 front-end module in a compact WisBlock-compatible form factor.

![RAK13302 1W LoRa Module](/images/blog/rak-wismesh-1w-booster-module.png)

**Key RF Components:**
- **Transceiver:** Semtech SX1262 - Industry-standard LoRa chip with excellent sensitivity
- **Power Amplifier:** Skyworks SKY66122 - Enables the 1W (30 dBm) output
- **SAW Filter:** Integrated RF filtering for clean transmission
- **Antenna Connector:** IPEX (U.FL) with SMA adapter option

## Technical Specifications

### MCU (RAK3401 Core)
| Spec | Detail |
|------|--------|
| **Processor** | Nordic nRF52840 (ARM Cortex-M4F) |
| **Flash** | 1MB |
| **SRAM** | 256KB |
| **Interfaces** | UART, I2C, SPI, ADC, GPIO |

### RF (RAK13302 Module)
| Spec | Detail |
|------|--------|
| **LoRa Transceiver** | Semtech SX1262 |
| **Power Amplifier** | Skyworks SKY66122 |
| **RF Filter** | Integrated SAW filter |
| **TX Power** | Up to 30 dBm (1W) |
| **Frequency Band** | 900 MHz (US/CA) |

### Power (RAK19007 Base)
| Spec | Detail |
|------|--------|
| **Input** | 5V USB-C, 5V Solar, Battery |
| **Battery** | Rechargeable Li-Po supported |
| **Expansion** | 4 WisBlock sensor slots |

**Note:** The 1W output requires stable 5V power supply. The module cannot operate at full power from 3.3V sources.

## Assembled Kit

![RAK WisMesh 1W Booster Assembled](/images/blog/rak-wismesh-1w-booster-assembled.png)

The WisBlock modular design makes assembly straightforward - snap the modules together, secure with the included screws, and you're ready to flash Meshtastic firmware.

## Pricing

The WisMesh 1W Booster Starter Kit is available at **$39 USD** from the [RAKwireless store](https://store.rakwireless.com/products/wismesh-1w-booster-starter-kit).

## Why This Matters

For mesh network builders, particularly those working across rural or sparsely populated areas, transmit power is often the limiting factor for reliable node-to-node communication. Having a reasonably-priced, high-power option with quality RF components (SX1262 + SKY66122 + SAW filter) directly from a reputable manufacturer like RAKwireless gives the community another solid tool in the toolbox.

The WisBlock ecosystem also means this kit can be expanded with GPS modules, environmental sensors, displays, and various enclosure options.

It's exciting to see manufacturers continuing to invest in the Meshtastic ecosystem with purpose-built, high-performance hardware at accessible price points. For those of us building mesh networks in challenging environments, more options like this are always welcome.

---

*Interested in getting started with mesh networking? Check out our [Meshtastic Getting Started Guide](/meshtastic/getting-started) or browse [compatible devices](/meshtastic/devices).*
