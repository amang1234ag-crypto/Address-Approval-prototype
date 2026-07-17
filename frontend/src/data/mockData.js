// Mock data for the Address Approval Dashboard prototype

export const summaryMetrics = {
  requestsHandled: 212,
  rejectRate: "4%",
  factCheckAccuracy: "91%",
  downstreamImpact: 2,
  trackRecordSummary: "Volume up, reject rate steady — 8 weeks",
};

export const requests = [
  {
    id: "100511",
    verdict: "Rejected",
    name: "Emma Carter",
    why: "2/6 failed — distance from prior address (9.4 km), serviceable zone check",
    confidence: "Low",
    decided: "Today, 9:14 am",
    requestedOn: "Fri May 15",
    decidedFull: "Today, 8:14 AM",
  },
  {
    id: "100505",
    verdict: "Rejected",
    name: "Ethan Brooks",
    why: "Address and PIN resolve to different cities",
    confidence: "Low",
    decided: "Today, 10:02 am",
    requestedOn: "Thu May 14",
    decidedFull: "Today, 9:02 AM",
  },
  {
    id: "100503",
    verdict: "Approved",
    name: "Olivia Bennett",
    why: "Serviceable zone confirmed",
    confidence: "Med",
    decided: "Today, 11:10 am",
    requestedOn: "Wed May 13",
    decidedFull: "Today, 10:10 AM",
  },
  {
    id: "100507",
    verdict: "Approved",
    name: "Lucas Turner",
    why: "All 6 checks passed",
    confidence: "High",
    decided: "Today, 9:02 am",
    requestedOn: "Fri May 15",
    decidedFull: "Today, 8:02 AM",
  },
  {
    id: "100506",
    verdict: "Approved",
    name: "Sophia Mitchell",
    why: "Pin matches, colleague cluster fit",
    confidence: "High",
    decided: "Today, 9:31 am",
    requestedOn: "Fri May 15",
    decidedFull: "Today, 8:31 AM",
  },
  {
    id: "100504",
    verdict: "Approved",
    name: "Mason Walker",
    why: "Within prior radius (0.8 km)",
    confidence: "High",
    decided: "Today, 10:45 am",
    requestedOn: "Thu May 14",
    decidedFull: "Today, 9:45 AM",
  },
  {
    id: "100502",
    verdict: "Approved",
    name: "Charlotte Hayes",
    why: "Team cluster and address agreement",
    confidence: "High",
    decided: "Today, 11:52 am",
    requestedOn: "Wed May 13",
    decidedFull: "Today, 10:52 AM",
  },
  {
    id: "100500",
    verdict: "Approved",
    name: "Noah Parker",
    why: "Near prior address (0.2 km)",
    confidence: "High",
    decided: "Today, 12:40 pm",
    requestedOn: "Wed May 13",
    decidedFull: "Today, 11:40 AM",
  },
  {
    id: "100501",
    verdict: "Approved",
    name: "Amelia Foster",
    why: "Near prior address (0.2 km)",
    confidence: "High",
    decided: "Today, 12:40 pm",
    requestedOn: "Wed May 13",
    decidedFull: "Today, 11:40 AM",
  },
  {
    id: "100499",
    verdict: "Approved",
    name: "Betty G.",
    why: "Near prior address (0.2 km)",
    confidence: "High",
    decided: "Today, 12:40 pm",
    requestedOn: "Wed May 13",
    decidedFull: "Today, 11:40 AM",
  },
];

// Fact Check popover data
export const factCheckData = {
  title: "Fact Check",
  subtitle: "Did the agent read the input right?",
  overall: "91%",
  reconciledSample: "340 of 6,200 decisions",
  checks: [
    { name: "Pin (Geocode) ↔ typed address agreement", value: "98%", status: "good" },
    { name: "Colleague cluster fit", value: "89%", status: "good" },
    { name: "Distance from prior address", value: "96%", status: "good" },
    {
      name: "Serviceable zone check",
      value: "71%",
      status: "warn",
      note: "degrading — polygon last updated 18 months ago",
    },
    { name: "Marshal route (dark hours)", value: "95%", status: "good" },
    { name: "Address completeness", value: "99%", status: "good" },
  ],
};

// Downstream Impact popover data
export const downstreamData = {
  title: "Downstream Impact",
  subtitle: 'Did anything go wrong after the decision — not whether it was "correct"',
  incidents: "35",
  decisions: "38 / 6200",
  bySource: [
    { name: "Trip feedback complaints", value: 12 },
    { name: "Routing / marshall escalations", value: 9 },
    { name: "Support tickets (root-cause)", value: 14 },
    { name: "Escalation emails", value: 3 },
  ],
  disclaimer: "Counts may overlap if one case triggered more than one source",
};

// Track Record popover data
export const trackRecordData = {
  title: "Track Record",
  subtitle: "Volume handled and reject rate trend · last 12 weeks",
  volume: [
    { week: "Wk 1", value: 180, current: false },
    { week: "Wk 4", value: 195, current: false },
    { week: "Wk 8", value: 205, current: false },
    { week: "Wk 12", value: 214, current: true },
  ],
  rejectRate: [
    { week: "Wk 1", value: 6, peak: true },
    { week: "Wk 4", value: 5, peak: false },
    { week: "Wk 8", value: 4, peak: false },
    { week: "Wk 12", value: 4, peak: false },
  ],
};

