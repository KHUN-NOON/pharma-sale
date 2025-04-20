import SaleForm from "@/modules/sale/components/sale-form";

export const metadata = {
    title: "Creating New Sale"
}

export default async function Page() {
    return (
        <>
            <SaleForm/>
        </>
    );
}