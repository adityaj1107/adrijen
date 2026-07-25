// Shared Google Form used by every enquiry-style form on the site
// (Contact page, floating Quick Enquiry drawer). Career applications post
// to a separate form/sheet — see CAREER_FORM below.
export const ENQUIRY_FORM = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeNK36MSgt9wD_58EzU7fKwJtTaAh7GlHLJ4fh5qAcG38Eiaw/formResponse",
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
    message: "entry.1222455963",
  },
};

export const CAREER_FORM = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSems6Pi1TMzJJkvaVYrL_IEUY90cJUHkaJl2TXFMmkcM7BWBQ/formResponse",
  entries: {
    fullName: "entry.636487478",
    email: "entry.1439816399",
    phone: "entry.1923411402",
    role: "entry.504419778",
    experience: "entry.1341587632",
    resumeLink: "entry.1056029743",
    message: "entry.1619950757",
  },
};

type FormConfig = typeof ENQUIRY_FORM | typeof CAREER_FORM;

export async function submitToGoogleForm(
  config: FormConfig,
  values: Partial<Record<string, string>>
) {
  const params = new URLSearchParams();
  let hasAny = false;
  Object.entries(config.entries).forEach(([key, entryId]) => {
    const value = values[key];
    if (value) {
      params.append(entryId, value);
      hasAny = true;
    }
  });
  if (!hasAny) return;
  await fetch(config.actionUrl, { method: "POST", mode: "no-cors", body: params }).catch(() => {});
}
