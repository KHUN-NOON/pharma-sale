import ItemTableWrapper from "@/modules/pharmacy/components/item-table-wrapper";
import { getItem } from "@/modules/pharmacy/services/item.service"

export const metadata = {
    title: 'Items',
    description: 'Items Page'
}

export default async function ItemsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const params = await searchParams;
    const page = parseInt(params.page as string) || 1;
    const limit = parseInt(params.limit as string) || 10;
    const search = params.search as string || undefined;

    const items = await getItem({ page, limit, search });

    const { data } = items;

    const serializeData = data?.result.map((item) => {
        return {
            ...item,
            price: Number(item.price)
        }
    });

    return (
        <>
            <ItemTableWrapper
                data={serializeData ?? []}
                paginationProps={{
                    currentPage: data?.page ?? 1,
                    totalPages: data?.totalPages ?? 1,
                    totalItems: data?.total ?? 0,
                    itemsPerPage: limit
                }}
            />
        </>
    )
}