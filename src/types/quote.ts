export const quoteSources = ["home", "services", "contact"] as const;
export type QuoteSource = (typeof quoteSources)[number];

export const quoteStatuses = ["new", "contacted", "closed"] as const;
export type QuoteStatus = (typeof quoteStatuses)[number];

/** POST /api/quotes istek gövdesi (doğrulamadan önce). */
export type QuoteRequestInput = {
  source: QuoteSource;
  name?: string;
  phone?: string;
  brand?: string;
  model?: string;
  vehicle?: string;
  year?: string;
  service?: string;
  services?: string[];
  notes?: string;
};

export type QuoteRequestRecord = {
  source: QuoteSource;
  name?: string;
  phone?: string;
  brand?: string;
  model?: string;
  vehicle?: string;
  year?: string;
  services: string[];
  notes?: string;
  status: QuoteStatus;
};

export type QuoteCreateResult = {
  id: string;
  createdAt: string;
};
