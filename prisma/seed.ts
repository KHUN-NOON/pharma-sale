import { PrismaClient } from "@/generated/prisma";
import { faker } from '@faker-js/faker';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const fakeCategory = [
    "Antibiotics", 
    "Pain Relievers", 
    "Antiseptics", 
    "Vitamins & Supplements", 
    "Cough & Cold", 
    "Anti-inflammatory", 
    "Hormones", 
    "Topical Creams", 
    "Digestive Health", 
    "Heart Health", 
    "Diabetes Care", 
    "Skin Care", 
    "Allergy Relief", 
    "Eye Care", 
    "Oral Health", 
    "Respiratory Health", 
    "Blood Pressure", 
    "Cancer Care", 
    "Sleep Aids", 
    "Menstrual Health"
];

const fakeUnit = [
    "mg",           // milligram
    "g",            // gram
    "ml",           // milliliter
    "l",            // liter
    "tablet",
    "capsule",
    "bottle",
    "tube",
    "sachet",
    "ampoule",
    "vial",
    "drop",
    "patch",
    "inhaler",
    "spray"
];

const fakeItems = async () => {
    const units = await prisma.unit.findMany({ select: { id: true } });
    const categories = await prisma.category.findMany({ select: { id: true } });

    const unitIds = units.map(u => u.id);
    const categoryIds = categories.map(c => c.id);

    const items = Array.from({length: 100}, () => ({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 1, max: 100000 })),
        stockQuantity: faker.number.int({ min: 10, max: 500 }),
        unitId: faker.helpers.arrayElement(unitIds),
        categoryId: faker.helpers.arrayElement(categoryIds)
    }));

    return items;
};

async function main() {
    const units = await prisma.unit.createMany({
        skipDuplicates: true,
        data: fakeUnit.map(u => ({ name: u }))
    })

    const categories = await prisma.category.createMany({
        skipDuplicates: true,
        data: fakeCategory.map(c => ({ name: c }) )
    })

    const fakeItemsResult = await fakeItems();

    const items = await prisma.item.createMany({
        skipDuplicates: true,
        data: fakeItemsResult
    })

    const user = await prisma.user.upsert({
        where: { email: "admin@demo.com" },
        update: {},
        create: {
            email: "admin@demo.com",
            password: await bcrypt.hash("admin123", 10)
        }
    });

    console.log({units, categories, items, user});
}

main() 
.then(async () => {
    console.log("DB Seeding Success! ✅");
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
  
  