import { BellIcon, DotsHorizontalIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { Avatar, Button, DropdownMenu, Flex, IconButton, Inset, Popover, ScrollArea, Skeleton, Text, Tooltip } from '@radix-ui/themes'
import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { CiBellOff } from "react-icons/ci"
import { Link, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { useDeleteAllNotifications, useDeleteReadNotifications, useMarkAllAsRead, useMarkAsRead } from '../api/notifications/notifications.mutations'
import { useAllNotifications, useNotificationCount } from '../api/notifications/notifications.queries'
import { useAuth } from '../context/authContext'
import ErrorMessage from './ErrorMessage'
import { notificationKeys } from '../api/notifications/notifications.keys'
import { useQueryClient } from '@tanstack/react-query'
import { statsKeys } from '../api/stats/queryKeys'
import { useSocket } from '../context/socketContext'


function Notifications() {
  const { user } = useAuth()
  const { socket } = useSocket()
  console.log(socket)

  const limit = 10;
  const [fetchNotifications, setFetchNotifications] = useState(false)
  const [read, setRead] = useState(undefined)
  const filters = { limit, read }
  const { isAuthenticated } = useAuth()
  const { data, isLoading } = useNotificationCount(isAuthenticated);
  const {
    data: notifications,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
    isFetching
  } = useAllNotifications(isAuthenticated, fetchNotifications, filters);
  const hasNotifications = !!notifications?.pages[0]?.totalDocs;
  const { count = 0 } = data ?? {}

  const { mutate: deleteRead, isPending: deletingRead } = useDeleteReadNotifications();
  const { mutate: deleteAll, isPending: deletingAll } = useDeleteAllNotifications(filters);
  const { mutate: markAllAsRead, isPending: markingAll } = useMarkAllAsRead(filters);
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return;

    // Handle incoming real-time notifications
    const handleNotification = (data) => {
      if (data.sender._id !== user?._id) {
        // increment unread notification count in the cache
        queryClient.setQueryData(notificationKeys.unreadCount(), (old) => {
          return {
            count: (old?.count ?? 0) + 1
          };
        });

        // add the new notification to the cached notification list
        queryClient.setQueryData(notificationKeys.list(filters), (oldData) => {
          if (!oldData) {
            return oldData;
          }

          const newNotification = data;

          return {
            ...oldData,
            pages: [
              {
                ...oldData.pages[0],
                docs: [newNotification, ...oldData.pages[0].docs],
                totalDocs: oldData.pages[0].totalDocs + 1
              },
              ...oldData.pages.slice(1)
            ]
          };
        });

        // Invalidate to ensure background revalidation of notifications and stats
        queryClient.invalidateQueries({ queryKey: notificationKeys.all });
        queryClient.invalidateQueries({ queryKey: statsKeys.all });
      }
    };

    // Handle real-time endorsement removal to keep platform stats updated
    const remove_endorsement = (data) => {
      queryClient.invalidateQueries({ queryKey: statsKeys.all });
    };

    // Register socket listeners
    socket.on('notification', handleNotification)
    socket.on('remove_endorsement', remove_endorsement)

    // Clean up socket listeners on unmount
    return () => {
      socket.off('notification', handleNotification)
      socket.off('remove_endorsement', remove_endorsement)
    }

  }, [socket]);

  return (
    isLoading ? (
      <Skeleton className='w-8 h-8 rounded-full' />
    ) : (
      <Popover.Root open={fetchNotifications} onOpenChange={setFetchNotifications}>
        <Popover.Trigger className='relative'>
          <div className='relative rounded-full'>
            <Tooltip content='Notifications' delayDuration={0}>
              <IconButton
                variant='outline'
              >
                <BellIcon color='white' height={16} width={16} />
              </IconButton>
            </Tooltip>
            {/* Notification count badge */}
            {count > 0 && <span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center shadow-md tabular-nums'>
              {count}
            </span>}
          </div>
        </Popover.Trigger>
        <Popover.Content align='end' className='w-screen max-w-96'>

          <Inset mb={'4'} className='border-b border-[--gray-a6] bg-[--gray-a2] px-4 py-2'>
            <Flex align={'center'} justify={'between'}>
              <Text as='p' weight={'medium'} className='flex items-center gap-2' size={'5'}>
                Notifications
                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton
                      size={'2'}
                      radius='full'
                      color='gray'
                      variant='ghost'
                    >
                      <InfoCircledIcon />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content align='start'>
                    <Inset p={'0'}>
                      <Text size='1' align='center' className='px-4'>
                        Notifications are stored for 3 days
                      </Text>
                    </Inset>
                  </Popover.Content>
                </Popover.Root>
              </Text>
              <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                  <IconButton
                    variant='ghost'
                    highContrast
                    color='gray'
                  >
                    <DotsHorizontalIcon height={18} width={18} />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className='w-36' variant='soft'>
                  <DropdownMenu.Label>
                    Actions
                  </DropdownMenu.Label>
                  <DropdownMenu.Item disabled={deletingRead} onClick={deleteRead}>
                    Clear read
                  </DropdownMenu.Item>
                  <DropdownMenu.Item disabled={deletingAll} onClick={deleteAll}>
                    Clear all
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Flex>
            <Flex gap={'2'} mt={'1'}>
              <Button
                disabled={isFetching}
                variant={read !== undefined && "soft"}
                size={'1'}
                onClick={() => setRead(undefined)}
              >
                All
              </Button>
              <Button
                disabled={isFetching}
                onClick={() => {
                  setRead(false)
                }}
                variant={read === undefined && "soft"}
                size={'1'}
              >
                Unread
              </Button>
            </Flex>
          </Inset>
          <Inset my={'4'}>
            <ScrollArea type="auto" scrollbars="vertical" style={{ height: 220 }}>
              <Flex className='h-full px-4 pb-2' direction={'column'} >
                {isPending ? (
                  <div className='mt-4 text-center '>
                    <ClipLoader className='mx-auto' color='var(--accent-12)' />
                  </div>
                ) : isError ? (
                  <ErrorMessage className='mt-4' error={error} onRetry={refetch} />
                ) : hasNotifications ? (
                  notifications?.pages.map((page) => (
                    page.docs.map((data) => (
                      <NotificationCard key={data._id} data={data} setOpen={setFetchNotifications} filters={filters} />
                    ))))
                ) : (
                  <div className='flex flex-col items-center justify-center flex-1 gap-1'>
                    <CiBellOff size={100} color='var(--gray-a9)' />
                    <Text as='p' className='font-medium' align={'center'} color='gray' >
                      You're all caught up! <br />
                    </Text>
                    <Text as='p' className='text-xs' align={'center'} color='gray' >
                      No new notifications for now.
                    </Text>
                  </div>
                )}
                {isFetchingNextPage && (
                  <div className='my-2 text-center'>
                    <ClipLoader size={'24'} className='mx-auto' color='var(--accent-12)' />
                  </div>
                )}
                {hasNextPage && !isFetchingNextPage && (
                  <div className='text-center'>
                    <Button
                      onClick={() => fetchNextPage()}
                      variant='ghost'
                      my={'2'}
                    >
                      Load more
                    </Button>
                  </div>
                )}

              </Flex>
            </ScrollArea>
          </Inset>
          <Inset mt={'4'} className='border-t  bg-[--gray-a2] border-[--gray-a6]'>
            <Flex align={'center'} p={'2'} justify={'center'}>
              <Button
                variant='ghost'
                color='gray'
                highContrast
                onClick={markAllAsRead}
                disabled={markingAll}
              >
                Mark all as read
              </Button>
            </Flex>
          </Inset>
        </Popover.Content>
      </Popover.Root >
    )
  )
}

