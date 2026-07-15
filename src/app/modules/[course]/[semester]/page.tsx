import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

interface Props {
  params: {
    course: string;
    semester: string;
  };
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .trim();
}

export default async function SemesterBooksPage({ params }: Props) {
  const course = normalize(params.course);
  const semester = normalize(params.semester);

  const books = await prisma.book.findMany();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Books for Computing in Science
          </h1>

          <p className="text-white mt-3 text-lg">
            Past Papers & Study Materials
          </p>

          <p className="text-white mt-1 text-sm">
            {params.semester.replace(/-/g, " ")}
          </p>
        </div>

        {/* BOOKS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="book-card bg-gray-900/60 border border-gray-800 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white">
                {book.title}
              </h3>

              <p className="text-white text-sm mt-2">
                👨‍🏫 {book.lecturerId}
              </p>

              {book.description && (
                <p className="text-white mt-3 text-sm">
                  {book.description}
                </p>
              )}

              <a
                href={book.fileUrl}
                target="_blank"
                className="block mt-4 bg-blue-600 text-center py-2 rounded-xl text-white"
              >
                Download PDF
              </a>
            </div>
          ))}
        </div>

        {/* BACK */}
        <div className="mt-12 text-center">
          <Link href="/courses" className="text-white">
            ← Back to Courses
          </Link>
        </div>

      </div>
    </main>
  );
}