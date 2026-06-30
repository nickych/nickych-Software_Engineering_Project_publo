import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

interface Props {
  params: {
    course: string;
    semester: string;
  };
}

export default async function SemesterBooksPage({ params }: Props) {
  // ✅ normalize values (VERY IMPORTANT FIX)
  const course = params.course.toLowerCase().trim();
  const semester = params.semester.toLowerCase().trim();

  const books = await prisma.book.findMany({
    where: {
      course,
      semester,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Books for {course.replace(/-/g, " ")}
        </h1>

        <h2 className="text-xl text-gray-400 mb-8">
          {semester.replace(/-/g, " ")}
        </h2>

        {books.length === 0 ? (
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <p className="text-gray-400">
              No books uploaded for this semester yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-2xl font-semibold">
                  {book.title}
                </h3>

                {"author" in book && (
                  <p className="text-gray-400 mt-2">
                    Author: {(book as any).author}
                  </p>
                )}

                {book.description && (
                  <p className="text-gray-300 mt-3">
                    {book.description}
                  </p>
                )}

                <a
                  href={book.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                >
                  Download PDF
                </a>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/courses"
          className="inline-block mt-10 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
        >
          ← Back
        </Link>
      </div>
    </main>
  );
}