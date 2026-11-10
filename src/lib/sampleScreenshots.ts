// Realistic SVG data URLs simulating iOS dating app screenshots (Hinge, Tinder, Bumble)

export interface SampleChat {
  id: string;
  name: string;
  app: "Hinge" | "Tinder" | "Bumble";
  previewTitle: string;
  subtitle: string;
  dataUrl: string;
  sampleMessage: string;
}

const hingeSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="375" height="580" viewBox="0 0 375 580" fill="%230b0b0e">
  <rect width="375" height="580" fill="%23121217" />
  <!-- Top Navigation -->
  <rect x="0" y="0" width="375" height="60" fill="%230e0e12" />
  <circle cx="36" cy="30" r="16" fill="%2353389E" />
  <text x="36" y="35" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="%23ffffff" text-anchor="middle">S</text>
  <text x="64" y="27" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="%23ffffff">Sarah, 24</text>
  <text x="64" y="42" font-family="-apple-system, sans-serif" font-size="11" fill="%239CA3AF">Active 5m ago • Brooklyn, NY</text>
  <circle cx="340" cy="30" r="4" fill="%239CA3AF" />
  <circle cx="348" cy="30" r="4" fill="%239CA3AF" />
  <circle cx="356" cy="30" r="4" fill="%239CA3AF" />

  <!-- Hinge Prompt Card -->
  <rect x="18" y="80" width="339" height="150" rx="16" fill="%231c1c24" stroke="%232e2e3a" stroke-width="1"/>
  <rect x="34" y="96" width="60" height="20" rx="6" fill="%232c1c3f" />
  <text x="40" y="110" font-family="-apple-system, sans-serif" font-size="10" font-weight="bold" fill="%23C084FC">MY BIO</text>
  <text x="34" y="136" font-family="-apple-system, sans-serif" font-size="13" font-weight="600" fill="%23A1A1AA">The secret to getting along with me is...</text>
  <text x="34" y="165" font-family="-apple-system, sans-serif" font-size="16" font-weight="500" fill="%23FFFFFF">Bringing me iced oat lattes without being asked,</text>
  <text x="34" y="188" font-family="-apple-system, sans-serif" font-size="16" font-weight="500" fill="%23FFFFFF">and never putting pineapple on pizza 🍕</text>

  <!-- Chat Bubbles -->
  <rect x="18" y="255" width="260" height="64" rx="18" fill="%23272732" />
  <text x="34" y="280" font-family="-apple-system, sans-serif" font-size="14" fill="%23F4F4F5">Okay dealbreaker test:</text>
  <text x="34" y="302" font-family="-apple-system, sans-serif" font-size="14" fill="%23F4F4F5">What if it's hot honey and pepperoni?</text>
  
  <rect x="120" y="335" width="237" height="64" rx="18" fill="url(%23purpleGrad)" />
  <text x="136" y="360" font-family="-apple-system, sans-serif" font-size="14" fill="%23FFFFFF">Now you're speaking my language.</text>
  <text x="136" y="382" font-family="-apple-system, sans-serif" font-size="14" fill="%23FFFFFF">I might let you recommend a spot 😉</text>

  <!-- Their latest incoming message -->
  <rect x="18" y="415" width="280" height="74" rx="18" fill="%23272732" stroke="%238B5CF6" stroke-width="1.5"/>
  <circle cx="28" cy="415" r="5" fill="%23EC4899" />
  <text x="34" y="440" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="%23FFFFFF">You talk a big game!</text>
  <text x="34" y="462" font-family="-apple-system, sans-serif" font-size="14" fill="%23E4E4E7">What's your go-to spot in Soho then?</text>
  <text x="34" y="480" font-family="-apple-system, sans-serif" font-size="10" fill="%23A1A1AA">Delivered just now</text>

  <!-- Bottom reply bar indicator -->
  <rect x="18" y="520" width="339" height="42" rx="21" fill="%231a1a22" stroke="%23333344" stroke-width="1"/>
  <text x="36" y="546" font-family="-apple-system, sans-serif" font-size="13" fill="%2371717A">Type a reply to Sarah...</text>

  <defs>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%238B5CF6" />
      <stop offset="100%" stop-color="%23EC4899" />
    </linearGradient>
  </defs>
