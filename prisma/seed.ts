import { PrismaClient } from "@/generated/prisma";
import { topTenSaleItemsChart } from "@/modules/report/services/report.service";
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

    const items = Array.from({ length: 100 }, () => ({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 1, max: 100000 })),
        stockQuantity: faker.number.int({ min: 10, max: 500 }),
        unitId: faker.helpers.arrayElement(unitIds),
        categoryId: faker.helpers.arrayElement(categoryIds)
    }));

    return items;
};

const fakeSales = async () => {
    const items = await prisma.item.findMany();

    const singleSale = () => {
        const saleDate = faker.date.between({
            from: '2023-01-01',
            to: '2024-12-31',
        });

        // Random number of sale items (1-5 per sale)
        const saleItemsCount = faker.number.int({ min: 1, max: 5 });

        const saleItems = Array.from({ length: saleItemsCount }).map(() => {
            const item = faker.helpers.arrayElement(items);
            const quantity = faker.number.int({ min: 1, max: 10 });
            return {
                itemId: item.id,
                quantity,
                price: Number(item.price), // Using the item's price
            };
        });

        return {
            date: saleDate,
            total: parseFloat(saleItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)),
            saleItems
        }
    }

    const sales = Array.from({length: 100}, () => {
        return singleSale();
    });

    await Promise.all(sales.map(async (sale) => {
        await prisma.sale.create({
            data: {
                date: sale.date,
                total: sale.total,
                saleItems: {
                    create: sale.saleItems.map(item => ({
                        itemId: item.itemId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })
    }))
}

async function main() {
    const units = await prisma.unit.createMany({
        skipDuplicates: true,
        data: fakeUnit.map(u => ({ name: u }))
    })

    const categories = await prisma.category.createMany({
        skipDuplicates: true,
        data: fakeCategory.map(c => ({ name: c }))
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

    await fakeSales();

    console.log({ units, categories, items, user });
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