// Detailed check sequence used by Address Details side panel.
// For each request, we compose an appropriate sequence based on their verdict/why.
export const buildCheckSequence = (req) => {
  const isRejected = req.verdict === "Rejected";

  // Emma Carter's exact sequence
  if (req.id === "100511") {
    return [
      {
        time: "09:14:01 AM",
        name: "Pin ↔ typed address agreement",
        status: "PASS",
        confidence: "High",
        summary: "Map pin and typed address resolve within 50 m of each other.",
        rationale:
          "Confidence rationale: Map pin and typed address resolve within 50 m. Geocode precision: rooftop-level.",
      },
      {
        time: "09:14:02 AM",
        name: "Colleague cluster fit",
        status: "PASS",
        confidence: "Med",
        summary: "New address sits within existing colleague cluster radius.",
        rationale:
          "Confidence rationale: 4 colleagues live within a 3 km radius; typical cluster density observed.",
      },
      {
        time: "09:14:03 AM",
        name: "Distance from prior address",
        status: "FAIL",
        confidence: "Low",
        summary: "Map pin and typed address resolve within 50 m of each other.",
        rationale:
          "Confidence rationale: Map pin and typed address resolve within 50 m. Geocode precision: rooftop-level.",
        details: {
          computedDistance: "9.4 km",
          allowedRadius: "2.0 km",
          excess: "7.4 km",
          method: "Straight-line (Haversine)",
          dataSource: "Google Maps Distance API",
          policy: "Max 2.0 km radius from prior address",
        },
      },
      {
        time: "09:14:02 AM",
        name: "Serviceable zone check",
        status: "FAIL",
        confidence: "Low",
        summary: "New address falls outside the serviceable zone.",
        rationale:
          "Confidence rationale: Serviceable polygon last updated 18 months ago; recent expansion not yet reflected.",
      },
      {
        time: "09:14:02 AM",
        name: "Marshal Route (dark hours)",
        status: "PASS",
        confidence: "Med",
        summary: "Not required — address does not fall under dark hours policy.",
        rationale:
          "Confidence rationale: Address is outside the dark-hours perimeter; policy check skipped.",
      },
      {
        time: "09:14:03 AM",
        name: "Address completeness",
        status: "PASS",
        confidence: "High",
        summary: "All required address fields provided and validated.",
        rationale:
          "Confidence rationale: Line 1, city, state, PIN and country all present and formatted correctly.",
      },
    ];
  }

  // Ethan Brooks (Rejected — PIN mismatch)
  if (req.id === "100505") {
    return [
      { time: "10:02:01 AM", name: "Pin ↔ typed address agreement", status: "FAIL", confidence: "Low",
        summary: "Typed address and PIN geocode resolve to different cities.",
        rationale: "Confidence rationale: Typed address geocode is 42 km from the PIN centroid." },
      { time: "10:02:02 AM", name: "Colleague cluster fit", status: "PASS", confidence: "Med",
        summary: "Colleague cluster remains within acceptable tolerance.",
        rationale: "Confidence rationale: 3 colleagues in a 5 km radius." },
      { time: "10:02:02 AM", name: "Distance from prior address", status: "FAIL", confidence: "Low",
        summary: "New address is 24 km from the prior recorded address.",
        rationale: "Confidence rationale: Straight-line Haversine distance well above 2 km policy." },
      { time: "10:02:03 AM", name: "Serviceable zone check", status: "PASS", confidence: "Med",
        summary: "Address falls within a serviceable polygon.", rationale: "Confidence rationale: Polygon match confirmed." },
      { time: "10:02:03 AM", name: "Marshal Route (dark hours)", status: "PASS", confidence: "Med",
        summary: "Not required — address does not fall under dark hours policy.",
        rationale: "Confidence rationale: Outside dark-hours perimeter." },
      { time: "10:02:03 AM", name: "Address completeness", status: "PASS", confidence: "High",
        summary: "All required fields present.", rationale: "Confidence rationale: Fields present and formatted." },
    ];
  }

  // Approved rows — default all-pass template with row-specific first line
  return [
    { time: "09:00:01 AM", name: "Pin ↔ typed address agreement", status: "PASS", confidence: "High",
      summary: "Map pin and typed address resolve within 50 m of each other.",
      rationale: "Confidence rationale: Map pin and typed address resolve within 50 m. Geocode precision: rooftop-level." },
    { time: "09:00:02 AM", name: "Colleague cluster fit", status: "PASS", confidence: "High",
      summary: "New address sits within existing colleague cluster radius.",
      rationale: "Confidence rationale: 5+ colleagues within 3 km; typical cluster density observed." },
    { time: "09:00:03 AM", name: "Distance from prior address", status: "PASS", confidence: isRejected ? "Low" : "High",
      summary: "Distance from prior address within allowed radius.",
      rationale: "Confidence rationale: Straight-line distance within policy tolerance." },
    { time: "09:00:04 AM", name: "Serviceable zone check", status: "PASS", confidence: "High",
      summary: "Address falls inside serviceable polygon.",
      rationale: "Confidence rationale: Polygon match confirmed with a healthy margin." },
    { time: "09:00:05 AM", name: "Marshal Route (dark hours)", status: "PASS", confidence: "Med",
      summary: "Not required — address does not fall under dark hours policy.",
      rationale: "Confidence rationale: Outside dark-hours perimeter." },
    { time: "09:00:06 AM", name: "Address completeness", status: "PASS", confidence: "High",
      summary: "All required address fields provided and validated.",
      rationale: "Confidence rationale: All fields present and correctly formatted." },
  ];
};
