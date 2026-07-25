/* Adrijen Healthcare — Google Form integration.
   The site now uses TWO separate Google Forms, each with its own linked
   Google Sheet:

   1. GOOGLE_FORM_ENQUIRY — Contact page, the sticky Enquiry panel (every
      page), and the Blog newsletter signup. One sheet: "Adrijen
      Healthcare — Website Enquiries (Responses)".
   2. GOOGLE_FORM_CAREER — the Career Application form on careers.html.
      One sheet: "Adrijen Healthcare — Career Applications (Responses)".

   Each <form data-demo-form> on the site carries a data-form-target
   attribute ("enquiry" or "career") telling main.js which config to
   submit to.

   ===================== ONE-TIME SETUP (you do this) =====================
   For EACH of the two forms above, in Google Forms:
   1. Add the questions listed below for that form (short answer unless
      noted). Leave them all "not required" in the Form itself — the site
      already validates what it needs before submitting.
   2. Click ⋮ → "Get pre-filled link", fill a dummy answer into every
      question, click "Get link", then look at the long URL — it's full
      of `entry.XXXXXXXXX=your+dummy+answer` pairs. Copy each entry ID
      into the matching ENTRIES map below.
   3. Take the form's normal URL (ends in /viewform) and change the
      ending to /formResponse — that's the ACTION_URL below.
   4. In Google Forms, go to Responses → click the green Sheets icon to
      create (or confirm) the linked Google Sheet.

   Enquiry form questions: Source, Full Name, Email, Phone, Company,
   City, State, Has GST, Has Drug Licence, Subject, Message.

   Career form questions: Full Name, Email, Phone, Applying For,
   Experience, Resume Link, Message.
   ==========================================================================
*/
window.GOOGLE_FORM_ENQUIRY = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeNK36MSgt9wD_58EzU7fKwJtTaAh7GlHLJ4fh5qAcG38Eiaw/formResponse",
  entries: {
    source: "entry.38996998",
    fullName: "entry.1898754348",
    email: "entry.183954726",
    phone: "entry.400142400",
    company: "entry.1274289550",
    city: "entry.1372679016",
    state: "entry.723706960",
    hasGst: "entry.393232145",
    hasDl: "entry.888744865",
    subject: "entry.580500479",
    message: "entry.1222455963"
  }
};

window.GOOGLE_FORM_CAREER = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSems6Pi1TMzJJkvaVYrL_IEUY90cJUHkaJl2TXFMmkcM7BWBQ/formResponse",
  entries: {
    fullName: "entry.636487478",
    email: "entry.1439816399",
    phone: "entry.1923411402",
    role: "entry.504419778",
    experience: "entry.1341587632",
    resumeLink: "entry.1056029743",
    message: "entry.1619950757"
  }
};
