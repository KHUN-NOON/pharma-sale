import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { getSaleById } from "@/modules/sale/services/sale.service";
import { format } from "date-fns";

export const metadata = {
    title: "Sale Detail"
}

export default async function Page({ params }: any) {
    const { id } = await params;

    const { data, message, success } = await getSaleById(parseInt(id));

    return (
        <div className="w-full">
            <div className="flex justify-end mb-3">
                <Button>
                    New Sale
                </Button>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Label htmlFor="name" className="text-right">
                        Date
                    </Label>
                    <Input
                        className="w-[200px]"
                        readOnly
                        value={data?.date ? format(data?.date, "MMMM do, yyyy") : ''}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="add-item" className="text-right">
                        CheckOut Items
                    </Label>
                    <div className="w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>
                                        No.
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Sub-Total</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    (!data?.saleItems || data?.saleItems.length < 1) &&
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            No items in the checkout list.
                                        </TableCell>
                                    </TableRow>
                                }
                                {data?.saleItems && data?.saleItems.map((f, idx) => {
                                    return (
                                        <TableRow className="h-14" key={idx}>
                                            <TableCell>
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell>
                                                {f.item?.name}
                                            </TableCell>
                                            <TableCell>
                                                {f.price?.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {f.quantity?.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {Number(((Number(f.price || 0) * Number(f.quantity || 0))).toFixed(2)).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4} className="text-right font-medium">
                                        <p className="text-2xl">Total</p>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        <p className="text-2xl">
                                            {data?.saleItems
                                                .reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0)
                                                .toLocaleString('en-US', {
                                                    style: 'decimal',
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                        </p>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}