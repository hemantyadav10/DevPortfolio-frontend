import React from 'react';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Callout, Text } from '@radix-ui/themes';
import { Link } from 'react-router';

const ErrorMessage = ({ error, onRetry }) => {
  console.log(error)
  return (
    <Callout.Root color="red" variant='surface' className='flex items-center mx-auto max-w-fit'>
      <Callout.Icon>
        <ExclamationTriangleIcon />
      </Callout.Icon>
      <Callout.Text weight={'medium'} className='flex items-center gap-2'>
        {error?.response?.data?.message || 'Something went wrong.'}
        {onRetry && (
          <Button variant="soft" color="red" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Callout.Text>
    </Callout.Root>
  );
};

export default ErrorMessage;
