import { Role } from '@saas/auth'

import { api } from './http-client'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function getMembership(org: string) {
  const response = await api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()

  return response
}
