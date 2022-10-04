/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/install/settings": {
    get: operations["GetInstallSettings"];
  };
  "/install/setup": {
    post: operations["PostInstallSetup"];
  };
  "/install/validateDatabase": {
    post: operations["PostInstallValidateDatabase"];
  };
  "/manifests": {
    get: operations["Manifests"];
  };
  "/manifests/packages": {
    get: operations["ManifestsPackages"];
  };
  "/manifests/packages/installed": {
    get: operations["ManifestsPackagesInstalled"];
  };
  "/property-editors/list": {
    get: operations["PropertyEditorsListEndpoint"];
  };
  "/property-editors/property-editor/{propertyEditorAlias}": {
    get: operations["PropertyEditorEndpoint"];
  };
  "/property-editors/property-editor/config/{propertyEditorAlias}": {
    get: operations["PropertyEditorConfigEndpoint"];
  };
  "/published-cache/status": {
    get: operations["PublishedCacheStatus"];
  };
  "/published-cache/reload": {
    post: operations["PublishedCacheReload"];
  };
  "/server/status": {
    get: operations["GetStatus"];
  };
  "/server/version": {
    get: operations["GetVersion"];
  };
  "/upgrade/settings": {
    get: operations["GetUpgradeSettings"];
  };
  "/upgrade/authorize": {
    post: operations["PostUpgradeAuthorize"];
  };
  "/user": {
    get: operations["GetUser"];
  };
  "/user/login": {
    post: operations["PostUserLogin"];
  };
  "/user/logout": {
    post: operations["PostUserLogout"];
  };
  "/user/sections": {
    get: operations["GetAllowedSections"];
  };
}

