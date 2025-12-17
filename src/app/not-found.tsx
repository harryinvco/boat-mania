import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-slate-200 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🚤</span>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Lost at Sea?
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          The page you are looking for seems to have sailed away. Let us get you back on course.
        </p>

        <Link
          href="/en"
          className="inline-flex items-center justify-center px-6 py-3 bg-turquoise-500 text-white font-semibold rounded-lg hover:bg-turquoise-600 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  )
}
