'use client'

import { NavMenu } from '@/components/nav-menu'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavMenu />
      <div className="container mx-auto px-4 pt-24 pb-12 relative">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-[15rem] font-bold text-red-600 leading-none select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
            <h2 className="text-2xl font-bold uppercase">Error Page</h2>
            <p className="text-lg">Sorry, we couldn't find this page</p>
            <Link href="/">
              <Button 
                variant="outline" 
                className="mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              >
                Go Back
              </Button>
            </Link>
          </div>
          <p className="text-xl mt-32">
            The page you are looking for doesn't exist or an other error occurred.
          </p>
        </div>
      </div>
    </div>
  )
}
