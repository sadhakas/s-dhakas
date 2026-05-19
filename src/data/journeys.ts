import type { JourneyData } from "../components/shared/JourneyCard";

export const journeysData: JourneyData[] = [
  {
    title: "Ganga Echoes",
    location: "Rishikesh · Ganga · Dehradun",
    description:
      "A soulful getaway to Rishikesh. Designed for connection and clarity, this trip is an invitation to pause, breathe, and experience the profound serenity of the Ganges. Pack your bags, bring an open mind, and we will see you by the river.",
    status: "Completed",
    date: "April 2026",
    image: "/assets/images/journeys/gangaechoes2026/rsks_1.jpg",
    gallery: [
      "/assets/images/journeys/gangaechoes2026/rsks_1.jpg",
      "/assets/images/journeys/gangaechoes2026/sastradhara.jpg",
      "/assets/images/journeys/gangaechoes2026/dprg_1.jpg",
      "/assets/images/journeys/gangaechoes2026/rafting_1.jpg",
      "/assets/images/journeys/gangaechoes2026/dprg_2.jpg"
    ]
  },
  {
    title: "Inception 2025",
    location: "Kanak Ghati · Govind Devji · Jal Mahal",
    description:
      "A contemplative passage through Jaipur. Walking temple paths at dawn and pausing at Govind Dev Ji Temple, an inward journey of calm and clarity where the noise fades and something deeper begins to unfold.",
    status: "Completed",
    date: "March 2025",
    image: "/assets/images/journeys/inception2025/fort.jpg",
    gallery: [
      "/assets/images/journeys/inception2025/fort.jpg",
      "/assets/images/journeys/inception2025/gaushala_2.jpg",
      "/assets/images/journeys/inception2025/gaushala.jpg",
      "/assets/images/journeys/inception2025/sunrise_jalmahal.jpg",
      "/assets/images/journeys/inception2025/concert.jpg",
      "/assets/images/journeys/inception2025/sunrise_jalmahal_2.jpg"
    ]
  },
  {
    title: "MahaKumbh 2025",
    location: "Prayagraj · Ganga · Sangam Ghat",
    description:
      "A once-in-a-lifetime journey to the sacred Maha Kumbh Mela at Prayagraj, where millions gather at the divine confluence for a rare moment of spiritual immersion. An experience of devotion, energy, and profound inner awakening.",
    status: "Completed",
    date: "February 2025",
    image: "/assets/images/journeys/mahakumbh2025/arati.jpg",
    gallery: [
      "/assets/images/journeys/mahakumbh2025/bus_travel.jpg",
      "/assets/images/journeys/mahakumbh2025/nice_click_1.jpg",
      "/assets/images/journeys/mahakumbh2025/arati.jpg",
      "/assets/images/journeys/mahakumbh2025/tents.jpg",
      "/assets/images/journeys/mahakumbh2025/dip.jpg",
      "/assets/images/journeys/mahakumbh2025/dip_2.jpg"
    ]
  },
  {
    title: "Southern Sojourn",
    location: "Bangaluru · Mysuru · Udupi · Kodachadri Hills",
    description:
      "Soul-stirring journey across South India, from Bengaluru to Mysuru, Udupi, and the serene Kodachadri Hills. Blending sacred temple experiences, nature, and reflection into an inward exploration of calm, devotion, and quiet joy.",
    status: "Completed",
    date: "December 2024",
    image: "/assets/images/journeys/southernsojourn2024/south_temple.jpeg",
    gallery: [
      "/assets/images/journeys/southernsojourn2024/south_temple.jpeg",
      "/assets/images/journeys/southernsojourn2024/south_templecourtyard.jpeg",
      "/assets/images/journeys/southernsojourn2024/svadhyay.jpeg",
      "/assets/images/journeys/southernsojourn2024/tushar_south.jpeg"
    ]
  },
  {
    title: "Ayodhya Divine Diaries",
    location: "Ayodhya · Chitrakoot · Prayagraj",
    description:
      "A reflective journey through Ayodhya, Chitrakoot, and Prayagraj, walking along the serene banks of the Sarayu, witnessing the sacred confluence, and pausing in spaces rich with history and devotion. An inward exploration of faith, connection, and quiet rejuvenation.",
    status: "Completed",
    date: "May 2024",
    image: "/assets/images/journeys/ayodhyadivinediaries2024/sunset.jpeg",
    gallery: [
      "/assets/images/journeys/ayodhyadivinediaries2024/group_photo.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/hilltop_view.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/eating_group.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/ghat.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/boat_people.jpeg",
      "/assets/images/journeys/ayodhyadivinediaries2024/sunset.jpeg"
    ]
  },
  {
    title: "TMOL — The Manual of Life",
    location: "Online · 21-Day Live Sessions",
    description:
      "Realign your life this summer! A transformative 21-day journey through the fundamental dimensions of life. Hosted online on Google Meet, each 30-minute daily session dives deep into The Self, The Mind, Action, Nature, and Higher Wisdom. Includes a physical self-help book, lifetime community access, a completion certificate, and exclusive trip perks.",
    status: "Upcoming",
    date: "June–July 2026",
    exactDates: "13 June – 5 July, 2026",
    duration: "21 Days · 30 min/session",
    cost: "₹300 (Registration)",
    type: "event",
    image: "/assets/images/journeys/tmol2k26/poster.jpeg",
  },
  {
    title: "Detox & Discover (North India)",
    location: "Jaipur · Udaipur · Mount Abu",
    description:
      "A soul-stirring passage through Rajasthan — from the pink city lanes of Jaipur, through the shimmering lakes of Udaipur, to the cool misty heights of Mount Abu. TMOL 100% attendees receive an exclusive discount. Start and end at Jaipur.",
    status: "Upcoming",
    date: "July 2026",
    exactDates: "16–19 July, 2026",
    duration: "4 Days, 3 Nights",
    cost: "₹4,500 (special discount for TMOL 100% attendees)",
    type: "trip",
    startPoint: "Jaipur → Udaipur → Mount Abu",
    endPoint: "Jaipur",
    image: undefined,
  },
  {
    title: "Detox & Discover (South India)",
    location: "Bangaluru · Kodachadri Hills",
    description:
      "A rejuvenating South Indian escape. Reconnect with nature and yourself as we journey from Bengaluru to the serene heights of Kodachadri Hills. TMOL 100% attendees receive an exclusive discount.",
    status: "Upcoming",
    date: "July 2026",
    exactDates: "7–11 July, 2026",
    duration: "5 Days, 4 Nights",
    cost: "₹8,500 (₹6,000 for TMOL 100% attendees)",
    type: "trip",
    startPoint: "Bangaluru → Kodachadri Hills",
    endPoint: "Bangaluru",
    image: undefined,
  },
];
