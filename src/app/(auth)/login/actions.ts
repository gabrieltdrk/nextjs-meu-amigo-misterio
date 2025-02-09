'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export type LoginState = {
    success: null | boolean
    message?: string
} 

export async function login(previousState: LoginState, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/confirm`
    }
  })

  if (error) {
    return {
      success: false,
      message: error.message
    }
  }

  return {
    success: true,
    message: "E-mail enviado!"
  }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (!error)
    redirect("/login")
}