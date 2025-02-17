import { Gift, Users, MailPlus } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-orange-50 flex flex-col">
      <main className="flex flex-col container m-auto px-4 py-8 justify-center">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-700 mb-6">Meu Amigo Mistério - Celebre a amizade com surpresas!</h2>
          <p className="text-xl text-orange-600 mb-8">Organize seu amigo secreto de forma fácil e divertida.</p>
          <LoginForm />
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-50">
            <Gift className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Crie seu grupo</h3>
            <p className="text-orange-600">Convide amigos e familiares para participar do seu amigo secreto.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-50">
            <Users className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Sorteio automático</h3>
            <p className="text-orange-600">Nosso sistema faz o sorteio de forma aleatória e sigilosa.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-gray-50">
            <MailPlus className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-orange-700 mb-2">Receba em seu e-mail</h3>
            <p className="text-orange-600">Você receberá o seu convite em sua caixa de e-mail.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

