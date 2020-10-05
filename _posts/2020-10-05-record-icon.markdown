---
layout: post
title:  "Record Icon"
preview: /assets/preview/old_record_on.svg
tags: [All, Artsy-wimey, UI/UX]
color: "#f61919C0"
permalink: ossiaScoreLogo
---

<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/old_record_off.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/old_record_on.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/mic_record_off.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/mic_record_on.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/tape_record_off.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/tape_record_on.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/process_record_off.svg');">
</div>
<div style="text-align: center; width:100%;height:16px; background: url('/assets/record_icon/process_record_on.svg');">
</div>

<br/>

As always when introducing a new icon in the UI for [ossia score](https://github.com/OSSIA/score), the first draft is the most simple and straight forward idea, then some different less common icons are designed and I go straight back to the first idea but improving it using the "bad examples" I made. 
This time it was for the icon for recording process and the requirements were:
* not larger than 16 x 16 px
* on and off state
* not confusing with the existing elements
 
This third point was the main issue I had as the circle plain red circle was already used for the audio ports. Therefore, the classic record icon <img id="display32" src="assets/record_icon/old_record_on.svg" width="16px" height="16px"/> <img id="display32" src="assets/record_icon/old_record_off.svg" width="16px" height="16px"/> could not be used as it was too confusing with the audio port just a few pixel away.

<p align="center">
        <img id="display32" src="assets/record_icon/old_ui.png"/>
        <figcaption id="caption_small" style="text-align:center; font-size: 16px;">Classic record button too confusing with the audio port</figcaption>
</p>

To avoid the confusion, I tried the second idea which was to use the microphone icon which is often use as the record icon <img id="display32" src="assets/record_icon/mic_record_on.svg" width="16px" height="16px"/> <img id="display32" src="assets/record_icon/mic_record_off.svg" width="16px" height="16px"/>.

This idea was better than the previous one in regards to the issue with the audio port but now the problem was with the camera icon which was the icon for snapshot: it was hardware against hardware with neither of them connected to actual hardware and I found it confusing.

<p align="center">
        <img id="display32" src="assets/record_icon/mic_ui.png"/>
        <figcaption id="caption_small" style="text-align:center; font-size: 16px;">Microphone icon on and off, next to the "new" issue: the camera icon</figcaption>
</p>

The third idea was suggested to me: it was an icon of a tape recorder <img id="display32" src="assets/record_icon/tape_record_on.svg" width="16px" height="16px"/> <img id="display32" src="assets/record_icon/tape_record_off.svg" width="16px" height="16px"/>. When in the UI, it just did not fit right and again it was the hardware against hardware.

<p align="center">
        <img id="display32" src="assets/record_icon/tape_ui.png"/>
        <figcaption id="caption_small" style="text-align:center; font-size: 16px;">Tape recorder icon on and off, just did not fit</figcaption>
</p>

Finally, I came back to the first idea, and just thought that I should have a filled circle which would appear more clean and simple, giving this <img id="display32" src="assets/record_icon/process_record_on.svg" width="16px" height="16px"/> <img id="display32" src="assets/record_icon/process_record_off.svg" width="16px" height="16px"/>

<p align="center">
        <img id="display32" src="assets/record_icon/ui.png"/>
        <figcaption id="caption_small" style="text-align:center; font-size: 16px;">Simple and clean !</figcaption>
</p>

As simple as an icon can be, I always have to make different variations before landing on the final icon but it is so satifying when getting the final result ! 
