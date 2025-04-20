'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

export function BreadcrumbCustom({ className }: { className?: string }) {
    const pathname = usePathname();
    // Ensure we're running on client-side to avoid hydration mismatch
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // or return a skeleton loader
    }

    const pathParts = pathname.split("/").filter(Boolean);

    const breadcrumbs = pathParts.map((part, index) => {
        const href = "/" + pathParts.slice(0, index + 1).join("/");
        const label = decodeURIComponent(part).replace(/-/g, ' '); // Optional: replace hyphens with spaces

        return {
            href,
            label,
            isLast: index === pathParts.length - 1,
        };
    });

    // Handle not found/empty case
    if (breadcrumbs.length === 0) {
        return (
            <Breadcrumb className={className}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="hover:underline font-semibold text-foreground">
                            Dashboard
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    const shouldSkipDashboard = breadcrumbs[0]?.label.toLowerCase() === "dashboard";

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {!shouldSkipDashboard && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="hover:underline">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
                    </>
                )}
                {breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={`${breadcrumb.href}-${index}`}>
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={breadcrumb.href}
                                className={`hover:underline ${breadcrumb.isLast ? "font-semibold text-foreground" : ""}`}
                                aria-current={breadcrumb.isLast ? "page" : undefined}
                            >
                                {breadcrumb.label.charAt(0).toUpperCase() + breadcrumb.label.slice(1)}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

