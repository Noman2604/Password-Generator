
import PasswordGenerator from '@/components/passwordGen'


export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-200 flex-col items-center justify-center p-24">
      <PasswordGenerator/>
    </main>
  )
}