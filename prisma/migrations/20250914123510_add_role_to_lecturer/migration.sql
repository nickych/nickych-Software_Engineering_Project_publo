-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lecturer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'lecturer'
);
INSERT INTO "new_Lecturer" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Lecturer";
DROP TABLE "Lecturer";
ALTER TABLE "new_Lecturer" RENAME TO "Lecturer";
CREATE UNIQUE INDEX "Lecturer_email_key" ON "Lecturer"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
