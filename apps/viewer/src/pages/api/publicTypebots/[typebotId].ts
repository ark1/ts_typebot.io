import prisma from '@typebot.io/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { initMiddleware, methodNotAllowed, notFound } from '@typebot.io/lib/api'

const corsOptions = {
  origin: 'https://typebotbuilder-oskptm5ol-ark1s-projects.vercel.app', // Allow only this origin
  methods: ['GET'], // Only allow GET requests
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}
const cors = initMiddleware(Cors())

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  if (req.method === 'GET') {
    const typebotId = req.query.typebotId as string
    const typebot = await prisma.publicTypebot.findUnique({
      where: { typebotId },
    })
    if (!typebot) return notFound(res)
    return res.send({ typebot })
  }
  methodNotAllowed(res)
}

export default handler
