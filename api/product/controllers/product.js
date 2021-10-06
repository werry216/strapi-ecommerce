const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    let { slug } = ctx.params;
    slug = slug.split("||");
    const slugStr = slug[0];
    const locale = slug[1];
    const products = await strapi.services.product.find({_locale: locale});
    let entity = products.filter((res)=>{
      return res.slug === slugStr;
    });
    entity = (entity.length!==0) ? entity[0] : {};
    // const entity = await strapi.services.product.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
