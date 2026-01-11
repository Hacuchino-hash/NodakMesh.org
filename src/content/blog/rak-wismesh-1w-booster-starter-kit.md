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

RAKwireless has a new treat for mesh networking enthusiasts: the WisMesh 1W Booster Starter Kit. This modular kit is the latest addition to the WisBlock ecosystem, RAK's line of snap-together IoT modules, and it's purpose-built for long-range LoRa mesh networks. In essence, it's a high-power Meshtastic-ready node that pairs a Nordic nRF52840 microcontroller core with a beefed-up 1-watt LoRa radio, all mounted on a WisBlock base board. The result? A plug-and-play device that promises to send your mesh signals farther and more reliably than ever before, without requiring you to solder or cobble together custom RF boosters.

![RAK WisMesh 1W Booster Starter Kit](/images/blog/rak-wismesh-1w-booster-kit.png)

The WisMesh 1W Booster Starter Kit (RAK10724) is a modular high-power mesh node. It includes the RAK3401 core module (nRF52840 MCU), the RAK13302 1W LoRa radio module, a WisBlock base board, and accessories like antennas, cables, and mounting hardware.

## A New High-Power Member of the WisBlock Family

If you're familiar with RAK's WisBlock system, you'll know it's all about modularity. A typical WisBlock setup has a base board, a core processing module, and optional sensor or radio modules, all plug-in and interchangeable. The WisMesh 1W Booster Kit follows this recipe: it uses the RAK3401 WisBlock Core (featuring the popular nRF52840 BLE-capable MCU) and the RAK13302 LoRa transceiver as a duo. Together on the base board (RAK19007), they form a Meshtastic-compatible node that significantly ups the range ante. This kit brings more TX power and better reception to community mesh networks, fitting right into the WisBlock ecosystem as a specialized high-range node. In the WisBlock family lineup, think of it as the long-distance runner, trading a bit of extra power draw and size for a big boost in wireless reach.

![WisMesh 1W Booster Kit Components](/images/blog/rak-wismesh-1w-booster-components.png)

Crucially, because it's WisBlock, expandability is in its DNA. The base board includes multiple slots to add sensors or peripherals as your project demands. Want to build a weather monitor that can also relay messages miles away? Or a GPS tracker that stays linked to your off-grid chat network? Just snap in the appropriate sensor modules, no soldering needed. The WisBlock modular ecosystem allows you to expand with sensors, displays, trackers, or repeater nodes with ease. In other words, the 1W Booster Kit isn't a closed black box; it's more like a LEGO kit for long-range IoT, inviting you to tinker and customize for your own field deployments or experiments.

## Key Features and What Makes It Different

So what's the big deal about this kit? The headline feature is right in the name: "1W Booster." Typical LoRa mesh nodes (including earlier RAK WisBlock kits based on the RAK4631 core) transmit at around 100-160 mW max output power. That's roughly 20-22 dBm, fine for hobbyist use, but sometimes lacking when you venture into wide open spaces or hilly terrain. The new WisMesh kit blows past that limit with a full 1 watt (30 dBm) transmit power capability. In practical terms, this means you can expect several times the coverage range of a standard Meshtastic node under similar conditions. It's the difference between covering a town park versus covering an entire valley with just a single node. For mesh networkers chasing range, that's a game-changer.

![1W RF Chain Architecture](/images/blog/rak-wismesh-1w-booster-rf-chain.png)

However, RAK didn't simply slap a stronger amplifier on the radio and call it a day. A lot of thought went into RF design for reliability. The RAK13302 LoRa module on this kit not only includes a Skyworks SKY66122 power amplifier to reach 1W, but also an integrated SAW filter and LNA (low-noise amplifier) for the receiver. Why does that matter? Many DIY 1W boosters or off-the-shelf high-power LoRa boards focus only on transmit power and end up deafening or desensitizing the receiver. By contrast, this kit's filtered RF front-end significantly enhances receiver sensitivity even as it cranks up the transmit signal. In short, you get cleaner signals and better ears: stronger outgoing packets and improved incoming reception. That translates to more stable links and higher packet delivery rates at long distance, not just raw range on paper. The filtered 1W design yields longer range, more stable links, and stronger mesh reliability, ideal for challenging scenarios like outdoor adventures, emergency communications, or wide-area IoT coverage.

![RAK13302 1W LoRa Module](/images/blog/rak-wismesh-1w-booster-module.png)

