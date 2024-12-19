import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { sleep } from '@/lib/utils'
import { createAuthorizationUrl, resolveFromIdentity } from '@atcute/oauth-browser-client'
import { useMutation } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/_/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [handle, setHandle] = useState('')

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      const { identity, metadata } = await resolveFromIdentity(handle);

      const authUrl = await createAuthorizationUrl({
        metadata: metadata,
        identity: identity,
        scope: 'atproto transition:generic',
      });

      await sleep(200);

      return authUrl;
    },
    onSuccess: async (authUrl: URL) => {
      window.location.assign(authUrl);

      await new Promise((_resolve, reject) => {
        const listener = () => {
          reject(new Error(`user aborted the login request`));
        };

        window.addEventListener('pageshow', listener, { once: true });
      });
    },
  })

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
        <Card className="max-w-sm w-full">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Enter your handle below to sign in to your account.
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
                onChange={(e) => setHandle(e.currentTarget.value)}
              />
              {error && (
                <p className="text-sm font-medium text-destructive">
                  {error.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="grid gap-2">
            <Button onClick={() => mutate()} disabled={isPending}>
              Log in
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <a
                className="font-bold text-primary"
                href="https://bsky.app/"
                target="_blank"
              >
                Sign up on Bluesky!
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
