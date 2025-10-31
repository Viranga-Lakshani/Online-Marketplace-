import express from 'express';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

function getUserIdFromHeader(req: express.Request) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.replace('Bearer ', '');
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    return payload.userId as number;
  } catch {
    return null;
  }
}

router.post('/', async (req, res) => {
  const userId = getUserIdFromHeader(req);
  if (!userId) return res.status(401).json({ error: 'unauthorized' });

  const { title, description, priceCents, imageUrl } = req.body;
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      priceCents,
      imageUrl,
      ownerId: userId,
    }
  });
  res.json({ listing });
});

router.get('/', async (req, res) => {
  const listings = await prisma.listing.findMany({ include: { owner: true }, orderBy: { createdAt: 'desc' } });
  res.json({ listings });
});

export default router;
