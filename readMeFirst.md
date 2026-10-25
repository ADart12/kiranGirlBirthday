import pypandoc

content = r"""# Romantic Surprise Website for Anuskha ❤️

## Instructions for Antigravity
Build the complete website in the current project. First inspect the existing files and tech stack, then implement the website directly. Do not stop at a mockup or just provide instructions. If no project exists, use React + Vite with modern CSS.

## Goal and Design
Create a premium, interactive romantic surprise website from **Kiran to Anuskha**, inspired by the supplied reference screenshots.

- Pastel pink, peach, cream, and lavender gradients.
- Elegant typography, rounded cards, soft shadows, subtle glassmorphism.
- Floating hearts, sparkles, confetti, cute romantic icons, and smooth animations.
- Responsive on mobile, tablet, and desktop.
- Beautiful, polished, personal—not a generic template.
- Use Framer Motion if appropriate and Lucide icons or tasteful equivalents.
- Keep animations smooth and avoid clutter or excessive effects.

## Opening Experience
Start with the message **“Someone has something special for you…”**, an animated envelope with a heart seal, and **“For Anuskha, with love ❤️”**. Add an **“Open Your Surprise”** button. On click, animate the envelope opening, show hearts/confetti, and reveal:

> Hey Anuskha, ❤️  
> I made this little world just for you. Every corner holds a memory, a feeling, or a little piece of my heart.  
> Take your time exploring it.  
> With love,  
> Kiran ❤️

## Dashboard
Show the heading **“The Surprises for Anuskha”** and subtitle **“Every little thing here reminds me of you.”**

Create nine attractive, clickable cards:
1. 💌 The Letter
2. 🎈 What I Love
3. 🎁 Our Story
4. ✨ Wishes & Dreams
5. 📸 Moments
6. 🗺️ Places
7. 📅 Our Date
8. 🎵 Our Song
9. 🎂 A Final Surprise

Each card must open a working section with smooth transitions and a back-to-dashboard button. Show progress for explored sections, but do not force users to complete sections in order.

## Section Details

### 1. The Letter 💌
Show an animated envelope and elegant letter with a gentle reveal:

> Dear Anuskha,  
> I don't always know how to put my feelings into words, but I want you to know how special you are to me.  
> There's something about you that makes ordinary days feel different. Your smile, your laugh, the way you talk, and even the little things you probably don't notice about yourself mean more to me than I can explain.  
> I love the moments we share, the memories we've made, and the simple happiness of having you in my life.  
> I don't need every day to be perfect. I just want the little moments, the silly conversations, the laughter, and the memories that we'll look back on someday with a smile.  
> If there's one thing I hope you never forget, it's this: you are special to me in ways that words can never completely explain.  
> Thank you for being you, Anuskha.  
> With all my love,  
> Kiran ❤️

### 2. What I Love About You ❤️
Create interactive cards that reveal these ten messages:
- The way your smile lights up even my darkest days.
- How kind and gentle you are with everyone around you.
- The way you make ordinary moments feel special and warm.
- Your laugh, which I could listen to a thousand times and never get tired of.
- How you listen and understand me without needing many words.
- The quiet strength you carry so gracefully.
- The way you make me smile without even trying.
- The little things you do without realizing how much they mean to me.
- The peace I feel when I'm with you.
- And most of all, the way you are simply yourself. You don't have to be anyone else to be special to me.

### 3. Our Story 🎁
Create a romantic timeline with editable entries for first meeting, first conversation, when she became special, favorite memory, a moment that made us smile, today, and a dream for the future. Each entry supports a date, title, description, and optional photo.

### 4. Wishes & Dreams ✨
Create a magical wish jar with glowing stars and a **“Make a Wish ✨”** button. Show a random wish on click. Include editable wishes about memories, laughter, adventures, supporting each other's dreams, happiness, understanding, and respect.

### 5. Moments 📸
Create a responsive gallery using the **10 real couple photos provided by Kiran**. Include captions, rounded cards, fullscreen viewing, previous/next controls, and slideshow mode. Do not substitute unrelated stock photos.

Use these captions in order:
1. “Some faces become your favorite view, and yours became mine without even trying. ❤️”
2. “If I could freeze one moment with you, I'd choose a thousand more like this one. 🫶🏻”
3. “It's not about where we are, but who I'm standing beside. And I'm glad it's you. ❤️”
4. “Some memories don't need perfect pictures; they just need the right person. 🤍”
5. “Even in the quietest moments, you somehow make my world feel a little warmer. ❤️”
6. “Beautiful views are everywhere, but somehow, my eyes always find their way back to you. 🌷”
7. “One day, we'll look back at these little moments and realize they were some of our happiest days. 🫶🏻”
8. “My favorite kind of happiness is the kind that has you in the frame. ❤️”
9. “Ordinary moments, your beautiful company, and a memory I'd choose to live again. 🤍”
10. “One day, we'll laugh about the little things we did, and I'll still be grateful that I got to make those memories with you. ❤️”

Keep image filenames/order easy to edit in one data file.

### 6. Places 🗺️
Create a map-inspired memory page with animated pins and dotted paths. Each place supports a name, optional date, photo, and memory. Use editable placeholders until real places are supplied. If no map API is configured, use a stylized map illustration instead.

### 7. Our Date 📅
Create a live counter showing years, months, days, hours, and minutes from a configurable date, plus an optional anniversary countdown. Do not invent a date; show a beautiful placeholder until one is configured.

### 8. Our Song 🎵
Create a music player with configurable song title, artist, cover art, play/pause, progress, volume, and a personal note. Use a user-provided/legal audio source or appropriate embed. **Never autoplay sound.** Display: “Some songs sound different when they remind you of someone special.”

### 9. Final Surprise 🎂
Show a closed animated gift box and **“One Last Little Surprise…”**. On click, open it with confetti and hearts, reveal a favorite photo, and display:

> Anuskha,  
> If you've made it this far, I hope this little world has made you smile.  
> I created it because sometimes the smallest things carry the biggest feelings.  
> Every photo holds a moment, every message holds a thought, and every little detail is my way of reminding you that you matter to me.  
> I can't promise that every day will be perfect, but I can promise to keep appreciating the little things that make you who you are.  
> Thank you for the memories, the smiles, and the moments that mean more than they seem.  
> No matter how many pages this little website has, there's one thing I could never fit completely into it:  
> How special you are to me.  
> With love, always,  
> Kiran ❤️

End with **“Made with love, especially for Anuskha. ❤️”**

## Functionality and Quality
- Every card, button, player control, gallery control, and navigation element must work.
- Include home/back navigation, a music toggle, and optional theme customization.
- Use editable data/config files for photos, captions, names, dates, wishes, timeline entries, locations, and song.
- Do not invent real relationship dates, places, or memories. Clearly label placeholders.
- Use local assets where possible; provide a clear `public/images/` and `public/music/` structure.
- No broken imports, missing components, fake date calculations, or console errors.
- Add image lazy-loading, accessible labels, keyboard navigation, readable contrast, and reduced-motion support.
- Avoid unnecessary APIs and dependencies.
- Preserve existing project features if a project already exists.

## Suggested Structure
Adapt to the existing project if one is present.

```text
src/
  components/
  pages/
  data/
    config.js
    photos.js
    messages.js
    timeline.js
    wishes.js
  styles/
  App.jsx
  main.jsx
public/
  images/
  music/