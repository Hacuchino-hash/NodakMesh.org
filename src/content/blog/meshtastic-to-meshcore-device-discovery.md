---
title: "MeshCore Device Discovery Explained"
description: "Learn how device discovery differs between Meshtastic and MeshCore, why your contact list might be empty, and step-by-step instructions for finding other nodes on your mesh network."
date: 2025-12-21
author: "Josh"
category: "guides"
featured: true
---

When transitioning from Meshtastic to MeshCore (or starting fresh with MeshCore), one of the first questions new users have is: "Why can't I find any other devices on my mesh network?" This post will explain how device discovery works in each system, highlight their differences, and guide you through finding contacts on MeshCore. By the end, you'll understand how to take your MeshCore device and successfully discover nearby nodes or contacts.

## Meshtastic vs MeshCore: A Quick Overview

Meshtastic is an open-source, off-grid mesh network for LoRa radios, known for its easy setup and community-driven approach. Any Meshtastic device on the same channel (frequency and encryption key) can relay messages to extend range, and they periodically broadcast telemetry (location, battery, etc.) to announce themselves. In contrast, MeshCore is a newer LoRa mesh system focused on efficiency and scalability, using fewer background broadcasts to preserve bandwidth. MeshCore relies on dedicated repeaters for relaying messages, while most user devices (called companions) do not automatically forward others' messages.

**Key difference in philosophy:** Meshtastic assumes "everybody is a repeater" by default, which helps spontaneous ad-hoc networks but can lead to lots of network chatter in dense areas. MeshCore assumes a more structured network where only dedicated repeaters rebroadcast messages by default, making the network quieter and faster under load. This difference greatly impacts how each system finds and displays other devices on the mesh.

**Important note:** Meshtastic and MeshCore are **not compatible** with each other. They use different mesh protocols and cannot communicate directly. A Meshtastic device will not see MeshCore nodes, and vice versa. If you want to bridge the two networks, you'd need an external tool like the Akita Meshtastic–MeshCore Bridge. For most users, you'll need to pick one system or run separate devices for each.

## How Meshtastic Devices Find Each Other

Meshtastic devices automatically discover each other through periodic broadcasts. When you power on a Meshtastic node, it announces its presence to the mesh (sending a "node info" packet). Other nodes that hear this will add that device to their Nodes list in the app. Likewise, your node listens for announcements from others. These exchanges aren't instantaneous – they depend on periodic events and radio traffic:

**Periodic Telemetry:** By default, Meshtastic radios broadcast status data (battery, position, etc.) at set intervals (e.g. location every ~15 minutes, node info every few hours). As meshes grow, the firmware may slow these intervals to reduce congestion.

**Managed Flood Routing:** By default, every node can forward messages for others. Modern Meshtastic versions use a managed flood approach with next-hop routing for direct messages, but the general behavior is that non-dedicated nodes will still rebroadcast certain packets, helping spread device announcements further.

**Channels and Keys:** Meshtastic uses channels (with an encryption key or URL). Only devices on the same channel/key will hear each other's announcements. Many public Meshtastic users stick to the default "LongFast" channel, which serves as an open network in some areas. If you join that default channel and others in your area are on it, you might start seeing their nodes populate your app's list after a while.

It's important to manage expectations: discovery is not instant. One Meshtastic user likened it to bat echolocation: a bat must emit a sound and wait for an echo because the environment itself is quiet. Similarly, most Meshtastic nodes don't constantly chatter - they broadcast infrequently to save power, perhaps only every few hours or when there's data to send. As a community member explained, "A lot of newcomers think you can just turn on your node and see others instantly, but that's not how it works… The best way to learn about other nodes is to make some noise (send a message or position) and see what comes back." In practice, this means if you power up your Meshtastic radio and no one else is actively transmitting, you might see an empty node list for some time.

However, if another Meshtastic node is in range and broadcasting (say, it sends a location ping or someone sends a message), your device will eventually pick that up. Your app's Nodes tab will list any discovered nodes (IDs or nicknames) once their packets are heard. The Meshtastic Android app is designed to display all nodes on your mesh channel automatically – you generally do not need to manually search for devices. The main factors are having the same channel settings, being in radio range, and waiting long enough for the periodic broadcasts to occur.

### Tips for Meshtastic Discovery

Ensure your device region and radio preset match what others use in your area (e.g. LongFast in the US). If you don't see anyone, try sending a message on the public channel or increase your node's activity (even moving around to trigger a GPS broadcast). Often, sending a hello message or two can prompt nearby Meshtastic users (or bots) to respond, revealing their presence. And of course, keep your device on and listening for an extended period. Patience is key – leaving the radio on for an hour or more is often needed to catch a brief beacon from another node, especially if some nodes only transmit once in a long while (for example, solar-powered Meshtastic sensors might beacon once a day).

