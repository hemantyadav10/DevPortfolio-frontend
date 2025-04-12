import React from 'react'
import { useDashboardStats } from '../api/dashboard/queries'
import { Text, Skeleton, Card, Button, Avatar } from '@radix-ui/themes'
import { BarChartIcon, ChevronRightIcon, StarFilledIcon } from '@radix-ui/react-icons'
import { BiBadgeCheck } from 'react-icons/bi'
import { Link } from 'react-router'
import { ClipLoader } from 'react-spinners'
import ErrorMessage from '../components/ErrorMessage'
import { useRecentEndorsements } from '../api/endorsements/queries'
import { useAuth } from '../context/authContext'

function Overview() {
  const {
    data: dashboardStats,
    isLoading
  } = useDashboardStats()
  const { totalEndorsements, totalSkills, verifiedSkills } = dashboardStats ?? {}
  const { user } = useAuth()
  const {
    data: endorsements = [],
    isError,
    error,
    refetch,
    isFetching
  } = useRecentEndorsements({ userId: user?._id })

  const stats = [
    {
      title: 'Total Skills',
      value: totalSkills,
      icon: <BarChartIcon className="text-blue-500" height={'18'} width={'18'} />,
    },
    {
      title: 'Total Endorsements',
      value: totalEndorsements,
      icon: <StarFilledIcon className="text-yellow-500" height={'18'} width={'18'} />,
      subtitle: 'From the developer community',
    },
    {
      title: 'Verified Skills',
      value: verifiedSkills,
      icon: <BiBadgeCheck className="text-green-500" size={'18'} />,
    },
  ];

  return (
    <div className='space-y-6'>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} loading={isLoading} />
        ))}
      </div>

      <div className='p-6 border rounded-xl'>
        <Text as='p' size={'6'} className='font-medium'>
          Recent Endorsements
        </Text>
        <Text as='p' size={'2'} color='gray' mb={'6'} className='capitalize'>
          Latest skill endorsements from other developers
        </Text>

        {isFetching ? (
          <div className='py-6 text-center'>
            <ClipLoader className='mx-auto' color='var(--accent-12)' />
          </div>
        ) : isError ? (
          <ErrorMessage error={error} onRetry={refetch} />
        ) : endorsements.length === 0 ? (
          <Text as='p' className='text-sm' color='gray' weight={'medium'}>
            No recent endorsements yet.
          </Text>
        ) : (
          <div className='space-y-4'>
            {endorsements.map((endorsement) => (
              <div
                key={endorsement._id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  <Avatar
                    size='2'
                    src={endorsement.endorsedBy?.profilePictureUrl}
                    fallback={endorsement.endorsedBy?.name?.[0]}
                    radius='full'
                    highContrast
                  />
                  <div>
                    <p className='font-medium capitalize '>
                      {endorsement.endorsedBy?.name}
                    </p>
                    <p className='text-xs capitalize '>
                      Endorsed your {endorsement.skillId?.name} skill
                    </p>
                  </div>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {new Date(endorsement.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div>
          <Skeleton loading={isFetching}>
            <Button variant="ghost" asChild color='gray' highContrast mt={'6'} className='font-medium'>
              <Link to={'/dashboard/endorsements'}>
                View all endorsements <ChevronRightIcon className="w-4 h-4" />
              </Link>
            </Button>
          </Skeleton>
        </div>
      </div>
    </div >
  );
}

export default Overview


function StatsCard({ title, value, icon, subtitle, loading }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white border rounded-2xl">
      <div className="p-3 bg-gray-100 rounded-full">
        {icon}
      </div>
      <div>
        <Text className="text-sm">{title}</Text>
        <Skeleton loading={loading} mt={'2'} className='w-20 h-6'>
          <p className="text-2xl font-semibold">{value ?? 0}</p>
        </Skeleton>
        {subtitle && (
          <Text as='p' className="mt-1 text-xs" color='gray'>{subtitle}</Text>
        )}
      </div>
    </div>
  );
}