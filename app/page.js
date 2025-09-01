"use client"
import { useState, useEffect } from "react";
import { 
  School, 
  Plus, 
  Eye, 
  Users, 
  BookOpen, 
  Award, 
  ArrowRight,
  Sparkles,
  Building2,
  GraduationCap
} from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats] = useState({
    totalSchools: 156,
    totalStudents: 45280,
    totalTeachers: 2847,
    achievements: 98
  });

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const features = [
    {
      icon: Plus,
      title: "Add Schools",
      description: "Register new educational institutions with comprehensive details and media",
      color: "from-blue-500 to-cyan-500",
      href: "/add-school"
    },
    {
      icon: Eye,
      title: "View Schools",
      description: "Browse and explore all registered schools with detailed information",
      color: "from-purple-500 to-pink-500",
      href: "/show-schools"
    }
  ];

  const statsData = [
    { icon: Building2, label: "Schools", value: stats.totalSchools, color: "text-blue-600" },
    { icon: Users, label: "Students", value: stats.totalStudents.toLocaleString(), color: "text-green-600" },
    { icon: GraduationCap, label: "Teachers", value: stats.totalTeachers.toLocaleString(), color: "text-purple-600" },
    { icon: Award, label: "Achievements", value: stats.achievements, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>

          <div className="mx-auto mb-8 relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <School className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-800" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Welcome to
            <br />
            <span className="text-5xl md:text-7xl">School Management</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive platform for managing educational institutions, 
            tracking progress, and building the future of learning
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
            {statsData.map((stat, index) => (
              <div 
                key={stat.label}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {features.map((feature, index) => (
            <a
              key={feature.title}
              href={feature.href}
              className="group relative flex-1 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors duration-300">
                  <span className="text-sm font-semibold mr-2">Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                   style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>
            </a>
          ))}
        </div>

        <div className={`mt-16 text-center transform transition-all duration-1000 delay-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-gray-500 mb-4">
            Ready to revolutionize education management?
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Let&apos;s get started</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-2000"></div>
      <div className="absolute bottom-32 left-16 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-1500"></div>
      <div className="absolute bottom-20 right-10 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-500"></div>
    </div>
  );
}
