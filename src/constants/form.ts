import ImageSrc1 from '@/assets/images/1.png';
import ImageSrc2 from '@/assets/images/2.png';
import ImageSrc3 from '@/assets/images/3.png';
import ImageSrc4 from '@/assets/images/4.png';
import ImageSrc5 from '@/assets/images/5.png';
import ImageSrc6 from '@/assets/images/6.png';
import ImageSrc7 from '@/assets/images/7.png';
import ImageSrc8 from '@/assets/images/8.png';
import ImageSrc9 from '@/assets/images/9.png';
import ImageSrc10 from '@/assets/images/10.png';

export const FormApiFields = {
  title: 'title',
  description: 'description',
  acceptResponses: 'accept_responses',
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

export const ImageUrl: ImageUrlType = {
  '1': ImageSrc1,
  '2': ImageSrc2,
  '3': ImageSrc3,
  '4': ImageSrc4,
  '5': ImageSrc5,
  '6': ImageSrc6,
  '7': ImageSrc7,
  '8': ImageSrc8,
  '9': ImageSrc9,
  '10': ImageSrc10,
};

export type ImageUrlType = {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
};
