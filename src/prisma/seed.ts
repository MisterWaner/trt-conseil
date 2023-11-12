import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Role, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
    await prisma.offer.deleteMany();
    await prisma.user.deleteMany();

    const length = 10;
    const hashedPassword = await bcrypt.hash("admin1234", 10);

    await prisma.user.create({
        data: {
            email: "admin@trt-conseil.fr",
            password: hashedPassword,
            role: Role.admin,
            isApproved: true,
        },
    });

    for (let i = 0; i < length; i++) {

        await prisma.user.create({
            data: {
                email: faker.internet.email({provider: "trt-conseil.fr"}),
                password: faker.internet.password({ length: 25 }),
                role: Role.consultant,
                isApproved: true,
            },
        });

        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 25 }),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                role: Role.candidat,
            },
        });
        await prisma.user.create({
            data: {
                email: faker.internet.email({provider: `${faker.company.name().trim().split(" ").join("")}.fr}`}),
                password: faker.internet.password({ length: 25 }),
                societyName: faker.company.name(),
                address: faker.location.streetAddress(),
                role: Role.recruiter,
            },
        });
        console.log("Seeding done");
    }

    const recruiters = await prisma.user.findMany({
        where: {
            role: Role.recruiter,
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