Another key feature is the choice of brain: the kit uses the Nordic nRF52840 microcontroller, a modern 32-bit ARM chip that has become a staple in IoT devices. If you've used Meshtastic on other hardware (like the earlier RAK4631 or the popular T-Beam), you'll appreciate that the nRF52840 ensures Bluetooth Low Energy support (for smartphone configuration) and plenty of flash and RAM for complex firmware. It's a proven, low-power MCU that also means firmware compatibility with existing Meshtastic builds is seamless. In fact, the kit comes pre-loaded with Meshtastic firmware, so it can start meshing out-of-the-box. The nRF52840 also makes it possible to use the device as a BLE bridge or sensor hub in the future, given its capabilities. Overall, the combination of nRF52840 + SX1262 LoRa radio + SKY66122 PA defines this kit's hardware personality: muscular radio performance, but with a reliable, open-source-friendly MCU at the helm.

## How It Compares to Standard RAK4631-Based Nodes

Many in the community will be coming from the earlier WisBlock Meshtastic kits or custom nodes based on the RAK4631 (the original WisBlock LoRa module) or similar boards. At first glance, the WisMesh 1W Booster Starter Kit looks pretty similar, it's still a small WisBlock board with an antenna. But under the hood, there are major differences worth noting:

### Dramatically Higher RF Power

The most obvious difference is the jump from ~0.1 W to 1 W transmit power. The RAK4631's built-in LoRa transceiver could do around 20 dBm (100 mW) reliably. This new kit can do 30 dBm (1000 mW) thanks to the external PA. That is nearly an order of magnitude increase in power. In mesh network terms, that could mean going from a few hundred meters of range to multiple kilometers, depending on terrain. With 1W and the special RF front-end, you gain up to several times the coverage of standard Meshtastic nodes. In other words, where a normal node might start dropping messages, the boosted node keeps the chat flowing.

### Enhanced Receive Sensitivity

Unlike a stock RAK4631 (or many off-the-shelf LoRa boards), the WisMesh kit's radio uses that dedicated SAW filter and LNA mentioned earlier. This is a bit like giving the radio a better antenna and a hearing aid. Standard nodes don't usually have these; the RAK4631's receiver was good, but not explicitly amplified. The WisMesh kit's receiver is enhanced compared to the standard, meaning it can pick up weaker signals. This is crucial in mesh networks where every node both talks and listens, there's no point shouting if you can't hear the reply. The new kit excels at both.

### Modular Radio vs. Integrated Radio

In the RAK4631, the LoRa transceiver was built into the core module itself. Here, RAK split the design: the RAK3401 core handles the MCU and BLE, while the RAK13302 module contains the SX1262 LoRa chip and the 1W RF stage. This separation actually underscores the expandability: you could swap out or upgrade the radio module in future, or use the RAK3401 core for something else if needed. For the end-user, it doesn't change how you assemble the kit (it comes pre-assembled on the base board), but it's a shift in design philosophy. It also means the kit requires a bit more careful power management, which leads to the next point.

### Power Supply Needs

A standard RAK4631-based node could run entirely off the base board's 3.3V supply and a Li-Ion battery, sipping power gently. The new 1W kit can also run on battery (and it has a built-in battery charger on the base), but when that radio fires at full 1W, it draws substantially more current. You'll want to use a robust power source: either a USB power connection, a charged Li-Ion battery, or even a solar panel input with battery, all of which the base board supports. The 1W module cannot work from the 3.3V supply alone and requires using a battery or external 5V feed for reliable operation. In practice, this isn't a big hurdle (most Meshtastic users already use batteries or USB power), but it's a difference from low-power nodes. Essentially, to unleash that range, you need to feed the beast a bit more power. The kit's design anticipates this with a dedicated 5V booster input and even a jumper to select power source on the RAK13302 module. For field use, it's perfect: plug in a USB power bank or a 18650 battery, and you're good to go for high-power mesh ops.

Despite these beefier specs, it's worth noting that using the kit doesn't add complexity for the user. It remains beginner-friendly and plug-and-play, much like the original WisBlock Meshtastic kit. The firmware and user experience are nearly identical from a Meshtastic standpoint, just with a lot more oomph in the RF department. If you've configured a Meshtastic device before, you'll find the web/phone app setup is the same here. The extra power and filter magic happen behind the scenes, so you can focus on deploying your network rather than tweaking hardware.

## Ready for the Field: Modularity and Expandability

One of the best aspects of the WisMesh 1W Starter Kit is how well it lends itself to field deployments and experiments. RAK clearly had off-grid scenarios in mind. The included WisBlock base (RAK19007) is a second-generation base board that features a USB-C port (for power/programming), a battery connector, and even a solar panel input for charging. This means you can set up a node on a mountaintop or a remote station and keep it running via solar power with a battery backup. The kit comes with all the cabling needed to hook up a Li-Ion battery and optionally a solar panel (those red-and-black JST cables seen in the box). Many Meshtastic enthusiasts dream of dropping a repeater node in a wilderness area for weekend adventures or emergency prep, and this kit is ready-made for that.

![WisMesh 1W Booster Assembled](/images/blog/rak-wismesh-1w-booster-assembled.png)

