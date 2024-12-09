import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SERVER_URL } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createLazyFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [handle, setHandle] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const res = await fetch(`https://${SERVER_URL}/oauth/login`, {
        method: 'POST',
        body: JSON.stringify({ actor: handle }),
        redirect: 'manual',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return res.json()
    },
    onSuccess: (resp: { url: string }) => {
      document.location.href = resp.url;
    },
  });

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Log in</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 pt-0">
        <Card className="max-w-xl w-full">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Don't have an account? <a className="font-bold text-primary" href="https://bsky.app/" target="_blank">Sign up on Bluesky!</a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="handle">Handle</Label>
              <Input
                className={`${error ? 'border-destructive text-destructive' : ''}`}
                type="text"
                id="handle"
                name="handle"
                placeholder="johndoe.bsky.social"
                required
                value={handle}
                onChange={e => setHandle(e.currentTarget.value)}
              />
              {error && <p className="text-sm font-medium text-destructive">{error.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => mutate()} disabled={isPending}>Log in</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
