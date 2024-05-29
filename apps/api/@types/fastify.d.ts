import 'fastify';

import { Member, Organization } from '@prisma/client';

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId: () => Promise<string>
    getUserMemberShip: (
      slug: string,
    ) => Promise<{ organization: Organization; membership: Member }>
  }
}
