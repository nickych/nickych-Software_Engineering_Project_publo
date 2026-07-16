import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();





export async function GET(req: NextRequest) {


  try {


    const { searchParams } =
      new URL(req.url);


    const email =
      searchParams.get("email");




    if (!email) {


      return NextResponse.json(
        {
          message: "Email required"
        },
        {
          status:400
        }
      );


    }







    const user =
      await prisma.user.findUnique({

        where:{
          email
        },

        select:{

          name:true,

          email:true,

          role:true,

          profileImageUrl:true

        }

      });







    if(!user){


      return NextResponse.json(

        {
          message:"User not found"
        },

        {
          status:404
        }

      );


    }








    return NextResponse.json(user);





  }
  catch(error){


    console.log(
      "USER GET ERROR:",
      error
    );


    return NextResponse.json(

      {
        message:"Failed to fetch user"
      },

      {
        status:500
      }

    );


  }


}









export async function PUT(req:NextRequest){


  try{


    const {
      email,
      profileImageUrl
    } = await req.json();






    if(!email || !profileImageUrl){


      return NextResponse.json(

        {
          message:
          "Email and profileImageUrl are required"
        },

        {
          status:400
        }

      );


    }







    const user =
      await prisma.user.update({

        where:{
          email
        },

        data:{

          profileImageUrl

        }

      });








    return NextResponse.json(user);






  }
  catch(error){


    console.log(
      "USER UPDATE ERROR:",
      error
    );



    return NextResponse.json(

      {
        message:
        "Failed to update profile image"
      },

      {
        status:500
      }

    );


  }


}