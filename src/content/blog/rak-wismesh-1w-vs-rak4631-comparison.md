---
title: "RAK WisMesh 1W Booster vs RAK4631: Which WisBlock is Right for Your Mesh Network?"
description: "Technical comparison of the RAK WisMesh 1W Booster Starter Kit (RAK10724) and RAK4631 WisBlock Core for Meshtastic. Compare RF power, range, power consumption, and expandability."
date: 2025-01-11
author: "Josh"
category: "guides"
tags: ["meshtastic", "rakwireless", "hardware", "comparison", "wisblock"]
image: "/images/blog/rak-wismesh-1w-booster-kit.png"
featured: false
---

Choosing between RAKwireless WisBlock options for Meshtastic? This comparison breaks down the technical differences between the **WisMesh 1W Booster Starter Kit (RAK10724)** and a standard **RAK4631 WisBlock Core** setup.

## Quick Comparison

| Spec | WisMesh 1W Booster Kit | RAK4631 WisBlock |
|------|------------------------|------------------|
| **TX Power** | 30 dBm (1W) | 22 dBm (~160mW) |
| **MCU** | nRF52840 (RAK3401) | nRF52840 (integrated) |
| **LoRa Transceiver** | SX1262 | SX1262 |
| **Power Amplifier** | SKY66122 | None (SX1262 internal PA) |
| **RF Filter** | Integrated SAW filter | Basic matching network |
| **TX Current** | ~1000mA @ 30dBm | ~125mA @ 22dBm |
| **Power Supply** | Requires 5V | 3.3V (from battery/USB) |
| **Price** | ~$39 | ~$25-30 (core + base) |
| **Best For** | Long-range, rural deployments | General use, portable nodes |

## Hardware Architecture

### WisMesh 1W Booster Kit

The WisMesh 1W kit uses a **two-module approach**:

- **RAK3401 WisBlock Core** - Nordic nRF52840 MCU (no integrated LoRa)
- **RAK13302 1W LoRa Module** - SX1262 + SKY66122 PA + SAW filter

![WisMesh 1W RF Chain](/images/blog/rak-wismesh-1w-booster-rf-chain.png)

The RF signal path flows: nRF52840 MCU → SX1262 transceiver → SAW filter → SKY66122 PA → antenna. This architecture allows for the 1W output while maintaining receiver sensitivity through the integrated LNA and filtering.

### RAK4631 WisBlock Core

The RAK4631 is a **single-module solution** with the nRF52840 MCU and SX1262 LoRa transceiver integrated on one board.

![RAK4631 WisBlock Core](/images/blog/rak4631-wisblock-core.png)

The RF chain is simpler: nRF52840 → SX1262 → basic matching network → antenna. Maximum output is 22 dBm using the SX1262's internal PA boost mode.

## RF Performance

### Transmit Power

The 8 dB difference between 22 dBm and 30 dBm is significant:

- **22 dBm** = ~160 mW
- **30 dBm** = 1000 mW (1W)

In ideal conditions, each 6 dB increase roughly doubles theoretical range. The WisMesh 1W kit can potentially cover several times the distance of a standard RAK4631 node.

### Receiver Sensitivity

The WisMesh 1W kit includes an LNA (Low Noise Amplifier) and SAW band-pass filter in the RAK13302 module. This cleans out-of-band noise and amplifies incoming signals, potentially improving receive performance compared to simple amplifier add-ons that can degrade RX sensitivity.

The RAK4631 relies on the SX1262's internal receiver, which achieves around -137 to -140 dBm sensitivity at SF12—already quite good for most applications.

## Power Requirements

This is one of the most important practical differences.

### WisMesh 1W Kit

- **Requires 5V supply** for full 1W output
- Peak current draw: **~1000mA at 30 dBm**
- Options: USB power, external 5V, or LiPo battery (4.2V max may reduce output slightly)
- Higher TX current means faster battery drain
- Voltage sag from weak batteries can cause resets

### RAK4631

- **Operates from 3.3V** (regulated from battery or USB)
- TX current: **~125mA at 22 dBm**
- Standard LiPo batteries work without issues
- Much longer battery life for the same capacity

**Bottom line:** The WisMesh 1W kit needs beefier power infrastructure. Plan for larger batteries, more frequent charging, or solar supplementation for remote deployments.

## Thermal Considerations

Pushing 1W of RF from a small module generates heat. The SKY66122 PA in the WisMesh kit will warm up during transmission.