## How MeshCore's Device Discovery Differs

MeshCore approaches discovery very differently. Its philosophy of minimal network chatter means that devices do not automatically broadcast their presence as frequently as Meshtastic nodes do. In MeshCore, a regular end-user device (Companion firmware) will not periodically flood the network with telemetry or node info. Instead, only repeaters (infrastructure nodes) might send out occasional adverts (announcements), and even those are infrequent by default. In fact, a MeshCore repeater's default setting is to advertise its presence only once every few hours (often around 4 hours, though this can vary). This interval can be configured, but the out-of-the-box behavior is to keep the airwaves mostly quiet to preserve capacity for actual messaging.

For a user with a MeshCore handheld or paired device, the lack of automatic chatter means you won't see a list of nearby nodes pop up quickly (or at all) unless some specific action occurs. The MeshCore mobile app (or web app) typically has a Contacts or Discover screen where other nodes would appear – but initially this will be empty. In fact, the MeshCore app will explicitly show "No contacts" until discovery happens.

![MeshCore app showing empty contact list](/images/blog/meshcore-discovery/no-contacts.webp)
<span class="caption">MeshCore app showing an empty contact list. Screenshot via [Michael Lynch](https://mtlynch.io/first-impressions-of-meshcore/).</span>

This design reflects MeshCore's opt-in discovery: devices remain silent until they or someone else actively shares their identity.

Here are the key differences in MeshCore's discovery:

**"Advertise" vs Automatic:** MeshCore uses an Advert mechanism to share device identity. An advert is essentially a broadcast of your node's info (like a public key or address) to others on the network. Meshtastic's equivalent would be the periodic node info packet. However, MeshCore does not send these adverts on a short timer by default. Often, the user must manually trigger an advert from the app to announce their device (or wait many hours for a repeater's periodic advert).

**No Flooding from Clients (by default):** Regular MeshCore devices (companions) do not forward each other's packets or adverts by default. Only dedicated MeshCore repeaters rebroadcast across the mesh. This means if your companion device hears another companion's advert, it won't propagate it further. Discovery is mostly direct within radio range, unless a repeater extends the range. (By contrast, in Meshtastic even client nodes will rebroadcast certain discovery packets, helping news of a node travel farther by flood.)

**Public Channel vs Direct Peering:** MeshCore has the concept of a public "All" channel for general broadcasts (similar to Meshtastic's default channel, but unencrypted). Out of the box, your MeshCore device can send and receive public messages to any others using the same frequency preset. However, seeing someone on the contacts list (for direct messaging) usually requires exchanging contact info via adverts – essentially a handshake.

In practice, when you first set up two MeshCore devices, you might notice they don't see each other in the contacts list even if they're on the same frequency. For example, Michael Lynch's first test of two MeshCore radios showed that, after fixing the region preset, they could communicate on the public channel but still didn't appear in each other's contact list. This is because neither had shared their identity keys. He discovered that using the "Advertise (Zero Hop)" function on one device made it visible to the other, and vice-versa. In his words, it felt like a "half-completed handshake" until both sides advertised.

### Why MeshCore Does This

By not constantly announcing every device, MeshCore dramatically cuts down on background traffic. This makes a big difference in larger networks – it avoids the "chatter" that can clog the air in Meshtastic when dozens of nodes frequently broadcast status. The trade-off is a slightly more manual discovery process. The benefit is efficiency and speed: MeshCore networks often feel snappier and handle dense usage better because nodes aren't busy relaying non-stop status updates. One community observation is that MeshCore "feels considerably faster" in message delivery with default settings, whereas Meshtastic can be tuned but is slower by default. MeshCore values opt-in visibility-you only show up on others' devices when needed-versus Meshtastic's always-on visibility model.

## Why Your MeshCore Device Isn't Finding Others (Yet)

It's common for new MeshCore users (especially those coming from Meshtastic) to feel like "nothing is happening – I see no devices!" Don't panic; this is normal. Because of the differences outlined above, a MeshCore device will often sit with an empty contact list initially. Here are a few reasons and misconceptions:

**Rare Adverts:** Other MeshCore users in range might be out there, but if neither you nor they have sent an advert or message, both sides remain invisible. Unlike Meshtastic, turning on a MeshCore radio does not immediately broadcast a presence beacon that guarantees others will notice you. (MeshCore might do a very brief initial advert, but it's easy to miss if timing doesn't line up.)

**Patience Required:** MeshCore repeaters by default advertise only every few hours. If the only nearby node is a repeater on that schedule, you could literally wait hours before it announces itself to your device. Likewise, a neighbor's companion device might not send anything unless they actively use it. Essentially, idle MeshCore nodes stay quiet for long stretches.

**No Automatic Handshake:** In Meshtastic, if you send a message on the default channel, any node that hears it will at least log your node info (and you'll appear in their node list eventually). In MeshCore, sending a message on the public channel does not automatically exchange identity keys. You might see the message go through if someone receives it, but they still won't appear as a named contact for direct chat without the advert exchange. This can lead to confusion where you know someone else is out there (e.g., they replied on public), yet they're not in your contacts list.

**Different App Behavior:** The MeshCore app's Discover or Contacts tab isn't continuously scanning or "finding" devices like a Bluetooth scan would. It's essentially waiting to hear from the radio's firmware about known contacts. If that firmware hasn't heard any adverts or introductions, the app will remain empty. This is why the app tells you that if someone advertises, then they will show up. It's a hint that action is required either on your part or the other device's part to trigger discovery.

It's worth comparing this with the Meshtastic experience: On Meshtastic's app, you might see a list of all nodes that have ever been heard on your channel, even if it took some time to populate. On MeshCore, you may see nothing until a successful exchange happens. The quietness can actually be a good sign – it means MeshCore is preserving battery and airtime.

## How to Discover Contacts on MeshCore (Step-by-Step)

So, how do you go from an empty MeshCore contact list to actually finding and listing nearby devices? Here's a step-by-step guide for new MeshCore users:

### 1. Set Up on the Same Frequency/Preset

Just as with Meshtastic, both devices need to share radio settings. Ensure your MeshCore device is configured for your region's LoRa frequencies and preset. For example, choose the appropriate country preset (e.g. "USA/Canada") in the MeshCore app settings. If you and others aren't on the same frequency plan, you won't hear each other at all.

### 2. Use the Public Channel

Start by trying a message on the default public channel (often called "All" or similar in the app). This is a broad broadcast that any MeshCore node in range can receive. It's akin to calling out "Anyone out there?" on the network. While this alone won't put them in your contacts, it serves two purposes: (a) It checks that your device is working and in range (if someone responds publicly, you have confirmation), and (b) it may prompt attentive users to initiate a contact exchange.

### 3. Advertise Your Device

Open the MeshCore app's menu for Advertise (often accessible via a "+" or options menu on the contacts screen). You'll typically see options like Advert – Zero Hop and Advert – Flood.

![MeshCore advertise options menu](/images/blog/meshcore-discovery/advert-options.webp)
<span class="caption">The MeshCore Advertise menu showing Zero Hop, Flood Routed, and To Clipboard options. Screenshot via [Michael Lynch](https://mtlynch.io/first-impressions-of-meshcore/).</span>

**Start with Zero Hop:** This sends a one-time beacon of your device's identity to immediate neighbors only, and repeaters will not forward it. Zero Hop is polite on bandwidth and is great if you suspect others are directly in range. After doing this, watch your contact list – any device that hears your advert should appear (perhaps after a short delay for processing).

**Consider a Flood Advert:** If you're in an area with repeaters or you want to reach further, you can use a flood advert. This will allow the advert to propagate through the mesh via repeaters, potentially reaching nodes multiple hops away. Use this sparingly, as it's more intrusive network-wide. But if no one local shows up from zero-hop and you know there are repeaters around, a flood advert can announce you to the wider mesh.

*Note: The app might also offer "Advert to Clipboard," which simply copies your contact info (public key/address) to share with someone out-of-band (not needed for normal discovery).*

![MeshCore advert sent confirmation](/images/blog/meshcore-discovery/advert-sent.webp)
<span class="caption">Confirmation that your advertisement was sent successfully. Screenshot via [Michael Lynch](https://mtlynch.io/first-impressions-of-meshcore/).</span>

### 4. Have the Other Party Advertise (if possible)

If you're coordinating with a friend or you got a public reply from someone, ask them to also send an Advert. Discovery is often mutual – your device might list others once they advertise, and vice versa. In many cases, both sides need each other's info exchanged for full two-way direct messaging. For example, after Device A advertises, Device B sees A in contacts. But A may not see B until B also advertises back. Once both have exchanged adverts, you'll each show up in the other's contact list, allowing direct encrypted messaging.

![MeshCore participants view with discovered contacts](/images/blog/meshcore-discovery/participants-view.webp)
<span class="caption">Once contacts are discovered, they appear in the Participants view. Screenshot via [Michael Lynch](https://mtlynch.io/first-impressions-of-meshcore/).</span>

### 5. Ping Known Repeaters (Advanced)

If you know a MeshCore repeater exists (perhaps from a community map or list), you can use the app's Ping feature. In the MeshCore app, you'd first need that repeater to appear in your contacts (which might only happen after it advertises or after you've done a flood advert). Some users mention that in the app you can select a repeater and use a "Ping" command to prompt a response. This is more of a troubleshooting step – it's useful if a repeater is in your list but you're not sure it's active. It won't help if the repeater isn't discovered at all yet.

### 6. Leave Your Radio On and Listen

Just like with Meshtastic, patience helps. If you've advertised and no one immediately showed up, keep your device powered on and in a good location (high up, near a window, etc.). You might catch a scheduled advert from a repeater or another user eventually. MeshCore devices will log contacts over time as they hear them. Make sure your phone stays connected to the radio (via Bluetooth or USB) during this listening period, so the app can update with any new contacts heard.

### 7. Coordinate with the Community

If you're actively trying to find other MeshCore users in your area, consider reaching out via online communities (Discord, forums, local groups). Often, MeshCore users in a region share which frequency and settings they use. They might also schedule nets or suggest times to try. For Meshtastic, tools like meshmap.net or community Discords were helpful to find active nodes; for MeshCore, check if there's a regional mesh group or the official MeshCore map (the MeshCore web map might not show live users yet by default). Some MeshCore enthusiasts share contact info or run room servers, which are like bulletin board nodes you can intentionally connect to if within range.

By following the steps above, you should gradually see contacts appearing in your MeshCore app. For instance, after you and your friend both sent Zero Hop adverts, you will suddenly see each other listed with your chosen device names – and you can then tap on a contact to start a direct encrypted chat (no more broadcasting to everyone).

## MeshCore vs Meshtastic: Discovery Trade-offs and Tips

To summarize the differences and make your transition smoother, here's a quick comparison and some tips:

**Frequency of Discovery Messages:** Meshtastic broadcasts node info frequently (minutes to hours) by default, so networks feel more immediately populated. MeshCore broadcasts rarely (hours or only on demand), so networks feel empty until stimulated. *Tip: Don't be alarmed by silence on MeshCore – use adverts or send a message to stir activity.*

**Initial Setup:** Meshtastic devices on the same default channel might automatically find each other eventually, whereas MeshCore devices require matching presets and an advert exchange. *Tip: Double-check your MeshCore preset (frequency) when starting out – mismatched settings are a common reason for "no devices found" on either system.*

**App User Interface:** The Meshtastic app automatically lists nodes under "Nodes" as they are heard. The MeshCore app's Discover/Contacts list remains empty until an advert or known contact is present. *Tip: Use the MeshCore app's built-in tools – the Advertise button is your friend! Also utilize the map or telemetry features once contacts are added (MeshCore will then let you see info like distance or signal for known nodes).*

**Network Scale:** Meshtastic's approach works great for small, mobile groups – everyone helps relay and you get a dynamic mesh. But in a city-wide mesh with dozens of nodes, the constant discovery chatter can actually slow things down or overload the channel. MeshCore's quieter approach scales better, as noted by users in dense networks (messages stay reliable even when dozens of devices are present). *Tip: If you plan to build a larger mesh (e.g., community or emergency network), lean into MeshCore's strategy: set up a few well-placed repeaters and let regular users remain in companion mode. This infrastructure will periodically advertise and provide the backbone for others to connect, so not every user needs to advertise frequently.*

**Power Saving:** Both systems try to save battery by limiting transmissions, but MeshCore pushes this further. A Meshtastic node might transmit every 15 minutes regardless, whereas a MeshCore node might be effectively silent when not in active use. *Tip: For battery-powered nodes (like sensor or solar units), MeshCore's default is advantageous. Just remember that a mostly-silent node means others must initiate contact to find it. If you deploy a MeshCore sensor, you might want it to advert on a schedule (configurable via `set advert.interval`) if you expect others to discover it regularly.*

## Final Thoughts

Switching from Meshtastic to MeshCore involves a bit of a mindset shift. Meshtastic gives you instant gratification in seeing a list of nodes (provided someone's out there and broadcasting), whereas MeshCore emphasizes intentional discovery to keep the network efficient. Neither approach is "better" universally – they're optimized for different scenarios.

For a new MeshCore user, the key takeaway is: don't assume "no contacts" means no one is there. It might just mean you need to introduce yourself (advertise) or listen longer. Once you perform that initial handshake, MeshCore devices are quite capable of maintaining communication and will remember contacts. From that point on, your MeshCore will know those peers and can communicate directly and quickly.

If you find yourself wondering "Where is everyone?" after booting up MeshCore, remember to take the initiative:

- Check your settings
- Send out a friendly beacon (advert)
- And be patient while listening

By understanding these discovery differences between Meshtastic and MeshCore, you can avoid frustration and get your off-grid communications network up and running smoothly. Happy meshing, and don't hesitate to reach out to the community forums or Discord if you need extra help – both Meshtastic and MeshCore communities are full of folks ready to assist newcomers in making that first contact!
