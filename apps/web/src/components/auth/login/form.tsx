'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation, useResolveHandle } from "@/queries/auth/handleResolver";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from '@uidotdev/usehooks';
import { LoaderCircle } from "lucide-react";

export const LoginForm = () => {
  const [currentError, setCurrentError] = useState<Error | null>(null);
  const [handle, setHandle] = useState('');
  const [handleDebounced] = useDebounce([handle], 1000);

  const { data, error, isLoading, isSuccess } = useResolveHandle(handleDebounced);
  const {
    mutate: login,
    error: loginError,
    isPending: isLoginLoading
  } = useLoginMutation();

  const onLogin = () => {
    if (!data) return;
    login({ did: data.did });
  };

  useEffect(() => {
    if (error) setCurrentError(error);
    if (loginError) setCurrentError(loginError);
    else setCurrentError(null);
  }, [error, loginError]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Log in</CardTitle>
        <CardDescription>
          Enter your Bluesky handle below to log in to your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="handle">
                Handle
              </Label>
              {isLoading && <LoaderCircle className="text-muted-foreground size-3 animate-spin" />}
            </div>
            <Input
              id="handle"
              type="text"
              placeholder="jdoe.bsky.social"
              required
              value={handle}
              onChange={e => setHandle(e.currentTarget.value)}
              className={
                (error || loginError)
                  ? 'border-destructive/50 focus:ring-1 focus-visible:ring-destructive'
                  : ''
              }
            />
            {
              currentError && (
                <p className="text-sm text-destructive">
                  {`${currentError.message} (${currentError.cause || currentError.name})`}
                </p>
              )
            }
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isSuccess || isLoginLoading}
            onClick={onLogin}
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="https://bsky.app" className="underline">
            Sign up on Bluesky
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
