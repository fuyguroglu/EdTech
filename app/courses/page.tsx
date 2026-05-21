import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Star } from "lucide-react";

const courses = [
  {
    id: "physics-electromagnetic-induction",
    title: "A-Level Electromagnetic Induction Mastery",
    description: "Master one of A-Level Physics' most challenging topics with visual explanations, animations, and practice problems. Learn Faraday's Law, Lenz's Law, AC generators, and transformers.",
    category: "Physics",
    difficulty: "Advanced",
    instructor: "Dr. Sarah Mitchell",
    instructorTitle: "PhD Physics, 15 years teaching experience",
    price: 29.99,
    studentsEnrolled: 342,
    rating: 4.8,
    totalLessons: 24,
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80",
    highlights: [
      "Animated field visualizations",
      "Step-by-step problem solving",
      "Past paper practice",
      "Interactive quizzes"
    ]
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore courses designed to tackle A-Level's most challenging topics with visual learning and expert instruction.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="default">All Subjects</Badge>
            <Badge variant="outline">Physics</Badge>
            <Badge variant="outline">Chemistry</Badge>
            <Badge variant="outline">Mathematics</Badge>
            <Badge variant="outline">Biology</Badge>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-gray-900">{course.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">{course.difficulty}</Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/60" />
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="space-y-3">
                  {/* Instructor */}
                  <div>
                    <p className="font-semibold text-sm">{course.instructor}</p>
                    <p className="text-xs text-gray-500">{course.instructorTitle}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.studentsEnrolled}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2">
                    <ul className="space-y-1">
                      {course.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-2xl font-bold text-indigo-600">
                    £{course.price}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/courses/${course.id}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-dashed border-indigo-200 rounded-lg p-12">
            <h3 className="text-2xl font-semibold mb-2">More Courses Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              Chemistry, Mathematics, and Biology courses in development
            </p>
            <Button variant="outline" asChild>
              <Link href="/instructors">Become an Instructor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
