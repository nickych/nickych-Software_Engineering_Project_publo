"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import {
  Users,
  GraduationCap,
  BookOpen,
  Database,
  Activity,
  ClipboardList,
  LogOut,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
  ShieldCheck,
  KeyRound,
  Megaphone,
} from "lucide-react";



const containerVariants: Variants = {

  hidden:{
    opacity:0
  },

  show:{
    opacity:1,
    transition:{
      staggerChildren:0.15
    }
  }

};



const cardVariants: Variants = {

  hidden:{
    opacity:0,
    y:20
  },

  show:{
    opacity:1,
    y:0
  }

};





interface StatCardProps {

  title:string;

  value:number|string;

  icon:React.ReactNode;

}




function StatCard({
 title,
 value,
 icon
}:StatCardProps){


return (

<motion.div

variants={cardVariants}

className="
bg-gray-800
border
border-gray-700
rounded-2xl
p-5
shadow-xl
flex
items-center
gap-4
"

>


<div className="
bg-gray-900
p-3
rounded-xl
">

{icon}

</div>



<div>

<p className="
text-gray-400
text-sm
">

{title}

</p>


<h2 className="
text-3xl
font-bold
text-white
">

{value}

</h2>


</div>



</motion.div>


);

}







interface AdminCardProps {

title:string;

description:string;

href:string;

icon:React.ReactNode;

}




function AdminCard({

title,

description,

href,

icon

}:AdminCardProps){



return (

<Link href={href}>


<motion.div

variants={cardVariants}

whileHover={{
scale:1.03
}}

className="
bg-gray-800
border
border-gray-700
rounded-2xl
p-6
shadow-xl
cursor-pointer
hover:bg-gray-700
transition
"


>


<div className="
flex
items-center
gap-4
mb-4
">


<div className="
bg-gray-900
p-3
rounded-xl
">

{icon}

</div>


<h2 className="
font-bold
text-xl
">

{title}

</h2>


</div>



<p className="
text-gray-400
text-sm
">

{description}

</p>


</motion.div>


</Link>


);


}









export default function AdminDashboard(){


const router = useRouter();



const [loading,setLoading]=useState(true);



const [stats,setStats]=useState({

students:0,

lecturers:0,

modules:0,

results:0,

activeUsers:0,

assignments:0

});







useEffect(()=>{


async function loadStats(){


try{


const res = await fetch(
"/api/admin/stats"
);



const data = await res.json();



if(res.ok){


setStats({

students:data.students ?? 0,

lecturers:data.lecturers ?? 0,

modules:data.modules ?? 0,

results:data.results ?? 0,

activeUsers:data.activeUsers ?? 0,

assignments:data.assignments ?? 0

});


}


}

catch(error){

console.log(
"ADMIN STATS ERROR",
error
);

}

finally{

setLoading(false);

}


}



loadStats();



},[]);







function logout(){


localStorage.removeItem("user");

router.push("/login");


}









return (


<main className="
min-h-screen
bg-gray-950
text-white
px-4
sm:px-8
py-8
">





{/* HEADER */}


<motion.div

initial={{
opacity:0,
y:-30
}}

animate={{
opacity:1,
y:0
}}

className="
flex
flex-col
md:flex-row
justify-between
gap-5
mb-10
"

>


<div>


<h1 className="
text-3xl
sm:text-4xl
font-bold
">

System Administrator Dashboard

</h1>


<p className="
text-gray-400
mt-2
">

Manage Cavendish University E-learning Platform

</p>


</div>





<button

onClick={logout}

className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
px-5
py-3
rounded-xl
"

>


<LogOut size={20}/>

Logout


</button>



</motion.div>










{/* STATISTICS */}


<motion.section

variants={containerVariants}

initial="hidden"

animate="show"

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-5
mb-10
"

>



<StatCard

title="Students"

value={
loading ? "..." : stats.students
}

icon={
<GraduationCap className="text-blue-400"/>
}

/>



<StatCard

title="Lecturers"

value={
loading ? "..." : stats.lecturers
}

icon={
<Users className="text-green-400"/>
}

/>



<StatCard

title="Modules"

value={
loading ? "..." : stats.modules
}

icon={
<BookOpen className="text-purple-400"/>
}

/>



<StatCard

title="Results"

value={
loading ? "..." : stats.results
}

icon={
<Database className="text-yellow-400"/>
}

/>



<StatCard

title="Active Users"

value={
loading ? "..." : stats.activeUsers
}

icon={
<Activity className="text-cyan-400"/>
}

/>



<StatCard

title="Assignments"

value={
loading ? "..." : stats.assignments
}

icon={
<ClipboardList className="text-orange-400"/>
}

/>



</motion.section>









<h2 className="
text-2xl
font-bold
mb-5
">

Management

</h2>




<motion.section

variants={containerVariants}

initial="hidden"

animate="show"

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
"

>



<AdminCard

title="Manage Lecturers"

description="Add lecturers and manage lecturer accounts."

href="/admin/lecturers"

icon={
<UserPlus className="text-green-400"/>
}

/>



<AdminCard

title="Manage Students"

description="View students and reset passwords."

href="/admin/students"

icon={
<Users className="text-blue-400"/>
}

/>



<AdminCard

title="Manage Modules"

description="Create and manage academic modules."

href="/admin/modules"

icon={
<BookOpen className="text-purple-400"/>
}

/>



<AdminCard

title="Results Monitoring"

description="Monitor uploaded student results."

href="/admin/results"

icon={
<FileText className="text-yellow-400"/>
}

/>



<AdminCard

title="Reports"

description="Generate system reports."

href="/admin/reports"

icon={
<BarChart3 className="text-indigo-400"/>
}

/>



<AdminCard

title="Announcements"

description="Manage system announcements."

href="/admin/announcements"

icon={
<Megaphone className="text-pink-400"/>
}

/>



<AdminCard

title="Password Reset"

description="Reset user passwords."

href="/admin/passwords"

icon={
<KeyRound className="text-red-400"/>
}

/>



<AdminCard

title="Security"

description="Manage security settings."

href="/admin/security"

icon={
<ShieldCheck className="text-green-400"/>
}

/>



<AdminCard

title="Settings"

description="Configure platform settings."

href="/admin/settings"

icon={
<Settings className="text-gray-300"/>
}

/>



</motion.section>








<footer className="
text-center
text-gray-500
mt-12
">

© {new Date().getFullYear()} Cavendish University Zambia E-Learning System

</footer>



</main>


);


}