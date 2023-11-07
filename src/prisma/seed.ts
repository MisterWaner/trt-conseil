import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { fa, faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.role.deleteMany();

    const length = 10;
    const hashedPassword = await bcrypt.hash("admin", 10);

    await prisma.role.createMany({
        data: [
            { id: 1, name: "Recruteur" },
            { id: 2, name: "Candidat" },
            { id: 3, name: "Consultant" },
        ],
    });

    await prisma.admin.create({
        data: {
            email: "admin@admin.fr",
            password: hashedPassword,
        },
    });

    for (let i = 0; i < length; i++) {

        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                roleId: 3,
            },
        });

        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                roleId: 2,
            },
        });
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                societyName: faker.company.name(),
                address: faker.location.streetAddress(),
                roleId: 1,
            },
        });
        console.log("Seeding done");
    }

    const recruiters = await prisma.user.findMany({
        where: {
            roleId: 1,
        },
    });

    for (let i = 0; i < length; i++) {
        await prisma.offer.create({
            data: {
                title: faker.person.jobTitle(),
                reference: faker.string.alphanumeric(10),
                salary: faker.number.int({ min: 2000, max: 5000 }),
                publicationDate: faker.date.past(),
                schedules: "de 9h à 17h",
                contractType: "CDI",
                place: faker.location.city(),
                userId: recruiters[i].id,
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.log("Error while seeding data", error);
        await prisma.$disconnect();
        process.exit(1);
    });
