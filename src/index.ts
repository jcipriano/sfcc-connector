// Documentation: https://sdk.netlify.com
import { NetlifyExtension } from "@netlify/sdk";
import { Product } from "commerce-sdk";

const extension = new NetlifyExtension();
const connector = extension.addConnector({
  typePrefix: "Sfcc",
  supports: {
    connect: true,
    visualEditor: false,
  },
  // localDevOptions emulates a user setting configuration
  // options in the Netlify UI. localDevOptions only runs
  // during local development.
  localDevOptions: {
    clientId: "",
    clientSecret: "",
    orgId: "",
    shortCode: "",
    siteId: "",
    accessToken: ""
  },
  // Extension options
  defineOptions: ({ zod }) => {
    return zod.object({ 
      accessToken: zod.string().meta({
        label: "Admin API Access Token",
        helpText: "Temporary",
        secret: true
      }),
      clientId: zod.string().meta({
        label: "Admin API Client ID",
        helpText: "Reference the desired API Client in Account Manager.",
      }),
      clientSecret: zod.string().meta({
        label: "Admin API Client Secret",
        helpText: "The password that was set when the API Client was added in Account Manager.",
        secret: true
      }),
      orgId: zod.string().meta({
        label: "Organization ID",
        helpText: "The organization ID is a short string that identifies a B2C Commerce instance. Example: f_ecom_zzte_053",
      }),
      shortCode: zod.string().meta({
        label: "Short Code",
        helpText: "The short code is an eight-character string that is assigned to a realm for routing purposes. Example: kv7kzm78"
      }),
      siteId: zod.string().meta({
        label: "Site ID",
        helpText: "The site ID is the name of the site (sometimes called a “channel”) for which you want to access data. Example: RefArch or SiteGenesis"
      })
    });
  }
});


/**
 * Define your content models here.
 * https://developers.netlify.com/sdk/api-reference/classes/netlifyconnector/#model
 */
connector.model(async ({ define }) => {

  define.document({
    name: "Product",
    fields: {
      creationDate: { type: "Date", required: true, },
      productId: { type: "String", required: true, },
      lastModified: { type: "Date", required: true, },
      image: { type: "JSON", required: false, },
      imageGroups: { type: "JSON", required: false },
      inStock: { type: "Boolean", required: true, },
      longDescription: { type: "JSON", required: false }, // contains localized strings
      shortDescription: { type: "JSON", required: false }, // contains localized strings
      name: { type: "JSON", required: false }, // contains localized strings
      online:  { type: "Boolean", required: true, },
      onlineFlag: { type: "JSON", required: false },
      owningCatalogId: { type: "String", required: true, },
      owningCatalogName: { type: "JSON", required: false }, // contains localized strings
      pageDescription: { type: "JSON", required: false }, // contains localized strings
      pageTitle: { type: "JSON", required: false }, // contains localized strings
      price: { type: "Int", required: true, },
      priceCurrency: { type: "String", required: true, },
      taxClassId: { type: "String", required: true, },
      searchable: { type: "JSON", required: false },
      type: { type: "JSON", required: false },
      unitQuantity: { type: "Int", required: true, },
      upc: { type: "String", required: true, },
      // These might be custom fields. This part of the model may need to be dynamically created or post processed into a single JSON object.
      c_color: { type: "String", required: true, },
      c_refinementColor: { type: "String", required: true, },
      c_size: { type: "String", required: true, },
      c_width: { type: "String", required: true, },
    },
  });

});

/**
 * Fetch and store data from your API here.
 * https://developers.netlify.com/sdk/api-reference/classes/netlifyconnector/#sync
 */
connector.sync(async ({ models, isInitialSync, options: { accessToken, clientId, clientSecret, orgId, shortCode, siteId } }) => {

  console.log('connector.sync');

  /**
   * SFCC Client configuration parameters
   * The access token is hardcoded above. Need to add an API request to refresh the token.
   **/
  const sfccConfig = {
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    parameters: {
      clientId: clientId,
      organizationId: orgId,
      shortCode: shortCode,
      siteId: siteId
    }
  }

  /** 
   * Invoke product search request
   * https://salesforcecommercecloud.github.io/commerce-sdk/classes/product.products.html#searchproducts
   * https://developer.salesforce.com/docs/commerce/commerce-api/references/catalogs?meta=type%3AQuery
   */
  const client = new Product.Products(sfccConfig)
  const response = await client.searchProducts({
    body: {
      query: {
        matchAllQuery: {} // gets all products
      },
      limit: 10
    }
  },);

  // loop through search results. Currently not paging.
  const totalResults = response.hits.length;
  for (let i = 0; i < totalResults; i++) {

    var product = response.hits[i]
    product.productId = product.id;

    // requried properties?
    product._createdAt = new Date();
    product._status = "published";

    switch (true) {
      case isInitialSync: {

        models.Product.insert(product);

        break;
      }
      case !isInitialSync: {
        // just doing the same as the intial sync
        models.Product.insert(product);

      }
    }
  }

});

export { extension };

