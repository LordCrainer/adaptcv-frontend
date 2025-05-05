interface TranslationKeys {
  website: {
    title: string
    description: string
    keywords: string
    welcome: string
  }
  common: {
    home: string
    about: string
    services: string
    contact: string
    testimonials: string
    blog: string
    portfolio: string
    privacyPolicy: string
    termsOfService: string
    email: string
    noData: string
    startDate: string
    endDate: string
  }
  actions: {
    add: string
    edit: string
    delete: string
    save: string
    cancel: string
    submit: string
    options: string
    upload: string
    uploadImage: string
    saveImage: string
    next: string
    previous: string
    continue: string
    finish: string
    back: string
    register: string
    signIn: string
    signOut: string
    forgotPassword: string
    publish: string
    preview: string
  }
  baseEntity: {
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
    deletedAt: string
  }
  builder: {
    id: string
    sections: string
    title: string
    name: string
    description: string
    status: string
    template: string
  }
  profile: {
    personalInfo: {
      title: string
      fullname: string
      areaProfession: string
      areaProfessionPlaceholder: string
      professionPlaceholder: string
      profession: string
      email: string
      phone: string
      address: string
      city: string
      country: string
      builder: string
      aboutMe: string
      uploadPhoto: string
    }
    aboutMe: {
      title: string
      summary: string
      slogan: string
      logo: string
      uploadLogo: string
    }
    experience: {
      title: string
      jobTitle: string
      company: string
      position: string
      description: string
    }
    education: {
      title: string
      degree: string
      degreePlaceholder: string
      institution: string
      fieldOfStudy: string
      startDate: string
      endDate: string
      secondary: string
      highSchool: string
      technical: string
      undergraduate: string
      graduate: string
      masters: string
      doctorate: string
    }
    skills: {
      title: string
      skill: string
      job: string
      yearsOfExperience: string
      less1year: string
      '1to2years': string
      '2to3years': string
      '5to10years': string
      '10plusyears': string,
      placeholderSkill: string
    }
    languages: {
      title: string
      language: string
      level: string
      beginner: string
      intermediate: string
      advanced: string
      native: string
      placeholderLanguage: string
    }
  }
  login: {
    password: string
    title: string
    forgotPassword: string
    rememberMe: string
    signUp: string
    signIn: string
    signInWithGoogle: string
    dontHaveAccount: string
  }
  registration: {
    username: string
    password: string
    confirmPassword: string
    signUp: string
  }
  routes: {
    home: string
    builder: string
    templates: string
    settings: string
    profile: string
    dashboard: string
    logout: string
  }
}
