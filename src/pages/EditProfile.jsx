import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Avatar, Button, Separator, Text, TextArea, TextField } from '@radix-ui/themes';
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
    <div className=''>
      <Text as='p' className='text-2xl font-medium'>
        Personal Information
      </Text>
      <Text as='p' color='gray' size={'2'} mb={'4'}>
        Add your basic information to create your profile
      </Text>
      <Separator size={"4"} mb={'4'} />
      <div className='flex flex-col-reverse w-full lg:flex-row'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-6 md:max-w-md'>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Full Name
            </Text>
            <TextField.Root
              size="3"
              placeholder="John Doe"
              {...register('name', { required: 'Name is required' })}
            />
            <Text as="div" size="1" mt="1" color="gray">
              Use your real name or the one you're known professionally by.
            </Text>
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
            <Text as="div" size="1" mt="1" color="gray">
              E.g., “Frontend Developer”, “Full Stack Engineer”, “UI/UX Designer”
            </Text>
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
            <Text as="div" size="1" mt="1" color="gray">
              Enter a whole number (e.g., 3). Internships count too!
            </Text>
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
            <Text as="div" size="1" mt="1" color='gray'>
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
            <Text as="div" size="1" mt="1" color="gray">
              Share your background, specialties, and what you're passionate about.
            </Text>
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
            <Text as="div" size="1" mt="1" color="gray">
              Make sure your profile is public so others can view your work.
            </Text>
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
            <Text as="div" size="1" mt="1" color="gray">
              This helps others connect with you professionally.
            </Text>
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
          <div className=''>
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
        <div className='mb-6 lg:ml-12'>
          <Text as="div" size="2" mb="1" weight="bold">
            Profile Picture
          </Text>
          <div className='overflow-hidden rounded-full size-48'>
            <Avatar
              size={'9'}
              src={user?.profilePictureUrl}
              fallback={user?.name?.charAt(0)?.toUpperCase()}
              className='object-cover object-center w-full h-full rounded-full'
              highContrast
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
