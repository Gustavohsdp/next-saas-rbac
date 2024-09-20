import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name"></Input>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email"></Input>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Password</Label>
        <Input
          name="password_confirmation"
          type="password_confirmation"
          id="password_confirmation"
        ></Input>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Confirm your password</Label>
        <Input name="password" type="password" id="password"></Input>
      </div>

      <Button type="submit" className="w-full">
        Create account
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Already registered? Sign in</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign up with Github
      </Button>
    </form>
  )
}
