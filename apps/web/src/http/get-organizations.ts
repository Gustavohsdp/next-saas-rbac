import { api } from './http-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    slug: string
    name: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations() {
  const response = await api
    .get('organizations')
    .json<GetOrganizationsResponse>()

  return response
}