Beyond just keeping the lights on, the WisBlock system makes it easy to tailor the kit to your project's purpose. The base board has four expansion slots where you can plug in additional WisBlock sensor or interface modules. For example, you could add a GPS module to turn this into a long-range location beacon, or add environmental sensors (temperature, humidity, air quality, etc.) to create a remote monitoring station that also functions as a mesh relay. You could even attach a small OLED display module if you want the node to show status messages or sensor readings on-site. Because all WisBlock modules share standard connectors and a common software framework, integrating these extras is relatively straightforward. The modular design allows users to add sensors, displays, GPS, or other modules as projects evolve, which is perfect for iterative development. You can start with a simple mesh node and gradually turn it into a multifunctional gadget.

For hobbyists and tinkerers, this kind of flexibility is gold. You're not locked into a single-use device; the kit can wear many hats. And for developers or researchers, the ability to experiment with different module combinations means the platform can adapt to various trial scenarios. All the while, the core strength of the kit, that robust 1W mesh link, ensures that even as you expand its capabilities, it stays reliable over long distances. RAKwireless themselves highlight that this kit was engineered for off-grid, outdoor, or emergency setups where reliable long-range communication is a must. It's built to withstand real-world demands, from the RF design (with proper filtering and heat dissipation) to the physical design (the kit even includes tiny screws to secure the modules, so they don't shake loose in tough environments).

In summary, the WisMesh 1W Booster isn't just a single board; it's more like a platform. Whether you deploy it as a standalone repeater node up a tree, as a sensor-packed field unit, or as a development board on your bench, it's equally at home. The friendly, kit-based approach also means you don't need to be an RF engineer to take advantage of it. You get the range and reliability benefits out-of-the-box, in a tidy package that you can extend both in hardware and in functionality.

## Meshtastic Ready, with MeshCore on the Horizon

Another great thing about this kit is that it's aligned with the open-source mesh networking movement. Meshtastic, the popular off-grid texting/communication firmware, fully supports the WisMesh 1W Booster Kit from day one. In fact, RAKwireless has been shipping the kit with Meshtastic firmware pre-flashed, so you can literally power it on and start meshing. The official Meshtastic project added a dedicated firmware build target for the RAK3401+RAK13302 combination, recognizing this hardware as a first-class citizen in the Meshtastic device family. For users, this means you can use the standard Meshtastic mobile apps (Android/iOS) or web and CLI tools to configure and use the kit just like you would with any other node, no special forks or custom codes required. Your high-power node can chat with regular nodes without issue; it will just outperform them in range. It's pretty exciting to see a community firmware immediately embrace new hardware like this.

On the flip side, you might also have heard of MeshCore, an emerging mesh communications platform that some are exploring as an alternative or complement to Meshtastic. In the spirit of being platform-neutral, it's worth mentioning that as of this writing (January 2025), MeshCore has not yet released firmware support for the RAK10724 hardware. MeshCore is still in active development, and while it does support a range of LoRa devices (including some RAK WisBlock boards) in its current builds, the specific 1W combo in this kit hasn't been rolled into their lineup just yet. The good news is that the nRF52840 + SX1262 foundation of this kit is fairly common, so we expect that MeshCore support will likely follow in time as the project matures. In any case, the hardware is not locked down to one ecosystem. It's there for whichever open-source mesh firmware you prefer, now or in the future. Today, Meshtastic is the ready-to-go option (making this kit a perfect drop-in for existing Meshtastic networks), and we anticipate others like MeshCore will join the party before long.

## Conclusion

In a nutshell, the RAK WisMesh 1W Booster Starter Kit is a welcome new arrival for anyone building or expanding a long-range mesh network. It takes the DIY spirit of projects like Meshtastic and wraps it in a polished, plug-and-play package that significantly boosts performance where it counts: range and reliability. Yet it does so without losing the hackable, extensible charm of the WisBlock system.

The tone from the community so far has been excitement, and it's easy to see why. Stable long range performance even in tricky environments is now at your fingertips. No more worry about your mesh link dropping when you go behind a hill. This kit was literally designed to keep the messages flowing through challenging terrain. And with its $39 USD price point, RAKwireless is making high-power LoRa accessible to the broader maker community (just a year or two ago, a 1W LoRa setup would have required expensive amplifiers or development boards).

As you dive into using the WisMesh 1W Booster Kit, you can take comfort that it's been purpose-built for mesh use-cases: from community emergency relays to remote sensor hubs, it's meant to be a dependable workhorse.

**Ready to get started?** The WisMesh 1W Booster Starter Kit is available at **$39 USD** from the [RAKwireless store](https://store.rakwireless.com/products/wismesh-1w-booster-starter-kit).

---

*Interested in mesh networking? Check out our [Meshtastic Getting Started Guide](/meshtastic/getting-started), [MeshCore Getting Started Guide](/meshcore/getting-started), or browse [compatible devices](/meshtastic/devices).*
