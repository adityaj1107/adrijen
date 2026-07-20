/* Adrijen Healthcare — central site settings.
   Edit this file to update contact details sitewide. */
window.SITE_SETTINGS = {
  companyName: "Adrijen Healthcare",
  tagline: "Quality Medicines. Trusted Care.",
  whatsapp: "918909392600",
  whatsappDisplay: "+91-8909392600",
  whatsappDefaultText: "Hello Adrijen Healthcare, I would like to know more about your products and PCD franchise opportunities.",
  email: "md@adrijenhealthcare.com",
  phone: "+91-8909392600",
  phoneTel: "+918909392600",
  address: "Plot No. 115, Industrial Area Phase-1, Panchkula, Haryana, India — 134113",
  addressShort: "Plot No. 115, Industrial Area Phase-1, Panchkula, Haryana — 134113",
  hours: "Mon–Sat, 9 am – 7 pm IST",
  gst: "06AABCN7847E1ZF",
  cin: "U21002PB2003PTC026377",
  dl20b: "WLF20B2026HR001104",
  dl21b: "WLF21B2026HR001102",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Adrijen+Healthcare+Pvt+Ltd+Plot+No+115+Industrial+Area+Phase+1+Panchkula+Haryana+134113",
  mapsEmbed: "https://www.google.com/maps?q=Adrijen+Healthcare+Pvt+Ltd,+Plot+No+115,+Industrial+Area+Phase+1,+Panchkula,+Haryana+134113&output=embed",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#"
  }
};

window.SITE_SETTINGS.whatsappUrl = (customText) => {
  const text = encodeURIComponent(customText || window.SITE_SETTINGS.whatsappDefaultText);
  return `https://wa.me/${window.SITE_SETTINGS.whatsapp}?text=${text}`;
};
