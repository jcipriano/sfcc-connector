import {
  Card,
  Form,
  FormField,
  FormFieldSecret,
  CardTitle,
  ConnectConfigurationSurface
} from "@netlify/sdk/ui/react/components";
import { trpc } from "../trpc";
import { useNetlifySDK } from "@netlify/sdk/ui/react";
import { CommonDataSourceSchema, ConnectSettings } from "../../schema/settings-schema";

export const ConnectConfiguration = () => {
  
  const sdk = useNetlifySDK();
  const baseInput = {
    dataLayerId: sdk.context.dataLayerId!,
    configurationId: sdk.context.configurationId ?? undefined,
  };
  const connectSettingsMutation = trpc.connectSettings.upsert.useMutation();

  const onSubmit = async (data: ConnectSettings & CommonDataSourceSchema) => {
    console.log(data);
    await connectSettingsMutation.mutateAsync({
      ...baseInput,
      name: data.name,
      prefix: data.prefix,
      config: data,
    });
    sdk.requestTermination();
  };

  return (
    <ConnectConfigurationSurface>
      <Card>
        <CardTitle>Salesforce Commerce Cloud Data Source Configuration</CardTitle>
        <Form 
          schema={ConnectSettings.merge(CommonDataSourceSchema)}
          onSubmit={onSubmit}>
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
              helpText="Temporary. Remove for production."
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