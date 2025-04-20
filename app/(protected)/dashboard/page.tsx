import ChartCustom from "@/components/ui/bar-chart";
import StatsCard from "@/components/ui/stats-card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { getItemCount, getSaleCount, getTotalSaleAmount, topTenSaleItems, topTenSaleItemsChart, totalItemSold } from "@/modules/report/services/report.service";

export const metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    const [totalSold, sales, revenues, items, topSaleItemsChart] = await Promise.all([
        totalItemSold(),
        getSaleCount(),
        getTotalSaleAmount(),
        getItemCount(),
        topTenSaleItemsChart()
    ]);


    return (
        <div className="w-full flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-4"> {/* Equal 4-column grid */}
                <StatsCard
                    title={"Total Items"}
                    value={(items.data?.itemCount || 0).toLocaleString()}
                    description={""}
                    icon={"📦"}
                />
                <StatsCard
                    title={"Total Items Sold"}
                    value={(totalSold.data?.totalItemSold || 0).toLocaleString()}
                    description={""} // Ensure equal height
                    icon={"༁"}
                />
                <StatsCard
                    title={"Total Revenue"}
                    value={(revenues.data?.totalSaleAmount || 0)?.toLocaleString()}
                    description={""}
                    icon={"💵"}
                />
                <StatsCard
                    title={"Transaction Count"}
                    value={(sales.data?.saleCount || 0).toLocaleString()}
                    description={""}
                    icon="💰"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border">
                    <p className="m-6 font-bold">Top 10 Items</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                topSaleItemsChart.data?.map((itm: any, idx: number) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{itm?.name}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <ChartCustom />
            </div>
        </div>
    );
}