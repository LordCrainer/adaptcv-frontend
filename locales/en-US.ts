import { en as $vuetify } from 'vuetify/locale'

export default {
  actions: {
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit'
  },
  common: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    testimonials: 'Testimonials',
    blog: 'Blog',
    portfolio: 'Portfolio',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    email: 'Email',
    noData: 'No data available'
  },
  login: {
    email: 'email',
    password: 'password',
    login: 'Login',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    signUp: 'Sign Up',
    signIn: 'Sign In'
  },
  registration: {
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signUp: 'Sign Up'
  },
  profile: {
    personalInfo: {
      title: 'Personal Information',
      fullname: 'Full Name',
      areaProfession: 'Area of Profession',
      profession: 'Profession',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      summary: 'Summary',
      city: 'City',
      country: 'Country',
      fillInformation: 'Fill Information',
      aboutMe: 'About Me'
    },
    experience: {
      title: 'Experience',
      jobTitle: 'Job Title',
      company: 'Company',
      position: 'Position',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: 'Description'
    },
    education: {
      title: 'Education',
      degree: 'Degree',
      institution: 'Institution',
      startDate: 'Start Date',
      endDate: 'End Date'
    },
    skills: {
      title: 'Skills',
      skill: 'Skill',
      less1year: 'Less than 1 year',
      '1to2years': '1 to 2 years',
      '2to3years': '2 to 3 years',
      '5to10years': '5 to 10 years',
      '10plusyears': '10+ years'
    },
    languages: {
      title: 'Languages',
      language: 'Language',
      level: 'Level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      native: 'Native'
    }
  },
  ...$vuetify
} as TranslationKeys
