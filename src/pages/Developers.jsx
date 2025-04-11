import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button, IconButton, Select, Skeleton, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { MdOutlineGroups } from "react-icons/md";
import { useSearchParams } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { useDevelopers } from '../api/developers/queries';
import DeveloperCard from '../components/DeveloperCard';
import { validCategories } from '../utils/categories';
import noResult from '/no-results.svg';
import ReactPaginate from 'react-paginate';
import ErrorMessage from '../components/ErrorMessage';

function Developers() {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || ''
  const category = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useDevelopers({
    page,
    limit: 6,
    query,
    category: category,
  });

  const developersData = data?.docs ?? [];
  const hasData = Boolean(data?.totalDocs ?? 0);
  const totalCount = data?.totalDocs ?? 0;
  const totalDevelopers = data?.totalDevelopers ?? 0;

  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.page ?? 1;
  const hasNextPage = data?.hasNextPage ?? false;
  const hasPrevPage = data?.hasPrevPage ?? false;


  const handleSubmit = (e) => {
    e.preventDefault();
    searchParams.set('query', searchTerm);
    setSearchParams(searchParams);
    setPage(1);
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className='flex flex-col'>
      <section className='bg-[--accent-a3]'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl gap-4 p-6 px-4 mx-auto md:px-8 md:py-8'>
          <div>
            <h1 className='text-2xl font-bold md:text-4xl'>
              Developer Directory
            </h1>
            <Text
              as='p'
              className='max-w-2xl mt-2 text-sm md:text-lg'
            >
              Discover talented developers with verified skills. Connect with professionals based on expertise and experience
            </Text>
          </div>
          <Skeleton loading={isLoading}>
            <div className='flex items-center gap-2 p-2 px-4 text-sm font-medium bg-[--color-background] border rounded-lg shadow-md w-max md:text-base'>
              <MdOutlineGroups size={'24'} color='#113264' /> {totalDevelopers} developers
            </div>
          </Skeleton>
        </div>
      </section>
      <section className='w-full max-w-screen-xl p-6 px-4 mx-auto md:px-8 md:py-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 border shadow-md md:p-8 sm:flex-row rounded-xl'>
          <TextField.Root
            autoFocus
            className='sm:flex-1'
            size={'3'}
            placeholder="Search by name, title, or username..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              if (e.target.value === '') {
                searchParams.delete('query')
                setSearchParams(searchParams)
              }
            }}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            {searchTerm?.trim() && (
              <TextField.Slot side='right'>
                <IconButton
                  type='button'
                  variant='ghost'
                  color='gray'
                  onClick={() => {
                    setSearchTerm('')
                    searchParams.delete('query')
                    setSearchParams(searchParams)
                  }}
                >
                  <Cross1Icon />
                </IconButton>
              </TextField.Slot>
            )}
          </TextField.Root>

          <Select.Root
            size={'3'}
            value={category}
            onValueChange={(value) => {
              if (value === 'all') {
                searchParams.delete('category')
                setSearchParams(searchParams)
                return;
              }
              searchParams.set('category', value);
              setSearchParams(searchParams);
              setPage(1);
            }}
            disabled={isLoading}
          >
            <Select.Trigger placeholder="Filter developers by category" />
            <Select.Content position="popper" variant='soft'>
              {validCategories.map((category) => (
                <Select.Item value={category} className='capitalize'>{category.replace(/-/g, ' ')}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Button
            type='submit'
            highContrast
            size={'3'}
            disabled={isLoading || searchTerm?.trim() === ''}
          >
            Search
          </Button>
        </form>
        {!isLoading && !isError && (
          <div className='mt-6'>
            <Text as='h2' size='5' weight='medium'>
              {query || category ? (
                <>
                  {totalCount} developer{totalCount !== 1 ? 's' : ''} found
                  {query && category
                    ? ` for "${query}" in "${category}"`
                    : query
                      ? ` for "${query}"`
                      : ` in "${category}"`}
                </>
              ) : (
                `All developers`
              )}
            </Text>
          </div>
        )}
        <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3'>
          {isLoading ? (
            <div className='text-center cols-span-1 sm:col-span-2 lg:col-span-3'>
              <ClipLoader className='mx-auto' color='var(--accent-12)' />
            </div>
          ) : isError ? (
            <div className='text-center cols-span-1 sm:col-span-2 lg:col-span-3'>
              <ErrorMessage error={error} onRetry={refetch} />
            </div>
          ) : hasData ? (
            developersData.map((developer) => (
              <div className='col-span-1' key={developer._id}>
                <DeveloperCard developer={developer} />
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center gap-2 cols-span-1 sm:col-span-2 lg:col-span-3'>
              <img src={noResult} alt="" className='w-72' />
              <Text align="center" size="2">
                No developers found. Try adjusting your filters or search term.
              </Text>
            </div>
          )}
        </div>
        {!isLoading && !isError && hasData && <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          forcePage={page - 1}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm"
          // Page buttons
          pageLinkClassName="px-3 py-1 rounded-md cursor-pointer block hover:underline underline-offset-4"
          activeLinkClassName="bg-[--accent-12] text-white"
          // Previous button
          previousLinkClassName={`block px-2 py-1  rounded-md ${!hasPrevPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[--gray-4] text-[--accent-11]'
            }  transition`}
          // Next button
          nextLinkClassName={`block px-2 py-1  rounded-md ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[--gray-4]  text-[--accent-11]'
            } transition`}
        />}
      </section>
    </div>
  )
}

export default Developers
