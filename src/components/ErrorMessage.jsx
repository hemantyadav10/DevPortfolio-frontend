import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Callout } from '@radix-ui/themes';
import React from 'react';

const ErrorMessage = ({ error, onRetry, className='' }) => {
  console.log(error)
  return (
    <Callout.Root color="red" variant='surface' className={`flex items-center mx-auto max-w-fit ${className}`}>
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
