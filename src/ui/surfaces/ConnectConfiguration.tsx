import {
  Card,
  Form,
  FormField,
  FormFieldSecret,
  CardTitle,
  ConnectConfigurationSurface
} from "@netlify/sdk/ui/react/components";

export const ConnectConfiguration = () => {
  const onSubmit = (values) => {
    // Do something with form values
  };

  return (
    <ConnectConfigurationSurface>
      <Card>
        <CardTitle>Salesforce Commerce Cloud Data Source Configuration</CardTitle>
        <Form onSubmit={onSubmit}>
          <FormField label="Data Source Name" name="name" required />
              <FormField
                label="Data Source Prefix"
                name="prefix"
                helpText="The prefix to use for types synced from this data source. It must start with an uppercase letter and can only consist of alphanumeric characters and underscores. For example, Product becomes {Prefix}Product."
                required
              />
            <FormFieldSecret
              name="accessToken"
              type="text"
              label="Client Access Token"
              helpText="Temorary"
              required
            />
            <FormField
              name="clientId"
              type="text"
              label="Admin API Client ID"
              helpText="Reference the desired API Client in Account Manager."
              required
            />
            <FormFieldSecret
              name="clientSecret"
              type="text"
              label="Admin API Client Secret"
              helpText="The password that was set when the API Client was added in Account Manager."
              required
            />
            <FormField
              name="orgId"
              type="text"
              label="Organization ID"
              helpText="The organization ID is a short string that identifies a B2C Commerce instance. Example: f_ecom_zzte_053"
              required
            />
            <FormField
              name="shortCode"
              type="text"
              label="Short Code"
              helpText="The short code is an eight-character string that is assigned to a realm for routing purposes. Example: kv7kzm78"
              required
            />
            <FormField
              name="siteId"
              type="text"
              label="Site ID"
              helpText="The site ID is the name of the site (sometimes called a “channel”) for which you want to access data. Example: RefArch or SiteGenesis"
              required
            />
        </Form>
      </Card>
    </ConnectConfigurationSurface>
  );
};