</svg>`;

const tinderSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="375" height="580" viewBox="0 0 375 580" fill="%230b0b0e">
  <rect width="375" height="580" fill="%23111116" />
  <!-- Header -->
  <rect x="0" y="0" width="375" height="60" fill="%230c0c10" />
  <circle cx="36" cy="30" r="16" fill="%23E11D48" />
  <text x="36" y="35" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="%23ffffff" text-anchor="middle">E</text>
  <text x="64" y="27" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="%23ffffff">Elena, 23</text>
  <text x="64" y="42" font-family="-apple-system, sans-serif" font-size="11" fill="%23FB7185">Matched 2 hours ago 🔥</text>

  <!-- Match banner -->
  <rect x="30" y="85" width="315" height="65" rx="14" fill="%231c131a" stroke="%23E11D48" stroke-width="0.8" />
  <text x="187" y="112" font-family="-apple-system, sans-serif" font-size="13" font-weight="bold" fill="%23FDA4AF" text-anchor="middle">IT'S A MATCH!</text>
  <text x="187" y="132" font-family="-apple-system, sans-serif" font-size="11" fill="%239CA3AF" text-anchor="middle">You and Elena liked each other</text>

  <!-- Conversation -->
  <rect x="18" y="180" width="280" height="70" rx="18" fill="%23242430" />
  <text x="34" y="206" font-family="-apple-system, sans-serif" font-size="14" fill="%23F4F4F5">Your profile says you love spontaneous trips.</text>
  <text x="34" y="228" font-family="-apple-system, sans-serif" font-size="14" fill="%23F4F4F5">Pack your bags, where are we going? ✈️</text>

  <rect x="95" y="270" width="262" height="70" rx="18" fill="url(%23tinderGrad)" />
  <text x="110" y="296" font-family="-apple-system, sans-serif" font-size="14" fill="%23FFFFFF">Already packed. First stop is sunset drinks,</text>
  <text x="110" y="318" font-family="-apple-system, sans-serif" font-size="14" fill="%23FFFFFF">then you can plan the road trip playlist.</text>

  <rect x="18" y="365" width="295" height="85" rx="18" fill="%23242430" stroke="%23A855F7" stroke-width="1.5"/>
  <circle cx="28" cy="365" r="5" fill="%238B5CF6" />
  <text x="34" y="392" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="%23FFFFFF">Deal, but you better have good music taste.</text>
  <text x="34" y="414" font-family="-apple-system, sans-serif" font-size="14" fill="%23E4E4E7">Send me the top 3 tracks or we're cancelling 😉</text>
  <text x="34" y="434" font-family="-apple-system, sans-serif" font-size="10" fill="%23A1A1AA">Received 2m ago</text>

  <!-- Reply Input -->
  <rect x="18" y="515" width="339" height="42" rx="21" fill="%23181820" stroke="%232a2a38" stroke-width="1"/>
  <text x="36" y="541" font-family="-apple-system, sans-serif" font-size="13" fill="%2371717A">Send message to Elena...</text>

  <defs>
    <linearGradient id="tinderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23EC4899" />
      <stop offset="100%" stop-color="%23F43F5E" />
    </linearGradient>
  </defs>
</svg>`;

const bumbleSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="375" height="580" viewBox="0 0 375 580" fill="%230b0b0e">
  <rect width="375" height="580" fill="%23121216" />
  <!-- Header -->
  <rect x="0" y="0" width="375" height="60" fill="%230e0e12" />
  <circle cx="36" cy="30" r="16" fill="%23EAB308" />
  <text x="36" y="35" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="%23000000" text-anchor="middle">M</text>
  <text x="64" y="27" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="%23ffffff">Maya, 25</text>
  <text x="64" y="42" font-family="-apple-system, sans-serif" font-size="11" fill="%23FACC15">She made the first move ⚡</text>

  <!-- Bumble question -->
  <rect x="24" y="85" width="327" height="85" rx="16" fill="%23221e12" stroke="%23ca8a04" stroke-width="0.8" />
  <text x="40" y="112" font-family="-apple-system, sans-serif" font-size="11" font-weight="bold" fill="%23FDE047">QUESTION GAME</text>
  <text x="40" y="134" font-family="-apple-system, sans-serif" font-size="14" fill="%23FEF08A">"Never have I ever..."</text>
  <text x="40" y="154" font-family="-apple-system, sans-serif" font-size="13" fill="%23D4D4D8">Maya answered: "Fallen asleep during a movie date"</text>

  <!-- Bumble Chat -->
  <rect x="18" y="200" width="290" height="85" rx="18" fill="%2322222d" stroke="%23A855F7" stroke-width="1.5"/>
  <circle cx="28" cy="200" r="5" fill="%23EC4899" />
  <text x="34" y="226" font-family="-apple-system, sans-serif" font-size="14" font-weight="600" fill="%23FFFFFF">Hey! You look like someone who actually</text>
  <text x="34" y="248" font-family="-apple-system, sans-serif" font-size="14" fill="%23FFFFFF">has strong opinions on things.</text>
  <text x="34" y="270" font-family="-apple-system, sans-serif" font-size="14" fill="%23E4E4E7">What's your biggest green flag in a date? 👀</text>

  <!-- Quick Reaction Pills -->
  <rect x="18" y="310" width="105" height="34" rx="17" fill="%231a1a24" stroke="%233a3a4e" stroke-width="1" />
  <text x="70" y="332" font-family="-apple-system, sans-serif" font-size="12" fill="%23D4D4D8" text-anchor="middle">Good banter</text>

  <rect x="131" y="310" width="125" height="34" rx="17" fill="%231a1a24" stroke="%233a3a4e" stroke-width="1" />
  <text x="193" y="332" font-family="-apple-system, sans-serif" font-size="12" fill="%23D4D4D8" text-anchor="middle">Knows good food</text>

  <!-- Reply Input -->
  <rect x="18" y="515" width="339" height="42" rx="21" fill="%23191922" stroke="%232a2a3a" stroke-width="1"/>
  <text x="36" y="541" font-family="-apple-system, sans-serif" font-size="13" fill="%2371717A">Reply to Maya...</text>
</svg>`;

export const SAMPLE_CHATS: SampleChat[] = [
  {
    id: "hinge-sample",
    name: "Sarah (Hinge)",
    app: "Hinge",
    previewTitle: "Hinge: Pizza & Soho Bar Opener",
    subtitle: "What's your go-to spot in Soho then?",
    sampleMessage: "Sarah asked: 'You talk a big game! What's your go-to spot in Soho then?'",
    dataUrl: hingeSvg,
  },
  {
    id: "tinder-sample",
    name: "Elena (Tinder)",
    app: "Tinder",
    previewTitle: "Tinder: Spontaneous Roadtrip Banter",
    subtitle: "Send me the top 3 tracks or we're cancelling 😉",
    sampleMessage: "Elena said: 'Deal, but you better have good music taste. Send me the top 3 tracks or we're cancelling 😉'",
    dataUrl: tinderSvg,
  },
  {
    id: "bumble-sample",
    name: "Maya (Bumble)",
    app: "Bumble",
    previewTitle: "Bumble: Green Flag Opening",
    subtitle: "What's your biggest green flag in a date? 👀",
    sampleMessage: "Maya asked: 'What's your biggest green flag in a date? 👀'",
    dataUrl: bumbleSvg,
  },
];
