import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      <section className="card-cta flex items-center justify-between">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interviews-Ready with AI-powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions & get instant feedback
          </p>
          <Link
  href="/interview"
  className="btn-primary max-sm:w-full flex items-center justify-center"
>
  Start an Interview
</Link>

        </div>

        <Image
          src="/robot.png"
          alt="robot-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
       <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          {/* <p>You haven&apos;t taken any interview yet.</p> */}
        </div>
      </section>
    </>
  );
};

export default Page;
