import { es as $vuetify } from 'vuetify/locale'

const profile: TranslationKeys['profile'] = {
  personalInfo: {
    title: 'Información personal',
    fullname: 'Nombre completo',
    areaProfession: 'Área de profesión',
    profession: 'Profesión',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    country: 'País',
    fillInformation: 'Rellena la información',
    aboutMe: 'Acerca de mí',
    uploadPhoto: 'Subir foto'
  },
  aboutMe: {
    title: 'Acerca de mí',
    summary: 'Resumen',
    slogan: 'Eslogan',
    logo: 'Logo',
    uploadLogo: 'Subir logo'
  },
  experience: {
    title: 'Experiencia',
    jobTitle: 'Título del trabajo',
    company: 'Compañía',
    position: 'Posición',
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
}

export default defineI18nLocale(async () => {
  return {
    actions: {
      add: 'Agregar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      submit: 'Enviar',
      options: 'Opciones',
      upload: 'Subir',
      uploadImage: 'Subir imagen',
      saveImage: 'Guardar imagen',
      back: 'Volver',
      next: 'Siguiente',
      previous: 'Anterior',
      continue: 'Continuar',
      finish: 'Finalizar',
      register: 'Registrar',
      signIn: 'Iniciar sesión',
      signOut: 'Cerrar sesión',
      forgotPassword: 'Olvidé mi contraseña?',
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
      noData: 'No hay datos disponibles',
      startDate: 'Fecha de inicio',
      endDate: 'Fecha de finalización'
    },
    login: {
      password: 'contraseña',
      title: 'Iniciar sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      rememberMe: 'Recuérdame',
      signUp: 'Regístrate',
      signIn: 'Iniciar sesión',
      dontHaveAccount: '¿No tienes una cuenta?',
      signInWithGoogle: 'Iniciar sesión con Google',
    },
    registration: {
      username: 'Nombre de usuario',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      signUp: 'Regístrate'
    },
    routes: {
      fillInformation: 'Rellenar información',
      preview: 'Vista previa',
      templates: 'Plantillas',
      settings: 'Configuraciones',
      profile: 'Perfil',
      dashboard: 'Tablero',
      logout: 'Cerrar sesión'
    },
    profile: profile,
    $vuetify: $vuetify
  } as TranslationKeys
})
