"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RotateCcw,
  Star,
  User,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  SearchX,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
} from "lucide-react";

type Course = {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: string;
  price: number;
  teacherName: string;
  teacherRating: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const grades = [
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
];

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
  "Geography",
  "Economics",
  "Languages",
];

export default function CourseSearch() {
  const sectionRef = useRef<HTMLElement>(null);

  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("created_desc");

  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

 const [loading, setLoading] = useState(true);
const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

 async function fetchCourses(
  currentPage = page,
  isInitialLoad = false
) {
  try {
    if (isInitialLoad) {
      setLoading(true);
    } else {
      setPageLoading(true);
    }

    setError("");

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (grade) {
      params.set("grade", grade);
    }

    if (subject) {
      params.set("subject", subject);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    if (minRating) {
      params.set("minRating", minRating);
    }

    if (sort) {
      params.set("sort", sort);
    }

    params.set("page", String(currentPage));
    params.set("limit", "6");

    const response = await fetch(
      `/api/courses?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();

    setCourses(data.courses);
    setPagination(data.pagination);

  } catch {
    setError("Unable to load courses. Please try again.");

  } finally {
    if (isInitialLoad) {
      setLoading(false);
    } else {
      setPageLoading(false);
    }
  }
}

  useEffect(() => {
  fetchCourses(1, true);
}, [grade, subject, minPrice, maxPrice, minRating, sort]);

  function handleSearch() {
    setPage(1);
    fetchCourses(1);
  }

  function clearFilters() {
    setSearch("");
    setGrade("");
    setSubject("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setSort("created_desc");
    setPage(1);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    fetchCourses(newPage);

    
  }

  // Animation variants
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section  className="mt-10 scroll-mt-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Find the right course
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Search and filter courses based on your child's learning needs.
        </p>
      </div>

      {/* Search & Filters Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-indigo-100/50 space-y-5"
      >
        {/* Search Input & Button */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1 group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search by course name or subject..."
              className="w-full rounded-2xl border border-slate-200 bg-white/70 py-3 pl-11 pr-4 text-base sm:text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:opacity-95"
          >
            <Search size={16} />
            <span>Search</span>
          </motion.button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
          >
            <option value="">All grades</option>
            {grades.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
          >
            <option value="">All subjects</option>
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            placeholder="Min price (₹)"
            className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
          />

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            placeholder="Max price (₹)"
            className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
          />

          <select
            value={minRating}
            onChange={(e) => {
              setMinRating(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5+ ★</option>
            <option value="4">4.0+ ★</option>
            <option value="3.5">3.5+ ★</option>
          </select>
        </div>

        {/* Filter Controls Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Clear all filters</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-slate-400" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300"
            >
              <option value="created_desc">Sort by: Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Highest Rated</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Results Counter Header */}
      {!loading && !error && pagination && (
        <div className="mt-8 flex items-center justify-between px-1">
          <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <span>
              <strong className="text-slate-900">{pagination.total}</strong>{" "}
              {pagination.total === 1 ? "course" : "courses"} found
            </span>
          </p>

          {pagination.totalPages > 1 && (
            <p className="text-xs font-semibold text-slate-400">
              Page {pagination.page} of {pagination.totalPages}
            </p>
          )}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-3xl border border-slate-200/60 bg-white/60 p-6 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-20 rounded-full bg-slate-200" />
                  <div className="h-5 w-16 rounded-full bg-slate-200" />
                </div>
                <div className="h-6 w-3/4 rounded-lg bg-slate-200 mt-4" />
                <div className="h-4 w-full rounded bg-slate-150" />
                <div className="h-4 w-2/3 rounded bg-slate-150" />
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-4 w-12 rounded bg-slate-200" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 w-16 rounded bg-slate-200" />
                  <div className="h-9 w-28 rounded-xl bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl border border-red-200 bg-red-50/80 backdrop-blur-md p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3">
            <AlertCircle size={24} />
          </div>
          <p className="font-semibold text-red-900">{error}</p>
          <button
            onClick={() => fetchCourses(page)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
          >
            <RotateCcw size={16} />
            Try again
          </button>
        </motion.div>
      )}

      {/* No Results Empty State */}
      {!loading && !error && courses.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl px-6 py-16 text-center shadow-lg shadow-slate-100"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 mb-4 ring-8 ring-indigo-50/50">
            <SearchX size={32} />
          </div>

          <h3 className="text-xl font-bold text-slate-900">No courses found</h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 leading-relaxed">
            We couldn't find courses matching your current search and filters.
            Try adjusting your criteria.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
          >
            <RotateCcw size={16} />
            <span>Clear filters</span>
          </motion.button>
        </motion.div>
      )}

      {/* Course Cards Grid */}
      {!loading && !error && courses.length > 0 && (
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course) => (
            <motion.article
              key={course.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-md shadow-slate-100/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/60 hover:border-indigo-200/80"
            >
              {/* Header Accent Bar */}
              <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />

              <div className="flex flex-1 flex-col p-6">
                {/* Badges */}
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200/50">
                    <BookOpen size={12} />
                    {course.subject}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {course.grade}
                  </span>
                </div>

                {/* Course Title & Description */}
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {course.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                  {course.description}
                </p>

                {/* Teacher Info & Rating */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs ring-1 ring-indigo-100">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Instructor
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {course.teacherName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Rating
                    </p>
                    <div className="flex items-center justify-end gap-1 text-amber-500 mt-0.5">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-800">
                        {course.teacherRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-5 flex items-center justify-between pt-2">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Course fee
                    </p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white"
                  >
                    <span>View course</span>
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Modern Pagination */}
      {!loading && !error && pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center gap-1.5">
            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <motion.button
                key={pageNumber}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(pageNumber)}
                className={`h-9 w-9 rounded-xl text-xs font-extrabold transition-all ${
                  pageNumber === page
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={page === pagination.totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </motion.button>
        </div>
      )}
    </section>
  );
}