import { Button, Separator, Text, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { LuSave } from "react-icons/lu";

function EditProfile() {
  return (
    <div className='p-6 py-8 md:px-12'>
      <div className='max-w-4xl mx-auto sm:border sm:p-6 sm:shadow-lg rounded-xl'>
        <Text as='p' className='text-3xl font-medium'>
          Personal Information
        </Text>
        <Text as='p' color='gray' mb={'6'}>
          Add your basic information to create your profile
        </Text>
        <form action="" className='flex flex-col gap-6'>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Full Name
            </Text>
            <TextField.Root
              size="3"
              placeholder="John Doe"
            />
          </label>
          <label className='col-span-1'>
            <Text as="div" size="2" mb="1" weight="bold">
              Professional Title
            </Text>
            <TextField.Root
              size="3"
              placeholder="Full Stack Developer"
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
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Profile Picture URL
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://example.com/profile.jpg"
            />
            <Text as="div" size="2" mt="1" color='gray'>
              Enter a URL to an image (no file uploads)
            </Text>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Bio
            </Text>
            <TextArea size={'3'} placeholder="Tell us about yourself and your experience" />
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
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              LinkedIn
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://linkedin/in/username"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Twitter
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://twitter.com/username"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Personal Website
            </Text>
            <TextField.Root
              size="3"
              placeholder="https://yourwebsite.com"
            />
          </label>
          <div className='text-right'>
            <Button
              highContrast
              size="3"
            >
              <LuSave size={20} />  Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
