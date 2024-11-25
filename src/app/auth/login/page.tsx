import ClientLayout from '@/components/ClientLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-center text-3xl font-bold">Sign in</h2>
          <LoginForm />
        </div>
      </div>
    </ClientLayout>
  )
}
