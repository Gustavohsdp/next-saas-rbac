'use client'

import { Label } from '@radix-ui/react-label'
import { AlertTriangle, Loader2 } from 'lucide-react'

import { signUpAction } from '@/app/auth/sign-up/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'

export default function CreateOrganization() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    }
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Organization name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="domain">E-mail domain</Label>
          <Input
            name="domain"
            type="email"
            id="domain"
            inputMode="url"
            placeholder="example.com"
          />

          {errors?.domain && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.domain[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <Checkbox
              name="shouldAttachUsersByDomain"
              id="shouldAttachUsersByDomain"
              className="translate-y-0.5"
            />
            <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
              <span className="text-sm font-medium leading-none">
                Auto-join new members
              </span>
              <p className="text-sm text-muted-foreground">
                This will automatically invite all members with same e-mail
                domain to this organization.
              </p>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Save organization'
          )}
        </Button>
      </form>
    </div>
  )
}
