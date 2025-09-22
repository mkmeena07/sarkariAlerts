import { Post, PostCategory, StaticPage, SocialLink, HomePageSection, SEOSettings } from './types';

const today = new Date();
const expiry = new Date();
expiry.setMonth(today.getMonth() + 1);

const todayString = today.toISOString().split('T')[0];
const expiryDateString = expiry.toISOString().split('T')[0];

const emptyContent = {
  shortInformation: '',
  importantDates: [],
  applicationFee: [],
  ageLimit: [],
  vacancyDetails: [],
  howToFillForm: [],
  importantLinks: [],
};

export const INITIAL_POSTS: Post[] = [
  // Latest Jobs
  { 
    id: 1, 
    title: 'UPSC Civil Services IAS Online Form 2024', 
    isNew: true, 
    category: PostCategory.LATEST_JOBS, 
    link: '#', 
    publishDate: todayString, 
    isFeatured: true, 
    expiryDate: expiryDateString,
    shortInformation: 'Union Public Service Commission (UPSC) has released the notification for the Civil Services Examination 2024. Any graduate candidate who is interested in this recruitment can apply online from 14 February 2024 to 05 March 2024. Read the notification for recruitment eligibility, post information, selection procedure, age limit, pay scale and all other information.',
    importantDates: [
      { event: 'Application Begin', date: '14/02/2024' },
      { event: 'Last Date for Apply Online', date: '05/03/2024' },
      { event: 'Pay Exam Fee Last Date', date: '05/03/2024' },
      { event: 'Pre Exam Date', date: '26/05/2024' },
    ],
    applicationFee: [
      { category: 'General / OBC', fee: '100/-' },
      { category: 'SC / ST / PH', fee: '0/-' },
      { category: 'All Category Female', fee: '0/-' },
    ],
    ageLimit: [
      { detail: 'Minimum Age', age: '21 Years' },
      { detail: 'Maximum Age', age: '32 Years' },
      { detail: 'Age Relaxation Extra as per Rules', age: '' },
    ],
    vacancyDetails: [
      { postName: 'Indian Administrative Service', totalPosts: '1056', eligibility: 'Bachelor Degree in Any Stream in Any Recognized University in India.' },
      { postName: 'Indian Forest Service', totalPosts: '150', eligibility: 'Bachelor Degree as one of Subject Animal Husbandry & Veterinary Science, Botany, Chemistry, Geology, Mathematics, Physics, Statistics and Zoology, Agriculture or Equivalent.' },
    ],
    howToFillForm: [
      'Candidate Can Apply Between 14/02/2024 to 05/03/2024.',
      'Candidate Read the Notification Before Apply the Recruitment Application Form.',
      'Kindly Check and Collect the All Document - Eligibility, ID Proof, Address Details, Basic Details.',
      'Kindly Ready Scan Document Related to Recruitment Form - Photo, Sign, ID Proof, Etc.',
      'Before Submit the Application Form Must Check the Preview and All Columns Carefully.',
      'If Candidate Required to Paying the Application Fee Must Submit. If You have Not the Required Application Fees Your Form is Not Completed.',
      'Take A Print Out of Final Submitted Form.',
    ],
    importantLinks: [
      { title: 'Apply Online', link: '#' },
      { title: 'Download Notification', link: '#' },
      { title: 'Official Website', link: '#' },
    ],
  },
  { id: 2, title: 'SSC CGL 2024 Online Form', isNew: true, category: PostCategory.LATEST_JOBS, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 3, title: 'IBPS Clerk XIII Online Form 2024', isNew: false, category: PostCategory.LATEST_JOBS, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 4, title: 'Railway RPF Constable / SI Recruitment 2024', isNew: false, category: PostCategory.LATEST_JOBS, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 5, title: 'UP Police Constable Recruitment 2024', isNew: false, category: PostCategory.LATEST_JOBS, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },

  // Admit Card
  { id: 6, title: 'SSC CHSL 2024 Tier I Admit Card', isNew: true, category: PostCategory.ADMIT_CARD, link: '#', publishDate: todayString, isFeatured: true, expiryDate: expiryDateString, ...emptyContent },
  { id: 7, title: 'UPSSSC PET 2024 Admit Card', isNew: false, category: PostCategory.ADMIT_CARD, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 8, title: 'RRB Group D Phase I Admit Card', isNew: false, category: PostCategory.ADMIT_CARD, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },

  // Result
  { id: 9, title: 'UPTET 2024 Result', isNew: true, category: PostCategory.RESULT, link: '#', publishDate: todayString, isFeatured: true, expiryDate: expiryDateString, ...emptyContent },
  { id: 10, title: 'CBSE Class 10th / 12th Result 2024', isNew: false, category: PostCategory.RESULT, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 11, title: 'SBI PO 2023 Final Result', isNew: false, category: PostCategory.RESULT, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },

  // Answer Key
  { id: 12, title: 'SSC MTS 2024 Answer Key', isNew: true, category: PostCategory.ANSWER_KEY, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },

  // Syllabus
  { id: 13, title: 'UP Lekhpal 2024 Syllabus', isNew: false, category: PostCategory.SYLLABUS, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },

  // Admission
  { id: 14, title: 'UP B.Ed JEE 2024 Counselling', isNew: true, category: PostCategory.ADMISSION, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 15, title: 'JOSAA 2024 Counselling Schedule', isNew: false, category: PostCategory.ADMISSION, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  
  // Important
  { id: 16, title: 'Aadhar Card Online Correction', isNew: false, category: PostCategory.IMPORTANT, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
  { id: 17, title: 'PAN Card Online Form', isNew: false, category: PostCategory.IMPORTANT, link: '#', publishDate: todayString, isFeatured: false, expiryDate: expiryDateString, ...emptyContent },
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', link: 'https://www.facebook.com', color: 'bg-blue-600' },
  { name: 'Twitter', link: 'https://www.twitter.com', color: 'bg-sky-500' },
  { name: 'Instagram', link: 'https://www.instagram.com', color: 'bg-pink-600' },
  { name: 'Telegram', link: 'https://telegram.org', color: 'bg-sky-600' },
  { name: 'YouTube', link: 'https://www.youtube.com', color: 'bg-red-600' },
];

export const INITIAL_HOME_PAGE_SECTIONS: HomePageSection[] = [
  { id: 'latest-jobs', title: 'Latest Jobs', type: 'post-list', category: PostCategory.LATEST_JOBS, style: 'default', width: '1' },
  { id: 'admit-card', title: 'Admit Card', type: 'post-list', category: PostCategory.ADMIT_CARD, style: 'primary', width: '1' },
  {
    id: 'welcome-text',
    title: 'Welcome to Sarkari Alert',
    type: 'text',
    content: '<p>Your one-stop destination for all the latest government job alerts, results, admit cards, and more. We provide timely and accurate information to help you succeed in your career.</p>',
    style: 'default',
    width: '1'
  },
  { id: 'result', title: 'Result', type: 'post-list', category: PostCategory.RESULT, style: 'accent', width: '1' },
  { id: 'answer-key', title: 'Answer Key', type: 'post-list', category: PostCategory.ANSWER_KEY, style: 'default', width: '1' },
  { id: 'syllabus', title: 'Syllabus', type: 'post-list', category: PostCategory.SYLLABUS, style: 'primary', width: '1' },
  { id: 'admission', title: 'Admission', type: 'post-list', category: PostCategory.ADMISSION, style: 'accent', width: '1' },
  { id: 'important', title: 'Important', type: 'post-list', category: PostCategory.IMPORTANT, style: 'default', width: '1' },
];


export const INITIAL_STATIC_PAGES: StaticPage[] = [
    {
        id: 'about-us',
        title: 'About Us',
        content: `
            <p>Welcome to <strong>Sarkari Alert</strong>, your number one source for all government job alerts.</p>
            <p>We're dedicated to providing you the very best and latest information, with an emphasis on reliability, accuracy, and timeliness.</p>
            <p>Founded in 2024, Sarkari Alert has come a long way from its beginnings. We hope you find our service as useful as we enjoy offering it to you.</p>
            <p>If you have any questions or comments, please don't hesitate to contact us.</p>
        `
    },
    {
        id: 'contact-us',
        title: 'Contact Us',
        content: `
            <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
            <p>You can reach us via email at: <strong>contact@sarkarialert.example.com</strong></p>
            <p>Or follow us on our social media channels!</p>
        `
    },
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        content: `
            <p>Your privacy is important to us. It is Sarkari Alert's policy to respect your privacy regarding any information we may collect from you across our website.</p>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
            <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
            <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
            <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information.</p>
        `
    },
    {
        id: 'disclaimer',
        title: 'Disclaimer',
        content: `
            <p>The information provided by Sarkari Alert on our website is for general informational purposes only.</p>
            <p>All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
            <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.</p>
        `
    }
];

export const INITIAL_SEO_SETTINGS: SEOSettings = {
  homeTitle: 'Latest Government Jobs, Results, Admit Cards',
  homeDescription: 'Sarkari Alert provides the latest updates on government jobs (Sarkari Naukri), exam results, admit cards, answer keys, and admission forms across India.',
  ogImageUrl: 'https://picsum.photos/seed/social/1200/630',
  homeKeywords: 'sarkari naukri, government jobs, latest jobs, sarkari result, admit card, answer key, syllabus, admission, sarkari exam',
  footerText: '© {year} Sarkari job alerts. All rights reserved.',
};