'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface User {
  name: string;
  role: 'lecturer' | 'student' | string;
}

export default function LecturerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else router.push('/');

    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) setProfilePreview(savedProfileImage);
  }, [router]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('user');
      router.push('/');
    }, 800);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUploadProfile = () => {
    if (!profileImage) return alert('Please select an image first!');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('profileImage', base64String);
      setProfilePreview(base64String);
      alert(`Profile image "${profileImage.name}" uploaded successfully!`);
      setProfileImage(null);
    };
    reader.readAsDataURL(profileImage);
  };

  if (loggingOut) return <Loading message="Logging out..." />;
  if (!user) return <Loading message="Loading..." />;
  if (user.role !== 'lecturer') return <AccessDenied message="You do not have access to the lecturer dashboard." />;

  const cards = [
    { href: '/lecturer/courses', title: 'Create / Update Course Content', desc: 'Add or update course materials for your students.', icon: '📚', gradient: 'from-blue-500 to-blue-600' },
    { href: '/lecturer/assignments/create', title: 'Create Assignment', desc: 'Design and assign new assignments to students.', icon: '📝', gradient: 'from-green-500 to-green-600' },
    { href: '/lecturer/announcements', title: 'Post Announcement', desc: 'Notify students about updates, events, or reminders.', icon: '📢', gradient: 'from-yellow-400 to-yellow-500' },
    { href: '/lecturer/submissions', title: 'Review Submissions', desc: 'Check student submissions and provide feedback.', icon: '📂', gradient: 'from-purple-500 to-purple-600' },
    { href: '/lecturer/grades', title: 'Grade & Publish Feedback', desc: 'Assign grades and publish feedback for completed assignments.', icon: '🏆', gradient: 'from-red-500 to-red-600' },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.main className="min-h-screen bg-gray-900 text-gray-100 px-6 sm:px-10 lg:px-20 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header className="flex flex-col sm:flex-row justify-between items-center py-6"
        variants={itemVariants}
      >
        <motion.h1 className="text-3xl font-bold tracking-tight" variants={itemVariants}>
          Lecturer Dashboard
        </motion.h1>
        <motion.button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          Logout
        </motion.button>
      </motion.header>

      {/* Welcome */}
      <motion.section className="mt-10 text-center" variants={itemVariants}>
        <motion.h2 className="text-2xl sm:text-3xl font-semibold" variants={itemVariants}>
          Welcome To Cuz E-Learning: <span className="text-blue-400">{user.name}</span>
        </motion.h2>
        <motion.p className="text-gray-400 mt-2" variants={itemVariants}>Here’s what you can manage today</motion.p>
      </motion.section>

      {/* Dashboard Grid */}
      <motion.section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
        {/* Left Column */}
        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          {cards.filter(c => ['Post Announcement', 'Review Submissions', 'Grade & Publish Feedback'].includes(c.title)).map(card => (
            <DashboardCard key={card.href} {...card} />
          ))}
        </motion.div>

        {/* Middle Column */}
        <motion.div className="flex flex-col gap-8" variants={containerVariants}>
          {cards.filter(c => !['Post Announcement', 'Review Submissions', 'Grade & Publish Feedback'].includes(c.title)).map(card => (
            <DashboardCard key={card.href} {...card} />
          ))}
        </motion.div>

        {/* Right Column */}
        <motion.div className="hidden md:flex bg-gray-800 p-9 rounded-4xl shadow-lg flex-col items-center gap-6 justify-center" variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <motion.div className="w-60 h-60 overflow-hidden rounded-full shadow-xl flex items-center justify-center bg-gray-700 text-gray-400 text-9xl" variants={itemVariants}>
            {profilePreview ? <img src={profilePreview} alt="Profile" className="w-full h-full object-cover rounded-full" /> :
             profileImage ? <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="w-full h-full object-cover rounded-full" /> : '👤'}
          </motion.div>
          <motion.input
            type="file"
            accept="image/*"
            onChange={handleProfileChange}
            className="w-full text-sm text-gray-300 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-full file:border-0 file:cursor-pointer hover:file:bg-blue-600"
            variants={itemVariants}
          />
          <motion.button
            onClick={handleUploadProfile}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            Upload Profile Picture
          </motion.button>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}

function DashboardCard({ href, title, desc, icon, gradient }: { href: string; title: string; desc: string; icon: string; gradient: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.03 }} className="transition-all">
      <Link href={href} className={`group block bg-gradient-to-r ${gradient} rounded-3xl shadow-lg p-6 transform transition hover:scale-105 hover:shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-14 w-14 flex items-center justify-center bg-white/20 rounded-full text-3xl">{icon}</div>
          <span className="text-sm text-white/90 group-hover:text-white transition">Go →</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/90">{desc}</p>
      </Link>
    </motion.div>
  );
}

function Loading({ message }: { message: string }) {
  return (
    <motion.main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="animate-pulse">{message}</p>
    </motion.main>
  );
}

function AccessDenied({ message }: { message: string }) {
  return (
    <motion.main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <p className="text-xl font-semibold mb-4">❌ Access Denied</p>
        <p className="text-gray-300">{message}</p>
      </div>
    </motion.main>
  );
}
