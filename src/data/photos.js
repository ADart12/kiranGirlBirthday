// Real couple photos of Kiran & Anu from public/images
// Prioritizing all olive-named images and priotity.jpeg, with updated clean filenames!

export const allPhotos = [
  // --- HIGHEST PRIORITY: Olive & Priority Photos ---
  {
    id: 1,
    url: "/images/olive.jpeg",
    title: "Special View",
    caption: "Some faces become your favorite view, and yours became mine without even trying. ❤️",
    date: "Golden hours with you",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },
  {
    id: 2,
    url: "/images/priotity.jpeg",
    title: "Frozen in Time",
    caption: "If I could freeze one moment with you, I'd choose a thousand more like this one. 🫶🏻",
    date: "A moment to keep forever",
    location: "Top Priority",
    isOlive: true,
    badge: "Top Priority ❤️"
  },
  {
    id: 3,
    url: "/images/olive1.jpeg",
    title: "Beside You",
    caption: "It's not about where we are, but who I'm standing beside. And I'm glad it's you. ❤️",
    date: "Unforgettable",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },
  {
    id: 4,
    url: "/images/olive3.jpeg",
    title: "Right Person",
    caption: "Some memories don't need perfect pictures; they just need the right person. 🤍",
    date: "Sweet memory",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },
  {
    id: 5,
    url: "/images/olive4.jpeg",
    title: "Warmth & Peace",
    caption: "Even in the quietest moments, you somehow make my world feel a little warmer. ❤️",
    date: "Sunset warmth",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },
  {
    id: 6,
    url: "/images/olive5.jpeg",
    title: "Eyes on You",
    caption: "Beautiful views are everywhere, but somehow, my eyes always find their way back to you. 🌷",
    date: "Scenic walk",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },
  {
    id: 7,
    url: "/images/olive6.jpeg",
    title: "Happiest Days",
    caption: "One day, we'll look back at these little moments and realize they were some of our happiest days. 🫶🏻",
    date: "Smiles always",
    location: "Special Olive Highlight",
    isOlive: true,
    badge: "Olive Special ⭐"
  },

  // --- All Other Real Couple Photos (1.jpeg through 11.jpeg and 312.jpeg) ---
  {
    id: 8,
    url: "/images/1.jpeg",
    title: "In the Frame",
    caption: "My favorite kind of happiness is the kind that has you in the frame. ❤️",
    date: "First smile of the day",
    location: "Our little world"
  },
  {
    id: 9,
    url: "/images/2.jpeg",
    title: "Beautiful Company",
    caption: "Ordinary moments, your beautiful company, and a memory I'd choose to live again. 🤍",
    date: "Simple bliss",
    location: "Everywhere we go"
  },
  {
    id: 10,
    url: "/images/3.jpeg",
    title: "Always Grateful",
    caption: "One day, we'll laugh about the little things we did, and I'll still be grateful that I got to make those memories with you. ❤️",
    date: "Forever grateful",
    location: "Heart to heart"
  },
  {
    id: 11,
    url: "/images/4.jpeg",
    title: "Cozy Afternoon",
    caption: "That calm, comfortable feeling when everything feels just right with you. 🌸",
    date: "Peaceful time",
    location: "Our favorite place"
  },
  {
    id: 12,
    url: "/images/5.jpeg",
    title: "Fit of Laughter",
    caption: "Pure, unfiltered joy that makes our hearts feel lighter. ✨",
    date: "Shared laughter",
    location: "Anywhere together"
  },
  {
    id: 13,
    url: "/images/6.jpeg",
    title: "Candid Moments",
    caption: "Unrehearsed smiles that become unforgettable memories. 🌷",
    date: "Candid snapshot",
    location: "In the moment"
  },
  {
    id: 14,
    url: "/images/7.jpeg",
    title: "Joyful Glance",
    caption: "The way you look when you're genuinely happy is my favorite sight. 💫",
    date: "Sunlit hours",
    location: "By your side"
  },
  {
    id: 15,
    url: "/images/8.jpeg",
    title: "Starlit Night",
    caption: "Talking about everything under the open sky. 🌙",
    date: "Evening breeze",
    location: "Quiet night"
  },
  {
    id: 16,
    url: "/images/9.jpeg",
    title: "Walking Together",
    caption: "Hand in hand, stepping into whatever tomorrow holds. 🥂",
    date: "Step by step",
    location: "Journey together"
  },
  {
    id: 17,
    url: "/images/11.jpeg",
    title: "Future Dreams",
    caption: "To all the adventures waiting ahead for us to experience together. ✈️",
    date: "Endless adventures",
    location: "Tomorrow & beyond"
  },
  {
    id: 18,
    url: "/images/312.jpeg",
    title: "Forever Us",
    caption: "No matter where we go, having you with me is all that matters. ❤️",
    date: "Forever and always",
    location: "In each other's hearts"
  }
];

// Quick collections
export const featuredPhotos = allPhotos.slice(0, 10);
export const olivePhotos = allPhotos.filter(p => p.isOlive);
