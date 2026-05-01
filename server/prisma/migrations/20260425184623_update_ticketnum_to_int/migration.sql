/*
  Warnings:

  - The `ticketNum` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticketNum",
ADD COLUMN     "ticketNum" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketNum_key" ON "Ticket"("ticketNum");
