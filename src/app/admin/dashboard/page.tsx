'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

/* ==========================
   Framer Motion Variants
========================== */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
};

const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    backgroundColor: '#4B5563',
    transition: { type: 'spring', stiffness: 300 },
  },
  tap: { scale: 0.95 },
};

/* ==========================
   StatCard Component
========================== */
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, subtitle, value }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.03 }}
    className="bg-gray-800 hover:bg-gray-700 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 w-full transition text-gray-100"
  >
    <div className="flex-shrink-0 p-3 bg-gray-700 rounded-full">{icon}</div>
    <div className="text-center sm:text-left">
      <p className="text-sm uppercase tracking-wide text-gray-400">{subtitle}</p>
      <h2 className="text-2xl sm:text-3xl font-extrabold">{value}</h2>
      <p className="text-gray-300 mt-1">{title}</p>
    </div>
  </motion.div>
);

/* ==========================
   ActionCard Component
========================== */
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, subtitle, href }) => {
  const content = (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 hover:bg-gray-700 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-start gap-3 w-full transition text-gray-100"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-shrink-0">{icon}</div>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{subtitle}</p>
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

/* ==========================
   AdminDashboard Component
========================== */
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAssignments: 0,
    pendingGrading: 0,
    activeUsers: 0,
  });

  const router = useRouter();

  useEffect(() => {
    // Mock fetch stats (replace with real API call)
    setStats({
      totalAssignments: 256,
      pendingGrading: 42,
      activeUsers: 134,
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 px-2 sm:px-4 md:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-md text-gray-400 mt-1">
            Manage the platform, view stats, and generate reports
          </p>
        </div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-gray-600 transition text-sm sm:text-base"
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5" /> Logout
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <StatCard
          icon={<CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-400" />}
          title="Total Assignments"
          subtitle="Assignments"
          value={stats.totalAssignments}
        />
        <StatCard
          icon={<AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-orange-400" />}
          title="Pending Grading"
          subtitle="Pending"
          value={stats.pendingGrading}
        />
        <StatCard
          icon={<UserPlus className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />}
          title="Active Users"
          subtitle="Users"
          value={stats.activeUsers}
        />
      </motion.section>

      {/* Action Cards */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <ActionCard
          icon={<BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-400" />}
          title="Review Dashboard"
          subtitle="View system statistics, assignments, and grading trends."
          href="/admin/review"
        />
        <ActionCard
          icon={<FileText className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />}
          title="Generate Reports"
          subtitle="Export data on assignments, grades and system usage."
          href="/admin/reports"
        />
        <ActionCard
          icon={<Users className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />}
          title="Manage Users"
          subtitle="Add, edit, or remove students and lecturers."
          href="/admin/users"
        />
        {/* New Add Lectures Card */}
        <ActionCard
          icon={<UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-teal-400" />}
          title="Add Lectures"
          subtitle="Add new lecturers to the system through the admin dashboard."
          href="/admin/add-lecturers"
        />
      </motion.section>

      {/* Settings */}
      <motion.section
        className="w-full max-w-full sm:max-w-md mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <ActionCard
          icon={<Settings className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400" />}
          title="Settings"
          subtitle="Configure system preferences and admin options."
          href="/admin/settings"
        />
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="text-center text-gray-500 text-sm mt-8 px-2 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} Cavendish University Zambia
      </motion.footer>
    </div>
  );
}
