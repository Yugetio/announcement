const db = require('../sequelize');
const Ad = db.models.ad;
const Link = db.models.link;

async function getAll(req, res) {
  const { skip, limit: limitFromQuery, createdAt, price } = req.query;
  const parsSkip = parseInt(skip, 10);
  const parsLimit = parseInt(limitFromQuery, 10);
  let offset = !Number.isNaN(parsSkip) ? parsSkip : 0;
  let limit = !Number.isNaN(parsLimit) ? parsLimit : 10;
  let orderBy = [];

  if (createdAt) {
    if (createdAt == 'DESC') orderBy.push(['createdAt', 'DESC']);
    if (createdAt == 'ASC') orderBy.push(['createdAt', 'ASC']);
  }

  if (price) {
    if (price == 'DESC') orderBy.push(['price', 'DESC']);
    if (price == 'ASC') orderBy.push(['price', 'ASC']);
  }

  try {
    const ads = await Ad.findAll({
      attributes: ['title', 'price'],
      include: [
        {
          model: Link,
          as: 'links',
          attributes: ['id', 'link'],
          limit: 1,
        },
      ],
      order: orderBy,
      offset,
      limit,
    });
    return res.status(200).json(ads);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getOneById(req, res) {
  const id = parseInt(req.params.id, 10);
  const { filds } = req.query;
  let limitForLinks = 1;

  if (typeof id !== 'number' || Number.isNaN(id))
    return res.status(422).json({ message: 'Invalid id' });

  const attributes = ['id', 'title', 'price'];

  if (filds && filds.length > 0) {
    if (filds.indexOf('description') != -1) attributes.push('description');
    if (filds.indexOf('links') != -1) limitForLinks = 3;
  }
  try {
    const ad = await Ad.findByPk(id, {
      attributes,
      include: [
        {
          model: Link,
          as: 'links',
          attributes: ['id', 'link'],
          limit: limitForLinks,
        },
      ],
    });

    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    return res.status(200).json(ad);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function create(req, res) {
  const { title, description, price, links } = req.body;

  if (
    typeof title !== 'string' ||
    typeof title !== 'string' ||
    !(Array.isArray(links) && links.every((l) => typeof l === 'string')) ||
    typeof price !== 'number'
  )
    return res.status(422).json({ message: 'Invalid data format' });

  if (title.length > 200)
    return res
      .status(422)
      .json({ message: 'Title must not exceed 200 characters' });

  if (description.length > 1000)
    return res
      .status(422)
      .json({ message: 'Description must not exceed 1000 characters' });

  if (links.length > 3)
    return res.status(422).json({ message: 'should be no more than 3 links' });
  try {
    const newAd = await Ad.create({
      title,
      description,
      price,
    });

    const reqLink = links.map((link) =>
      Link.create({
        adId: newAd.id,
        link: link,
      })
    );

    await Promise.all(reqLink);

    return res.status(200).json({ adId: newAd.id, message: 'Success!!!' });
  } catch (error) {
    return res.status(500).json({ message: 'error while saving data' });
  }
}

module.exports = {
  getAll,
  getOneById,
  create,
};
