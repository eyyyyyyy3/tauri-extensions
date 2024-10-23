import { z } from "zod";

const runtimeEnum = z.enum(["native", "web", "universal"]);

//Manifest description for Manifest version 1
export const schema = z.object({
  manifestVersion: z.literal("1.0"),                      //Manifest Version. Predefined values which we make public to developers.
  apiVersion: z.string(),                                 //The api version required to run this plugin. Version must be parseable by node-semver.
  runtime: runtimeEnum,                                   //Where the extension is intended to run. Native has fs access for example
  name: z.string(),                                       //The extensions name. 
  publisher: z.string(),                                  //The extension publisher. This is also unique t the Marketplace.
  version: z.string(),                                    //The version of the current extension. Version must be parseable by node-semver.
  license: z.string(),                                    //https://docs.npmjs.com/cli/v7/configuring-npm/package-json#license
  displayName: z.string(),                                //The display name for the extension used in the Marketplace. It is unique.
  description: z.string().optional(),                     //A description of the extension
  sponsor: z.string().url().optional(),                   //A link for people if they want to sponsor the extension
  entrypoint: z.string(),                                 //The name of the entrypoint of the extension
  extensionDependencies: z.string().array().optional(),   //If extensions depend on other extensions, they can be defined in here
  icon: z.string(),                                       //The path to the icon of the extension. Check size later
  developmentKey: z.string().optional(),                  //Used for partners who want access to the DB
})


export interface IManifest {
  manifestVersion(): string;
  apiVersion(): string;
  runtime(): string;
  publisher(): string;
  name(): string;
  identifier(): string; //the combination of publisher.name
  version(): string;
  license(): string;
  displayName(): string;
  description(): string | undefined;
  sponsor(): string | undefined;
  entrypoint(): string;
  extensionDependencies(): string[] | undefined;
  icon(): string;
  developmentKey(): string | undefined;
}

export class Manifest implements IManifest {
  #parsedData: z.infer<typeof schema>;
  constructor(data: z.infer<typeof schema>) {
    this.#parsedData = data;
  };

  manifestVersion(): string {
    return this.#parsedData.manifestVersion;
  }
  apiVersion(): string {
    return this.#parsedData.apiVersion;
  }
  runtime(): string {
    return this.#parsedData.runtime;
  }
  publisher(): string {
    return this.#parsedData.publisher;
  }
  name(): string {
    return this.#parsedData.name;
  }
  identifier(): string {
    return this.#parsedData.publisher.concat(".", this.#parsedData.name);
  }
  version(): string {
    return this.#parsedData.version;
  }
  license(): string {
    return this.#parsedData.license;//TODO: maybe have some nicer license thing going on
  }
  displayName(): string {
    return this.#parsedData.displayName;
  }
  description(): string | undefined {
    return this.#parsedData.description;
  }
  sponsor(): string | undefined {
    return this.#parsedData.sponsor;
  }
  entrypoint(): string {
    return this.#parsedData.entrypoint;
  }
  extensionDependencies(): string[] | undefined {
    return this.#parsedData.extensionDependencies;
  }
  icon(): string {
    return this.#parsedData.icon;
  }
  developmentKey(): string | undefined {
    return this.#parsedData.developmentKey;
  }
}