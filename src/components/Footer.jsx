import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="flex items-center w-full ">
      <div className="w-full p-4 md:px-12">
        <div className="flex flex-col items-center justify-between w-full gap-2 md:flex-row">
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
          <p className="text-xs">© 2025 DevPortfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