export default React.memo(Notifications)

function NotificationCard({ data, setOpen, filters }) {
  const { createdAt, isRead, message, sender, url, _id: notificationId } = data ?? {};
  const { name, profilePictureUrl, _id: senderId } = sender ?? {}
  const { mutate: markAsRead } = useMarkAsRead({ id: notificationId, filters });

  const navigate = useNavigate()

  const handleLinkClick = () => {
    if (!isRead) {
      markAsRead(notificationId)
    }
    setOpen(false);
  }

  return (
    <Link onClick={handleLinkClick} to={url} className={`border-b border-[--gray-a6] flex items-center gap-2 hover:bg-[--gray-a3] active:bg-[--gray-a4] p-2 `}>
      {!isRead && <span className='w-1 h-1 bg-[--accent-11] rounded-full' />}
      <div onClick={(e) => {
        e.stopPropagation();
        e.preventDefault()
        setOpen(false);
        navigate(`/profile/${senderId}`)
      }}>
        <Avatar
          src={profilePictureUrl}
          fallback={name?.charAt(0)?.toUpperCase()}
          className='object-cover object-center w-10 h-10 rounded-full'
          highContrast
        />
      </div>
      <div>
        <Text as='p' size={'2'}>
          {message}
        </Text>
        <Text as='p' size={'1'} color='gray'>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </Text>
      </div>
    </Link>
  )
}