export interface components {
  schemas: {
    /** @enum {string} */
    ConsentLevel: "Minimal" | "Basic" | "Detailed";
    TelemetryModel: {
      level: components["schemas"]["ConsentLevel"];
      description: string;
    };
    InstallUserModel: {
      /** Format: float */
      minCharLength: number;
      /** Format: float */
      minNonAlphaNumericLength: number;
      consentLevels: components["schemas"]["TelemetryModel"][];
    };
    InstallDatabaseModel: {
      id: string;
      /** Format: float */
      sortOrder: number;
      displayName: string;
      defaultDatabaseName: string;
      providerName: string | null;
      isConfigured: boolean;
      requiresServer: boolean;
      serverPlaceholder: string | null;
      requiresCredentials: boolean;
      supportsIntegratedAuthentication: boolean;
      requiresConnectionTest: boolean;
    };
    InstallSettingsResponse: {
      user: components["schemas"]["InstallUserModel"];
      databases: components["schemas"]["InstallDatabaseModel"][];
    };
    ProblemDetails: {
      type: string;
      /** Format: float */
      status: number;
      title?: string;
      detail?: string;
      instance?: string;
      errors?: { [key: string]: unknown };
    };
    InstallSetupUserConfiguration: {
      name: string;
      email: string;
      password: string;
      subscribeToNewsletter: boolean;
    };
    InstallSetupDatabaseConfiguration: {
      id?: string;
      server?: string | null;
      password?: string | null;
      username?: string | null;
      name?: string | null;
      providerName?: string | null;
      useIntegratedAuthentication?: boolean | null;
      connectionString?: string | null;
    };
    InstallSetupRequest: {
      user: components["schemas"]["InstallSetupUserConfiguration"];
      telemetryLevel: components["schemas"]["ConsentLevel"];
      database?: components["schemas"]["InstallSetupDatabaseConfiguration"];
    };
    MetaSection: {
      pathname: string;
      /** Format: float */
      weight: number;
    };
    IManifestSection: {
      /** @enum {string} */
      type: "section";
      meta: components["schemas"]["MetaSection"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaTree: {
      /** Format: float */
      weight: number;
      sections: string[];
    };
    IManifestTree: {
      /** @enum {string} */
      type: "tree";
      meta: components["schemas"]["MetaTree"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaEditor: {
      entityType: string;
    };
    IManifestEditor: {
      /** @enum {string} */
      type: "editor";
      meta: components["schemas"]["MetaEditor"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaEditorAction: {
      editors: string[];
    };
    IManifestEditorAction: {
      /** @enum {string} */
      type: "editorAction";
      meta: components["schemas"]["MetaEditorAction"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaEditorView: {
      editors: string[];
      pathname: string;
      /** Format: float */
      weight: number;
      label: string;
      icon: string;
    };
    IManifestEditorView: {
      /** @enum {string} */
      type: "editorView";
      meta: components["schemas"]["MetaEditorView"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaTreeItemAction: {
      trees: string[];
      label: string;
      icon: string;
      /** Format: float */
      weight: number;
    };
    IManifestTreeItemAction: {
      /** @enum {string} */
      type: "treeItemAction";
      meta: components["schemas"]["MetaTreeItemAction"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    PropertyEditorConfigProperty: {
      label: string;
      description?: string;
      alias: string;
      propertyEditorUI: string;
    };
    PropertyEditorConfigDefaultData: {
      alias: string;
      value:
        | (
            | string
            | number
            | boolean
            | { [key: string]: unknown }
            | string[]
            | number[]
            | boolean[]
            | { [key: string]: unknown }[]
          )
        | null;
    };
    PropertyEditorConfig: {
      properties: components["schemas"]["PropertyEditorConfigProperty"][];
      defaultData?: components["schemas"]["PropertyEditorConfigDefaultData"][];
    };
    MetaPropertyEditorUI: {
      label: string;
      propertyEditor: string;
      icon: string;
      group: string;
      config?: components["schemas"]["PropertyEditorConfig"];
    };
    IManifestPropertyEditorUI: {
      /** @enum {string} */
      type: "propertyEditorUI";
      meta: components["schemas"]["MetaPropertyEditorUI"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaDashboard: {
      sections: string[];
      pathname: string;
      /** Format: float */
      weight: number;
      label?: string;
    };
    IManifestDashboard: {
      /** @enum {string} */
      type: "dashboard";
      meta: components["schemas"]["MetaDashboard"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaPropertyAction: {
      propertyEditors: string[];
    };
    IManifestPropertyAction: {
      /** @enum {string} */
      type: "propertyAction";
      meta: components["schemas"]["MetaPropertyAction"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    MetaPackageView: {
      packageAlias: string;
    };
    IManifestPackageView: {
      /** @enum {string} */
      type: "packageView";
      meta: components["schemas"]["MetaPackageView"];
      js?: string;
      elementName?: string;
      alias: string;
      name: string;
    };
    IManifestEntrypoint: {
      /** @enum {string} */
      type: "entrypoint";
      js: string;
      alias: string;
      name: string;
    };
    IManifestCustom: {
      /** @enum {string} */
      type: "custom";
      meta?: { [key: string]: unknown };
      alias: string;
      name: string;
    };
    Manifest:
      | components["schemas"]["IManifestSection"]
      | components["schemas"]["IManifestTree"]
      | components["schemas"]["IManifestEditor"]
      | components["schemas"]["IManifestEditorAction"]
      | components["schemas"]["IManifestEditorView"]
      | components["schemas"]["IManifestTreeItemAction"]
      | components["schemas"]["IManifestPropertyEditorUI"]
      | components["schemas"]["IManifestDashboard"]
      | components["schemas"]["IManifestPropertyAction"]
      | components["schemas"]["IManifestPackageView"]
      | components["schemas"]["IManifestEntrypoint"]
      | components["schemas"]["IManifestCustom"];
    ManifestsResponse: {
      manifests: components["schemas"]["Manifest"][];
    };
    PackageInstalled: {
      id: string;
      name: string;
      alias: string;
      version: string;
      hasMigrations: boolean;
      hasPendingMigrations: boolean;
      plans: { [key: string]: unknown }[];
    };
    ManifestsPackagesInstalledResponse: {
      packages: components["schemas"]["PackageInstalled"][];
    };
    PropertyEditor: {
      alias: string;
      name: string;
      icon: string;
      group?: string;
      isSystem: boolean;
      hasConfig: boolean;
      config?: components["schemas"]["PropertyEditorConfig"];
    };
    PropertyEditorsListResponse: {
      propertyEditors: components["schemas"]["PropertyEditor"][];
    };
    PropertyEditorResponse: {
      alias: string;
      name: string;
      icon: string;
      group?: string;
      isSystem: boolean;
      hasConfig: boolean;
      config?: components["schemas"]["PropertyEditorConfig"];
    };
    PropertyEditorConfigResponse: {
      properties: components["schemas"]["PropertyEditorConfigProperty"][];
      defaultData?: components["schemas"]["PropertyEditorConfigDefaultData"][];
    };
    /** @enum {string} */
    ServerStatus: "running" | "must-install" | "must-upgrade";
    StatusResponse: {
      serverStatus: components["schemas"]["ServerStatus"];
    };
    VersionResponse: {
      version: string;
    };
    UpgradeSettingsResponse: {
      currentState: string;
      newState: string;
      newVersion: string;
      oldVersion: string;
      reportUrl: string;
    };
    UserResponse: {
      username: string;
      role: string;
    };
    UserLoginRequest: {
      username: string;
      password: string;
      persist: boolean;
    };
    AllowedSectionsResponse: {
      sections: string[];
    };
  };
}

export interface operations {
  GetInstallSettings: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["InstallSettingsResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PostInstallSetup: {
    parameters: {};
    responses: {
      /** 201 response */
      201: unknown;
      /** 400 response */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["InstallSetupRequest"];
      };
    };
  };
  PostInstallValidateDatabase: {
    parameters: {};
    responses: {
      /** 201 response */
      201: unknown;
      /** 400 response */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["InstallSetupDatabaseConfiguration"];
      };
    };
  };
  Manifests: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["ManifestsResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  ManifestsPackages: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": { [key: string]: unknown };
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  ManifestsPackagesInstalled: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["ManifestsPackagesInstalledResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PropertyEditorsListEndpoint: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["PropertyEditorsListResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PropertyEditorEndpoint: {
    parameters: {
      path: {
        propertyEditorAlias: string;
      };
    };
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["PropertyEditorResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PropertyEditorConfigEndpoint: {
    parameters: {
      path: {
        propertyEditorAlias: string;
      };
    };
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["PropertyEditorConfigResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PublishedCacheStatus: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": string;
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PublishedCacheReload: {
    parameters: {};
    responses: {
      /** 201 response */
      201: unknown;
      /** 400 response */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetStatus: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["StatusResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetVersion: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["VersionResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetUpgradeSettings: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["UpgradeSettingsResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PostUpgradeAuthorize: {
    parameters: {};
    responses: {
      /** 201 response */
      201: unknown;
      /** 400 response */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetUser: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
      /** 403 response */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  PostUserLogin: {
    parameters: {};
    responses: {
      /** 201 response */
      201: unknown;
      /** 403 response */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserLoginRequest"];
      };
    };
  };
  PostUserLogout: {
    responses: {
      /** 201 response */
      201: unknown;
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetAllowedSections: {
    responses: {
      /** 200 response */
      200: {
        content: {
          "application/json": components["schemas"]["AllowedSectionsResponse"];
        };
      };
      /** default response */
      default: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
}

export interface external {}
