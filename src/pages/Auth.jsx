import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import { Link, ScrollRestoration } from 'react-router'
import Login from '../components/Login'
import Logo from '../components/Logo'
import Register from '../components/Register'

const featureCards = [
  {
    title: "Create Your Profile",
    description: "Showcase your technical expertise with details about your experience and projects.",
  },
  {
    title: "Add Verifiable Skills",
    description: "Document your technical skills with proficiency levels and years of experience.",
  },
  {
    title: "Get Peer Endorsements",
    description: "Get your skills verified by other developers in the community, building credibility and trust.",
  },
];


function Auth() {
  const [isSignInPage, setIsSignInPage] = useState(true)

  return (
    <>
      <ScrollRestoration />
      <div className='flex flex-col min-h-screen bg-[--gray-a3] md:p-8'>
        <div className='flex flex-col flex-1 w-full max-w-6xl mx-auto overflow-hidden md:shadow-xl md:rounded-2xl md:flex-row'>
          <div className='flex flex-col flex-1 gap-6 p-8 bg-[--color-background]'>
            <div className='hidden md:block'>
              <Button
                variant='ghost'
                highContrast
                color='gray'
                className='w-max'
                asChild
              >
                <Link
                  to={"/"}
                >
                  <ArrowLeftIcon />  Back
                </Link>
              </Button>
            </div>
            <div className='relative flex font-medium bg-[--gray-a3] border-4 border-[--gray-3] rounded-lg '>
              <div className={`absolute w-1/2  rounded-md top-0 h-full ${isSignInPage ? "" : "translate-x-full"} transition-transform duration-300 shadow bg-[--color-background]`} />
              <button
                className={`flex-1 bg-transparent z-10 p-[6px] ${isSignInPage ? "" : "opacity-70"} transition-opacity duration-300`}
                onClick={() => setIsSignInPage(true)}
              >
                Sign in
              </button>
              <button
                className={`flex-1 bg-transparent z-10 p-[6px] ${isSignInPage ? "opacity-70" : ""} transition-opacity duration-300`}
                onClick={() => setIsSignInPage(false)}
              >
                Register
              </button>
            </div>
            <div className='space-y-4'>
              <h1 className='text-2xl font-bold'>
                {isSignInPage ? (
                  "Welcome back"
                ) : (
                  "Create an account"
                )}
              </h1>
              <Text as='p' color='gray'>
                {isSignInPage ? (
                  "Sign in to your DevPortfolio account to manage your skills and endorsements"
                ) : (
                  "Enter your information to create a DevPortfolio account"
                )}

              </Text>
            </div>
            {
              isSignInPage
                ? <Login />
                : <Register />
            }
          </div >
          <section className='bg-[--accent-12] flex-1 p-8 flex-col gap-6 flex'>
            <Logo />
            <Text as='p' size={'7'} weight={'bold'} className='text-[--gray-1]'>
              Where developers showcase their {" "}
              <Text as='span' className='text-[--accent-6]'>
                verified skills
              </Text>
            </Text>
            <Text as='p' size={'4'} className='text-[--gray-3]'>
              Build a professional developer profile with peer-verified skills and get discovered by employers looking for your expertise.
            </Text>
            <div className='flex flex-col gap-4 text-[--gray-1]'>
              {featureCards.map(({ title, description }, idx) => (
                <div key={idx} className='border p-5 rounded-xl border-[--accent-a9] bg-[--accent-a3] backdrop-blur-md'>
                  <Text as='p' mb={'2'} weight={'medium'}>
                    {title}
                  </Text>
                  <Text as='p' size={'2'} className='text-[--gray-3]'>
                    {description}
                  </Text>
                </div>
              ))}
            </div>
          </section>
        </div >
      </div>
    </>
  )
}

export default Auth
