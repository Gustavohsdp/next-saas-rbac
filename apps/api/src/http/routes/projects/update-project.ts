import { projectSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequestError } from '@/http/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/_errors/unathourized-error'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function updateProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/projects/:projectId',
      {
        schema: {
          tags: ['projects'],
          summary: 'Update a new project.',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
            projectId: z.string().uuid(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMemberShip(slug)

        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
            organizationId: organization.id,
          },
        })

        if (!project) {
          throw new BadRequestError('Project not found.')
        }

        const { cannot } = getUserPermissions(userId, membership.role)
        const authProject = projectSchema.parse(project)

        if (cannot('update', authProject)) {
          throw new UnauthorizedError(
            'You are not allowed to update this project.',
          )
        }

        const { description, name } = request.body

        await prisma.project.update({
          where: {
            id: project.id,
          },
          data: {
            description,
            name,
          },
        })

        return reply.status(204).send()
      },
    )
}
