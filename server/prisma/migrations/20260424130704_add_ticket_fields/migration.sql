-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description provided';
