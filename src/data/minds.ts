export interface MindData {
  name: string;
  domain: string;
  quote: string;
  years: string;
  image: string;
}

export const minds: MindData[] = [
  {
    name: "Einstein",
    domain: "Physics · Imagination",
    quote: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    years: "1879 – 1955",
    image: "/assets/images/minds/port_einstein.png",
  },
  {
    name: "Tesla",
    domain: "Engineering · Vision",
    quote: "The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane.",
    years: "1856 – 1943",
    image: "/assets/images/minds/port_tesla.png",
  },
  {
    name: "Tagore",
    domain: "Poetry · Consciousness",
    quote: "You can't cross the sea merely by standing and staring at the water.",
    years: "1861 – 1941",
    image: "/assets/images/minds/port_rabindra_tagore.png",
  },
];
