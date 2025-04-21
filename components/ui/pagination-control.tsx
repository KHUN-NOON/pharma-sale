'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function PaginationControl({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    params.set('limit', searchParams.get('limit') || '10');
    router.push(`?${params.toString()}`);
  };

  // Generate visible page numbers (with ellipsis logic)
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5; // Adjust as needed
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2);
      const rightOffset = Math.ceil(maxVisiblePages / 2) - 1;
      
      let start = currentPage - leftOffset;
      let end = currentPage + rightOffset;
      
      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }
      
      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      if (start > 1) visiblePages.push('...');
      
      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
      
      if (end < totalPages) visiblePages.push('...');
    }
    
    return visiblePages;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              isActive={currentPage > 1}
            />
          </PaginationItem>

          {getVisiblePages().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Number(page));
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-sm text-muted-foreground">
        Showing {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </p>
    </div>
  );
}