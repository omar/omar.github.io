---
layout: post
title: "When technically right is wrong: Kilobytes"
tags: when-technically-right-is-wrong
---

How many bytes are in a kilobyte? 1000 or 1024? The answer depends on who you ask. [Google says](https://www.google.com/search?q=how+many+bytes+in+a+kilobyte) 1 kilobyte = 1000 bytes. Hard drive [manufacturers also say](https://www.lifewire.com/drive-storage-capacities-833435) 1 kilobyte = 1000 bytes. However, my computer measures disk space and memory using the ratio 1 kilobyte = 1024 bytes. This discrepancy is well known and has been written about by folks like [Jeff Atwood](https://blog.codinghorror.com/gigabyte-decimal-vs-binary/) and Randall Munroe in [xkcd 394](https://xkcd.com/394/).

So what's the right answer? Well, since `kilo` is the [SI prefix](https://en.wikipedia.org/wiki/Metric_prefix) for 1000, _technically_, 1 kilobyte = 1000 bytes. However, 1 kilobyte = 1024 bytes in all applications of computer software and hardware like RAM memory usage or remaining hard drive space. Given that, when I built [ByteSize](https://github.com/omar/bytesize) I opted to use the ratio 1 kilobyte = 1024 bytes. After all, the main use cases for ByteSize would be to handle byte amounts for computer memory and storage.

Almost immeditaly after I published ByteSize, [a request](https://github.com/omar/ByteSize/issues/1) was made to add support for decimal prefixes (i.e. support 1 kilobyte = 1000 bytes). A few months ago, a [similar request](https://github.com/Humanizr/Humanizer/issues/592) was made on the [Humanizer](https://github.com/Humanizr/Humanizer) project (which [ships ByteSize as an internal class](https://github.com/Humanizr/Humanizer/blob/dev/src/Humanizer/Bytes/ByteSize.cs)) citing the discrepancy with the SI unit.

While I intend to [add support](https://github.com/omar/ByteSize/pull/24) for the SI ratio, I plan on keeping the ratio 1 kilobyte = 1024 bytes as the default behavior of ByteSize. Although that's _technically wrong_, I believe the _right_ path is to align with how software and hardware handle bytes. I've also opted to forgo the naming outlined in [IEEE 1541](https://en.wikipedia.org/wiki/IEEE_1541-2002); at least until it's more widly adopted and people stop thinking of [dog treats](https://en.wikipedia.org/wiki/Kibbles_'n_Bits) or [Middle Eastern food](https://en.wikipedia.org/wiki/Kibbeh) when they hear ["kibibytes"](https://en.wikipedia.org/wiki/Kibibyte).
