-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_itemId_fkey";

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