For typical Meshtastic usage (bursty, low duty cycle messaging), this isn't a problem. However:

- Avoid continuous high-power transmissions
- Don't enclose the 1W kit in a tight, unventilated box at max power
- Consider duty cycle if sending frequent messages

The RAK4631 at 22 dBm generates negligible heat—around 0.3-0.4W during TX, easily dissipated by the board itself.

## Regulatory Compliance

### US (FCC Part 15.247)

Both devices operate in the 902-928 MHz ISM band. The US allows up to 1W (30 dBm) for spread spectrum devices meeting certain conditions (frequency hopping or sufficient bandwidth). The WisMesh 1W kit's 30 dBm output is legal when properly configured.

### Europe (CE) and Other Regions

The RAK13302 module is **tuned for 900 MHz only**. It is not designed for EU 868 MHz use—attempting to use it at 868 MHz would result in poor performance.

EU868 typically limits EIRP to 14-27 dBm depending on sub-band and duty cycle requirements. The RAK4631's 22 dBm max is within or near these limits and is available in regional variants (RAK4631-H for 779-923 MHz, RAK4631-L for 433-470 MHz).

**For non-US users:** The WisMesh 1W kit is primarily a US/Canada/Australia product. If used elsewhere, output must be reduced in firmware to meet local regulations.

## Meshtastic Firmware

Both platforms are fully supported by Meshtastic firmware with different builds:

- **WisMesh 1W Kit:** Uses `firmware-rak3401-...` builds (controls external PA)
- **RAK4631:** Uses standard `firmware-rak4631-...` builds

Both ship with Meshtastic pre-flashed. Functionally identical features—BLE configuration, mesh routing, encryption, position sharing (with GPS module). The nRF52840 MCU provides Bluetooth 5.0 for mobile app connectivity on both.

A mixed mesh with 1W and standard nodes works fine—they just have different coverage footprints.

## Expandability

Both leverage the WisBlock modular ecosystem.

### WisMesh 1W Kit (RAK19007 Base)

- 1 core slot (RAK3401)
- 1 IO slot (occupied by RAK13302)
- **4 sensor slots free** for expansion
- USB-C, battery connector, solar input

### RAK4631 on RAK19007

- 1 core slot (RAK4631 with integrated LoRa)
- 1 IO slot **free**
- 4 sensor slots free
- Same power options

### RAK4631 on RAK19003 Mini Base

- Smaller footprint (30 × 35mm)
- 1 core slot + 2 general slots
- Good for size-constrained builds

Both can add GPS (RAK12500), environmental sensors, displays (RAK1921 OLED), accelerometers, and more. The RAK4631 has a slight edge in available slots since its LoRa is integrated rather than using an IO slot.

## Which Should You Choose?

### Choose WisMesh 1W Booster Kit if:

- You're in the US/Canada/Australia (900 MHz regions)
- Maximum range is your priority
- You're building infrastructure nodes or remote sensors
- You have adequate power (USB, solar, large batteries)
- You're covering rural/sparse areas where every dB matters

### Choose RAK4631 WisBlock if:

- You need a portable, battery-efficient node
- You're in Europe or other regions with lower power limits
- Standard range (hundreds of meters to a few km) is sufficient
- You want a simpler power setup
- You're building multiple nodes on a budget

## Pricing

| Option | Approximate Price |
|--------|-------------------|
| WisMesh 1W Booster Starter Kit | $39 |
| RAK4631 WisBlock Core | $25-30 |
| RAK19007 Base Board | $15 |
| RAK19003 Mini Base | $10 |

A basic RAK4631 + RAK19003 setup runs about $35-40—similar to the WisMesh 1W kit but with lower power output and consumption.

## Conclusion

The WisMesh 1W Booster Kit and RAK4631 WisBlock share the same foundation (nRF52840 MCU, SX1262 transceiver, WisBlock ecosystem) but serve different use cases. The 1W kit trades power efficiency and simplicity for raw RF output. The RAK4631 is the practical choice for most users—sufficient range, easy power management, and broad regional compatibility.

Both integrate seamlessly with Meshtastic and the WisBlock expansion ecosystem, so you're not locked into a dead end with either choice.

---

*Ready to get started? Check out our [Meshtastic Getting Started Guide](/meshtastic/getting-started) or browse [compatible devices](/meshtastic/devices).*
