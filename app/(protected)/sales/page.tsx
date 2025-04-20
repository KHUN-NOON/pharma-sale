import { DataTable } from "@/components/ui/data-table";
import { devLogger } from "@/lib/utils";
import SaleTableWrapper from "@/modules/sale/components/sale-table-wrapper";
import { columns } from "@/modules/sale/components/sale.columns";
import { getSales } from "@/modules/sale/services/sale.service";

export const metadata = {
    title: 'Sales',
    description: 'Sales Page'
}

export default async function SalesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const params = await searchParams;
    const page = parseInt(params.page as string) || 1;
    const limit = parseInt(params.limit as string) || 10;
    const sales = await getSales({ page, limit });

    const { data } = sales;

    const serializeData = data?.result.map((sale) => {
        return {
            ...sale,
            total: Number(sale.total),
            date: sale.date.toISOString()
        }
    });
    
    return (
        <SaleTableWrapper
            data={serializeData ?? ''}
            paginationProps={{
                currentPage: data?.page ?? 1,
                totalPages: data?.totalPages ?? 1,
                totalItems: data?.total ?? 0,
                itemsPerPage: limit
            }}
        />
    )
}