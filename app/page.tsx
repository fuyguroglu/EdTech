import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Target, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Master High School Subjects with
              <span className="text-indigo-600"> Expert Instructors</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Subscribe to personalized courses taught by passionate educators.
              Interactive lessons, AI-powered assistance, and flexible learning at your pace.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/instructors">Become an Instructor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EdTech?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-lg">Interactive Content</h3>
              <p className="text-gray-600 text-sm">
                Engaging lessons with videos, quizzes, and hands-on activities
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">
                Learn from passionate educators who know their subjects
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg">Track Progress</h3>
              <p className="text-gray-600 text-sm">
                Monitor your learning journey with detailed analytics
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Smart assistance for both instructors and students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students improving their grades with personalized instruction
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
