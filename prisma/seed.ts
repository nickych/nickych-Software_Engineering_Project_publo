import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



async function main() {


  const modules = [



    // YEAR 1 SEMESTER 1

    {
      name:"Computer Applications",
      year:"Year 1",
      semester:"Semester 1"
    },

    {
      name:"Computer Programming I",
      year:"Year 1",
      semester:"Semester 1"
    },

    {
      name:"Fundamentals of Computer Systems",
      year:"Year 1",
      semester:"Semester 1"
    },

    {
      name:"Foundation Mathematics I",
      year:"Year 1",
      semester:"Semester 1"
    },

    {
      name:"Business and Academic Communication",
      year:"Year 1",
      semester:"Semester 1"
    },





    // YEAR 1 SEMESTER 2


    {
      name:"Data Structure",
      year:"Year 1",
      semester:"Semester 2"
    },


    {
      name:"Physics",
      year:"Year 1",
      semester:"Semester 2"
    },


    {
      name:"Computer Programming II",
      year:"Year 1",
      semester:"Semester 2"
    },


    {
      name:"Foundation Mathematics II",
      year:"Year 1",
      semester:"Semester 2"
    },


    {
      name:"Introduction to Project Management",
      year:"Year 1",
      semester:"Semester 2"
    },






    // YEAR 2 SEMESTER 1


    {
      name:"Systems Analysis and Design",
      year:"Year 2",
      semester:"Semester 1"
    },


    {
      name:"Database Management Systems",
      year:"Year 2",
      semester:"Semester 1"
    },


    {
      name:"Networking and Data Communication I",
      year:"Year 2",
      semester:"Semester 1"
    },


    {
      name:"Operating Systems",
      year:"Year 2",
      semester:"Semester 1"
    },


    {
      name:"Discrete Mathematics",
      year:"Year 2",
      semester:"Semester 1"
    },






    // YEAR 2 SEMESTER 2


    {
      name:"Digital Logic",
      year:"Year 2",
      semester:"Semester 2"
    },


    {
      name:"Parallel and Distributed Systems",
      year:"Year 2",
      semester:"Semester 2"
    },


    {
      name:"Networking and Data Communication II",
      year:"Year 2",
      semester:"Semester 2"
    },


    {
      name:"Real Time and Embedded Systems",
      year:"Year 2",
      semester:"Semester 2"
    },


    {
      name:"Computer Architecture and Organization",
      year:"Year 2",
      semester:"Semester 2"
    },







    // YEAR 3 SEMESTER 1


    {
      name:"Research Methods",
      year:"Year 3",
      semester:"Semester 1"
    },


    {
      name:"Algorithms and Complexity",
      year:"Year 3",
      semester:"Semester 1"
    },


    {
      name:"Clusters and High Performance Computing",
      year:"Year 3",
      semester:"Semester 1"
    },


    {
      name:"Entrepreneurship",
      year:"Year 3",
      semester:"Semester 1"
    },


    {
      name:"Information Assurance and Cyber Security",
      year:"Year 3",
      semester:"Semester 1"
    },






    // YEAR 3 SEMESTER 2


    {
      name:"Software Engineering",
      year:"Year 3",
      semester:"Semester 2"
    },


    {
      name:"Web Applications Development",
      year:"Year 3",
      semester:"Semester 2"
    },


    {
      name:"Advanced Database Management Systems",
      year:"Year 3",
      semester:"Semester 2"
    },


    {
      name:"Artificial Intelligence",
      year:"Year 3",
      semester:"Semester 2"
    },


    {
      name:"Human Computer Interactions",
      year:"Year 3",
      semester:"Semester 2"
    },







    // YEAR 4 SEMESTER 1


    {
      name:"Programming Languages",
      year:"Year 4",
      semester:"Semester 1"
    },


    {
      name:"Platform Based Development",
      year:"Year 4",
      semester:"Semester 1"
    },


    {
      name:"Dissertation",
      year:"Year 4",
      semester:"Semester 1"
    },


    {
      name:"Mobile Applications Development",
      year:"Year 4",
      semester:"Semester 1"
    },


    {
      name:"Systems Project Management",
      year:"Year 4",
      semester:"Semester 1"
    },







    // YEAR 4 SEMESTER 2


    {
      name:"Computer Ethics",
      year:"Year 4",
      semester:"Semester 2"
    },


    {
      name:"Graphics and Visualization",
      year:"Year 4",
      semester:"Semester 2"
    },


    {
      name:"Industrial Placement",
      year:"Year 4",
      semester:"Semester 2"
    },



  ];






  for(const module of modules){


    await prisma.module.create({

      data:module

    });


  }




  console.log("Modules inserted successfully");


}





main()

.catch((error)=>{


  console.log(error);

  process.exit(1);


})

.finally(async()=>{


  await prisma.$disconnect();


});