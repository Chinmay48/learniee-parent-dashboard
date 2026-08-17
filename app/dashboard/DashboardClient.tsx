"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  Sparkles, 
  User, 
  GraduationCap, 
  Compass 
} from "lucide-react";
import LogoutButton from "@/app/components/LogoutButton";
import CourseSearch from "@/app/components/CourseSearch";

interface DashboardClientProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const firstName = session.user?.name?.split(" ")[0] || "Parent";

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          {/* Logo & Portal Info */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-md shadow-indigo-200"
            >
              <BookOpen size={20} strokeWidth={2.5} />
            </motion.div>

            <div>
              <p className="font-extrabold tracking-tight text-slate-900">Learniee</p>
              <p className="text-xs font-medium text-slate-500">Parent Portal</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-3 border-r border-slate-200 pr-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 ring-2 ring-indigo-100">
                <User size={18} />
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {session.user?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {session.user?.email}
                </p>
              </div>
            </div>

            <LogoutButton />
          </div>
        </div>
      </motion.header>

      {/* Main Dashboard Body */}
      <motion.section 
        className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Hero Card */}
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-6 sm:p-10 text-white shadow-xl shadow-indigo-200/50"
        >
          {/* Animated Ambient Light Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], x: [0, 15, 0], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-64 h-64 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-20%] left-[-10%] w-64 h-64 sm:w-80 sm:h-80 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-indigo-100 backdrop-blur-md mb-4 border border-white/15">
              <Sparkles size={14} className="text-amber-300" />
              <span>Parent Dashboard</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {firstName} 👋
            </h1>

            <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
              Discover courses, compare teachers and find the right learning
              experience for your child.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm border border-white/10">
                <GraduationCap size={16} className="text-indigo-200" />
                <span>Top Rated Instructors</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm border border-white/10">
                <Compass size={16} className="text-purple-200" />
                <span>Personalized Pathways</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Search Section */}
        <motion.div variants={itemVariants}>
          <CourseSearch />
        </motion.div>
      </motion.section>
    </div>
  );
}