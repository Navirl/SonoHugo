---
title: "Actorの所有"
tags:
 - Info
---

date: 2024-12-20T14:07:10+09:00
up:: [UE5.0.2](../Bar/App/UE5.0.2.md)
up:: [Summareading](../Bar/Summareading.md)
source:: [Actors and their Owning Connections in Unreal Engine | Unreal Engine 5.0 Documentation](https://docs.unrealengine.com/5.0/en-US/actors-and-their-owning-connections-in-unreal-engine/)
source:: [Replication - What is 'Set Owner' good for? : unrealengine](https://www.reddit.com/r/unrealengine/comments/afdcmp/replication_what_is_set_owner_good_for/)

Actorには所有者として別のActorがいる。
この所有をたどっていくと必ずPlayerContollerに行きつく。
RPCでいう所有者はこのControllerを指す。
