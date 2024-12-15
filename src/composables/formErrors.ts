import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErros<Type> = {
  [Property in keyof Type]: string[]
}

export const useFormErros = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErros<LoginForm>>()

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials'
        ? 'Incorrect email or password'
        : error?.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import(
      '@/utils/formValidations'
    )

    const emailErros = validateEmail(formData.email)
    if (emailErros.length) realtimeErrors.value.email = emailErros

    const passwordErros = validatePassword(formData.password)
    if (passwordErros.length) realtimeErrors.value.password = passwordErros
  }

  return { serverError, handleServerError, realtimeErrors, handleLoginForm }
}
