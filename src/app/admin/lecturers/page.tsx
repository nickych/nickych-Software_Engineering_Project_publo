"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Trash2,
  Search,
  GraduationCap,
} from "lucide-react";



interface Lecturer {

  id:number;

  name:string;

  email:string;

  department?:string;

}




export default function ManageLecturers(){


const [lecturers,setLecturers]=useState<Lecturer[]>([]);


const [loading,setLoading]=useState(true);


const [search,setSearch]=useState("");



const [form,setForm]=useState({

name:"",

email:"",

password:"",

department:""

});







useEffect(()=>{


loadLecturers();


},[]);







async function loadLecturers(){


try{


const res = await fetch(
"/api/admin/lecturers"
);


const data = await res.json();


setLecturers(data);



}
catch(error){


console.log(error);


}
finally{

setLoading(false);

}


}









async function addLecturer(){


if(
!form.name ||
!form.email ||
!form.password
){


alert(
"Please fill required fields"
);


return;

}





const res = await fetch(

"/api/admin/lecturers",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);




const data = await res.json();



alert(data.message);



if(res.ok){


setForm({

name:"",

email:"",

password:"",

department:""

});


loadLecturers();


}



}









async function deleteLecturer(id:number){



const confirmDelete =
confirm(
"Delete this lecturer?"
);



if(!confirmDelete)
return;





await fetch(

`/api/admin/lecturers?id=${id}`,

{

method:"DELETE"

}

);




loadLecturers();



}









const filteredLecturers =
lecturers.filter((item)=>

item.name
.toLowerCase()
.includes(
search.toLowerCase()
)

||
item.email
.toLowerCase()
.includes(
search.toLowerCase()
)

);








return (


<div className="
min-h-screen
bg-gray-950
text-white
p-6
sm:p-10
">





<h1 className="
text-3xl
sm:text-4xl
font-bold
mb-2
">

Manage Lecturers

</h1>



<p className="
text-gray-400
mb-8
">

Add and manage lecturer accounts

</p>










{/* ADD FORM */}



<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
bg-gray-900
border
border-gray-800
rounded-2xl
p-6
mb-8
shadow-xl
"

>


<div className="
flex
items-center
gap-3
mb-5
">


<UserPlus className="text-green-400"/>


<h2 className="
text-xl
font-bold
">

Add Lecturer

</h2>


</div>







<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">



<input

placeholder="Full Name"

className="
bg-gray-800
p-3
rounded-xl
outline-none
"

value={form.name}

onChange={(e)=>

setForm({
...form,
name:e.target.value
})

}

/>





<input

placeholder="Email"

className="
bg-gray-800
p-3
rounded-xl
outline-none
"

value={form.email}

onChange={(e)=>

setForm({
...form,
email:e.target.value
})

}

/>






<input

placeholder="Password"

type="password"

className="
bg-gray-800
p-3
rounded-xl
outline-none
"

value={form.password}

onChange={(e)=>

setForm({
...form,
password:e.target.value
})

}

/>






<input

placeholder="Department"

className="
bg-gray-800
p-3
rounded-xl
outline-none
"

value={form.department}

onChange={(e)=>

setForm({
...form,
department:e.target.value
})

}

/>




</div>






<button

onClick={addLecturer}

className="
mt-5
bg-green-600
hover:bg-green-700
px-6
py-3
rounded-xl
font-semibold
"

>


Create Lecturer


</button>



</motion.div>









{/* SEARCH */}



<div className="
bg-gray-900
rounded-xl
p-4
mb-6
flex
items-center
gap-3
">


<Search className="text-gray-400"/>


<input

placeholder="Search lecturer..."

className="
bg-transparent
outline-none
w-full
"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</div>









{/* TABLE */}



<div className="
bg-gray-900
rounded-2xl
overflow-hidden
border
border-gray-800
">


<table className="
w-full
text-left
">


<thead className="
bg-gray-800
">

<tr>

<th className="p-4">
Name
</th>


<th className="p-4">
Email
</th>


<th className="p-4">
Department
</th>


<th className="p-4">
Action
</th>


</tr>

</thead>





<tbody>


{

loading ?

<tr>

<td className="p-5">

Loading...

</td>

</tr>


:


filteredLecturers.map((lecturer)=>(


<tr
key={lecturer.id}
className="
border-t
border-gray-800
"
>


<td className="p-4 flex items-center gap-3">

<GraduationCap className="text-blue-400"/>

{lecturer.name}

</td>



<td className="p-4 text-gray-300">

{lecturer.email}

</td>



<td className="p-4">

{lecturer.department || "N/A"}

</td>



<td className="p-4">


<button

onClick={()=>
deleteLecturer(lecturer.id)
}

className="
bg-red-600
hover:bg-red-700
p-2
rounded-lg
"

>

<Trash2 size={18}/>

</button>


</td>


</tr>



))


}



</tbody>


</table>



</div>








</div>


);


}