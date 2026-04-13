export interface MindData {
  name: string;
  domain: string;
  quote: string;
  years: string;
  image: string;
}

export const minds: MindData[] = [
  {
    name: "Albert Einstein",
    domain: "Physics · Imagination",
    quote: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
    years: "1879 – 1955",
    image: "/assets/images/minds/port_einstein.png",
  },
  {
    name: "Nikola Tesla",
    domain: "Engineering · Vision",
    quote: "The Vedic conception of the universe is the most magnificent.",
    years: "1856 – 1943",
    image: "/assets/images/minds/port_tesla.png",
  },
  {
    name: "Rabindra Tagore",
    domain: "Poetry · Consciousness",
    quote: "The Upanishads give what the world needs most—a knowledge of the Self.",
    years: "1861 – 1941",
    image: "/assets/images/minds/port_rabindra_tagore.png",
  },
];
