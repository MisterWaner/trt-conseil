import Table from "@/app/ui/components/Table/Table";

const dataFromBackend = [
    {
        id: 1,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 2,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 3,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 4,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 5,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 6,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 7,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
    {
        id: 8,
        firstName: "Jean",
        lastName: "Dupont",
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
    },
];

const columnsToShow = ["id", "firstName", "lastName", "email"];

const Applications: React.FC = () => {
    const filteredData: Record<string, any>[] = dataFromBackend.map(
        (row: any) => {
            const filteredRow: Record<string, any> = {};
            columnsToShow.forEach((column) => {
                filteredRow[column] = row[column];
            });
            return filteredRow;
        }
    );

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container-xl mx-10 h-full mt-[100px] md:mx-20">
                <h1 className="font-medium text-center text-xl md:text-3xl">
                    Les candidatures
                </h1>
                <section className="mt-9 overflow-x-auto">
                    <Table
                        data={filteredData}
                        columsToShow={columnsToShow}
                        subject="applications"
                    />
                </section>
            </main>
        </div>
    );
};

export default Applications;
