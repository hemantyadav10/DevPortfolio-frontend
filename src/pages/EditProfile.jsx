import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Separator, Text, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuSave } from "react-icons/lu";
import { useUpdateProfile } from '../api/developers/mutations';
import { useAuth } from '../context/authContext';

function EditProfile() {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      title: user?.title || '',
      yearsOfExperience: user?.yearsOfExperience || 0,
      bio: user?.bio || '',
      profilePictureUrl: user?.profilePictureUrl || '',
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      twitter: user?.socialLinks?.twitter || '',
      website: user?.socialLinks?.website || ''
    }
  });

  const { mutate, isPending } = useUpdateProfile(user?._id);

  const onSubmit = async (data) => {
    mutate(data, {
      onSuccess: () => {
        const updatedUser = { ...user, ...data };
        console.log(data)
        setUser(updatedUser);
        localStorage.setItem('dev-user', JSON.stringify(updatedUser));
        toast.success("Profile updated successfully")
      },
    })
  }

  return (
    <div className='p-6 py-8 md:px-12'>
      <div className='max-w-4xl mx-auto sm:border sm:p-6 sm:shadow-lg rounded-xl'>
        <Text as='p' className='text-3xl font-medium'>
          Personal Information
        </Text>
        <Text as='p' color='gray' mb={'6'}>
          Add your basic information to create your profile
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Full Name
            </Text>
            <TextField.Root
              size="3"
              placeholder="John Doe"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name &&
              <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                <InfoCircledIcon height={"16"} width={"16"} />{errors.name.message}
              </Text>
            }
          </label>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Professional Title
            </Text>
            <TextField.Root
              size="3"
              placeholder="Full Stack Developer"
              {...register('title')}
            />
          </label>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Years of Experience
            </Text>
            <TextField.Root
              type='number'
              size="3"
              placeholder="5"
              {...register('yearsOfExperience', {
                min: { value: 0, message: 'Must be a non-negative number' }
              })}
            />
            {errors.yearsOfExperience &&
              <Text as='p' size={'1'} mt={'2'} color='red' className='flex items-center gap-1 '>
                <InfoCircledIcon height={"16"} width={"16"} />{errors.yearsOfExperience.message}
              </Text>
            }
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Profile Picture URL
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://example.com/profile.jpg"
              {...register('profilePictureUrl')}
            />
            <Text as="div" size="2" mt="1" color='gray'>
              Enter a URL to an image (no file uploads)
            </Text>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Bio
            </Text>
            <TextArea resize={'vertical'} size={'3'} placeholder="Tell us about yourself and your experience"
              {...register('bio')}
            />
          </label>
          <Separator size={'4'} />
          <Text as='p' className='text-xl font-medium'>
            Social Links
          </Text>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              GitHub
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://github.com/username"
              {...register('github')}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              LinkedIn
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://linkedin/in/username"
              {...register('linkedin')}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Twitter
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://twitter.com/username"
              {...register('twitter')}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Personal Website
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://yourwebsite.com"
              {...register('website')}
            />
          </label>
          <div className='text-right'>
            <Button
              highContrast
              size="3"
              type='submit'
              disabled={isPending}
            >
              <LuSave size={20} />
              {isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
