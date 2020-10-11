const db = require('../sequelize');
const Ad = db.models.ad;
const Link = db.models.link;

async function getAll(req, res) {
  const ads = await Ad.findAll({
    include: ['links'],
  });

  return res.status(200).json(ads);
}

async function getOneById(req, res) {
  const { id } = req.params;
  console.log(req.query)

  const ad = await Ad.findByPk(id, { attributes: ['id', 'title'], include: ['links'] });
  // опциональные поля (можно запросить, передав параметр fields): описание, ссылки на все фото
  if (!ad) return res.status(404).json({ message: 'Ad not found' });
  return res.status(200).json(ad);
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