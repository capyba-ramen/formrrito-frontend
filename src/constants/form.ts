export const FormApiFields = {
  title: 'title',
  description: 'description',
  acceptsReply: 'accepts_reply',
};

export const TemplateEnum = {
  PARTY_INVITE: 'party_invite',
  CONTACT_INFORMATION: 'contact_information',
  EVENT_REGISTRATION: 'event_registration',
  RSVP: 'rsvp',
  CUSTOMER_FEEDBACK: 'customer_feedback',
};

export const TemplateForms = [
  {
    title: 'Party Invite',
    image: 'default/1.webp',
    type: TemplateEnum.PARTY_INVITE,
  },
  {
    title: 'Contact Information',
    image: 'default/2.webp',
    type: TemplateEnum.CONTACT_INFORMATION,
  },
  {
    title: 'Event Registration',
    image: 'default/3.webp',
    type: TemplateEnum.EVENT_REGISTRATION,
  },
  {
    title: 'RSVP',
    image: 'default/4.webp',
    type: TemplateEnum.RSVP,
  },
  {
    title: 'Customer Feedback',
    image: 'default/5.webp',
    type: TemplateEnum.CUSTOMER_FEEDBACK,
  },
];
