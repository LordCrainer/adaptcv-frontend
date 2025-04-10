import { es as $vuetify } from 'vuetify/locale'

export default {
  actions: {
    add: 'Agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    submit: 'Enviar',
    options: 'Opciones'
  },
  common: {
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    contact: 'Contacto',
    testimonials: 'Testimonios',
    blog: 'Blog',
    portfolio: 'Portafolio',
    privacyPolicy: 'Política de privacidad',
    termsOfService: 'Términos de servicio',
    email: 'Correo electrónico',
    noData: 'No hay datos disponibles'
  },
  login: {
    password: 'contraseña',
    login: 'Iniciar sesión',
    forgotPassword: '¿Olvidaste tu contraseña?',
    rememberMe: 'Recuérdame',
    signUp: 'Regístrate',
    signIn: 'Iniciar sesión'
  },
  registration: {
    username: 'Nombre de usuario',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    signUp: 'Regístrate'
  },
  profile: {
    personalInfo: {
      title: 'Información personal',
      fullname: 'Nombre completo',
      areaProfession: 'Área de profesión',
      profession: 'Profesión',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      summary: 'Resumen',
      city: 'Ciudad',
      country: 'País',
      fillInformation: 'Rellena la información',
      aboutMe: 'Acerca de mí'
    },
    experience: {
      title: 'Experiencia',
      jobTitle: 'Título del trabajo',
      company: 'Compañía',
      position: 'Posición',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de finalización',
      description: 'Descripción'
    },
    education: {
      title: 'Educación',
      fieldOfStudy: 'Campo de estudio',
      degree: 'Título',
      institution: 'Institución',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de finalización',
      secondary: 'Secundaria',
      highSchool: 'Escuela secundaria',
      technical: 'Técnica',
      undergraduate: 'Licenciatura',
      graduate: 'Posgrado',
      masters: 'Maestría',
      doctorate: 'Doctorado'
    },
    skills: {
      title: 'Habilidades',
      skill: 'Habilidad',
      less1year: 'Menos de 1 año',
      '1to2years': '1 a 2 años',
      '2to3years': '2 a 3 años',
      '5to10years': '5 a 10 años',
      '10plusyears': 'Más de 10 años',
      job: 'Trabajo',
      yearsOfExperience: 'Años de experiencia'
    },
    languages: {
      title: 'Idiomas',
      language: 'Idioma',
      level: 'Nivel',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      native: 'Nativo'
    }
  },
  ...$vuetify
} as TranslationKeys
