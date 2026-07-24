/* Adrijen Healthcare — consolidated Google Form integration.
   Every form on the site (Contact page, the sticky Enquiry panel, the
   Career application form, and the Blog newsletter signup) submits into
   THIS one Google Form, so every lead lands in one Google Sheet with a
   "Source" column telling you which form it came from.

   ===================== ONE-TIME SETUP (you do this) =====================
   1. Go to https://forms.google.com and create a new blank form, e.g.
      "Adrijen Healthcare — Website Enquiries".
   2. Add these questions, in any order (short answer unless noted).
      Leave them all "not required" in the Form itself — different site
      forms fill in different subsets, and the site already validates
      what each form actually needs before it submits:
        - Source              (which form: Contact / Enquiry / Career / Newsletter)
        - Full Name
        - Email
        - Phone
        - Company
        - City
        - State
        - Has GST
        - Has Drug Licence
        - Subject
        - Applying For        (career form only)
        - Experience          (career form only)
        - Resume Link         (career form only)
        - Message
   3. Click the eye icon (Preview) to open the live form, then open the
      page source (or DevTools → Elements) and search for `entry.` — each
      question's <input>/<textarea> has a `name="entry.XXXXXXXXX"` — copy
      each one into ENTRIES below next to the matching field.
      (Faster way: click ⋮ → "Get pre-filled link", fill a dummy answer
      into every question, click "Get link", then look at the long URL —
      it's full of `entry.XXXXXXXXX=your+dummy+answer` pairs.)
   4. Take the form's normal URL (ends in /viewform), and change the
      ending to /formResponse — that's your ACTION_URL below.
   5. In Google Forms, go to Responses → click the green Sheets icon to
      create a linked Google Sheet. That sheet is now your single
      consolidated inbox for every enquiry from the whole website.
   ==========================================================================
*/
window.GOOGLE_FORM = {
  // Paste your form's .../formResponse URL here. Leave blank to disable
  // Google Form submission (forms will still show the on-page "thank you"
  // message, they just won't send anywhere until this is set).
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeNK36MSgt9wD_58EzU7fKwJtTaAh7GlHLJ4fh5qAcG38Eiaw/formResponse",

  // Paste each entry.XXXXXXXXX ID here. Leave any you didn't add as "".
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
    role: "entry.964919302",
    experience: "entry.1097643987",
    resumeLink: "entry.294998078",
    message: "entry.1222455963"
  }
};
