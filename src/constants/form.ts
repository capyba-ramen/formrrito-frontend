import ImageSrc1 from '@/assets/webp/1.webp';
import ImageSrc2 from '@/assets/webp/2.webp';
import ImageSrc3 from '@/assets/webp/3.webp';
import ImageSrc4 from '@/assets/webp/4.webp';
import ImageSrc5 from '@/assets/webp/5.webp';
import ImageSrc6 from '@/assets/webp/6.webp';
import ImageSrc7 from '@/assets/webp/7.webp';
import ImageSrc8 from '@/assets/webp/8.webp';
import ImageSrc9 from '@/assets/webp/9.webp';
import ImageSrc10 from '@/assets/webp/10.webp';

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
    image: ImageSrc1,
    type: TemplateEnum.PARTY_INVITE,
  },
  {
    title: 'Contact Information',
    image: ImageSrc2,
    type: TemplateEnum.CONTACT_INFORMATION,
  },
  {
    title: 'Event Registration',
    image: ImageSrc3,
    type: TemplateEnum.EVENT_REGISTRATION,
  },
  {
    title: 'RSVP',
    image: ImageSrc4,
    type: TemplateEnum.RSVP,
  },
  {
    title: 'Customer Feedback',
    image: ImageSrc5,
    type: TemplateEnum.CUSTOMER_FEEDBACK,
  },
];
