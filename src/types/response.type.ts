export type UUID = string;
export type Probability = number;
export type Status = 'internal_manual_review' | 'something_else';
export type MimeType = 'image/png' | 'image/jpg' | 'image/jpeg';
export type SessionContext = 'document-front' | 'document-back';
export type MediaContext = 'front' | 'back' | 'none';

export type MediaType = {
  mediaId: UUID;
  mimeType: MimeType;
  probability: Probability;
};

export type SessionDetailsType = {
  id: UUID;
  status: Status;
};

export type SessionMediaType = {
  id: UUID;
  mimeType: MimeType;
  context: SessionContext;
};

export type MediaContextType = {
  id: UUID;
  mediaId: UUID;
  context: MediaContext;
  probability: Probability;
};

export type SessionResponseType = {
  session: SessionDetailsType;
  media: Record<Extract<'front' | 'back', MediaContext>, Array<MediaType>>;
};
