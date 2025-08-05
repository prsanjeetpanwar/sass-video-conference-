import { AgentView, AgentsViewLoading } from '@/module/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './error';
import ListHeader from '@/module/agents/ui/components/list-header';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth/sign-in');
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <ListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<ErrorPage />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
