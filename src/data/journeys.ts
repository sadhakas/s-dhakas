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
    location: "Blend of offline and online",
    description:
<<<<<<< HEAD
      "Begin your college journey with clarity and purpose. A transformative 7-day experience blending online and offline sessions, where accomplished speakers from IITs, MIT, and beyond explore timeless wisdom on the self, success, relationships, and purposeful living—all in engaging 45-minute sessions.",
    status: "Upcoming",
    date: "June–July 2026",
    exactDates: "20th June onwards",
    duration: "21 Days · 30 min/session",
    cost: "₹200 for the first 100 registrations (₹1000 thereafter)",
=======
      "Realign your life this summer! A transformative journey through the fundamental dimensions of life. Each daily session dives deep into The Self, The Mind, Action, Nature, and Higher Wisdom. Includes lifetime community access, a completion certificate, and exclusive trip perks.",
    status: "Upcoming",
    date: "August 2026",
    exactDates: "14th - 20th August",
    duration: "7 Days · 30 min/session",
    cost: "₹300 (Registration)",
>>>>>>> 7fd7a0b (relevant changes for TMOL-August-2026-main-branch)
    type: "event",
    image: "/assets/images/journeys/tmol2k26/poster.jpeg",
  },
  {
    title: "Inception Camp to Pink City",
    location: "Jaipur · Amer · Jal Mahal",
    description:
      "Celebrate Ganesh Chaturthi with a soul-stirring passage through the pink city. Visit the majestic Amer fort, serene Jal Mahal, Earthvilas, and the World's Largest Cow-Rehab. An exclusive ₹1000 pricing applies for 100% TMOL attendees.",
    status: "Upcoming",
    date: "September 2026",
    exactDates: "12th - 14th Sept, 2026",
    duration: "3 Days, 2 Nights",
    cost: "₹1000 for TMOL attendees (Reach out for details)",
    type: "trip",
    startPoint: "Jaipur",
    endPoint: "Jaipur",
    image: undefined,
  },
];
