import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";


const prisma = new PrismaClient();




function calculateGrade(total:number){


  if(total >= 80)
    return { grade:"A", status:"PASS" };


  if(total >= 70)
    return { grade:"B", status:"PASS" };


  if(total >= 60)
    return { grade:"C", status:"PASS" };


  if(total >= 50)
    return { grade:"D", status:"PASS" };


  return {
    grade:"F",
    status:"FAIL"
  };

}








export async function POST(req:NextRequest){


  try{


    const formData = await req.formData();



    const file =
      formData.get("file") as File;



    const year =
      String(formData.get("year"));



    const semester =
      String(formData.get("semester"));



    const module =
      String(formData.get("module"));



    const assessment =
      String(formData.get("assessment"));







    if(!file){

      return NextResponse.json(
        {
          message:"CSV file required"
        },
        {
          status:400
        }
      );

    }







    const buffer =
      await file.arrayBuffer();



    const csv =
      Buffer.from(buffer).toString();







    const students:any[] =
      parse(csv,{
        columns:true,
        skip_empty_lines:true,
        trim:true
      });








    let uploaded = 0;

    const skippedStudents:string[] = [];








    for(const student of students){



      const email =
        String(student.email)
        .trim()
        .toLowerCase();



      const mark =
        Number(student.mark);






      if(!email || isNaN(mark)){


        skippedStudents.push(email);

        continue;


      }







      const emailRegex =
        /^[a-z]{2}\d+@students\.cavendish\.co\.zm$/;







      if(!emailRegex.test(email)){


        skippedStudents.push(email);

        continue;


      }








      const existingStudent =
        await prisma.user.findUnique({

          where:{
            email
          }

        });







      if(!existingStudent){


        skippedStudents.push(
          `${email} (student not found)`
        );


        continue;


      }









      let result =
        await prisma.result.findUnique({


          where:{

            studentEmail_module_semester:{

              studentEmail:email,

              module,

              semester

            }

          }

        });









      let cat1 =
        result?.cat1 ?? null;


      let cat2 =
        result?.cat2 ?? null;


      let finalExam =
        result?.finalExam ?? null;









      if(assessment==="CAT 1")
        cat1 = mark;



      if(assessment==="CAT 2")
        cat2 = mark;



      if(assessment==="Final Exam")
        finalExam = mark;









      const total =

        (cat1 ?? 0)
        +
        (cat2 ?? 0)
        +
        (finalExam ?? 0);







      const gradeInfo =
        calculateGrade(total);








      await prisma.result.upsert({


        where:{

          studentEmail_module_semester:{

            studentEmail:email,

            module,

            semester

          }

        },



        update:{


          cat1,

          cat2,

          finalExam,

          total,

          grade:gradeInfo.grade,

          status:gradeInfo.status


        },



        create:{


          studentEmail:email,

          module,

          year,

          semester,

          cat1,

          cat2,

          finalExam,

          total,

          grade:gradeInfo.grade,

          status:gradeInfo.status


        }



      });




      uploaded++;



    }









    return NextResponse.json({

      message:
      `Upload complete. Successful: ${uploaded}, Skipped: ${skippedStudents.length}`,

      skippedStudents


    });






  }
  catch(error:any){


    console.log(
      "RESULT UPLOAD ERROR:",
      error
    );



    return NextResponse.json({

      message:
      error.message || "Failed to upload results"

    },
    {
      status:500
    });



  }


}