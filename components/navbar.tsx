import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">EdTech</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Courses
            </Link>
            <Link href="/instructors" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Instructors
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
