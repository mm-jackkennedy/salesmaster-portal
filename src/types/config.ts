
/**
 * Configuration schema types for the application
 */

// Authentication provider configurations
export type MSEntraConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  authorityUrl?: string;
};

export type OktaConfig = {
  domain: string;
  clientId: string;
  clientSecret: string;
  issuer: string;
};

export type Auth0Config = {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
};

export type KeycloakConfig = {
  realm: string;
  clientId: string;
  clientSecret: string;
  authServerUrl: string;
  rolesMapping?: boolean;
};

export type OtherOpenIDConfig = {
  issuer: string;
  clientId: string;
  clientSecret: string;
  scopes?: string[];
};

// AI provider configurations
export type OpenAIConfig = {
  apiKey: string;
  modelSelectionLLM: "gpt-4" | "gpt-3.5";
  modelSelectionTextToSpeech?: "tts-1" | "tts-1-hd";
  textToSpeechVoice?: "Alloy" | "Echo" | "Fable" | "Onyx" | "Nova" | "Shimmer";
  modelSelectionSpeechToText?: "Whisper" | "TBD";
};

export type AWSConfig = {
  apiKey: string;
  modelSelectionLLM: "Bedrock" | "Comprehend";
  modelSelectionTextToSpeech?: "Polly" | "OtherAWSSpeechModel";
  textToSpeechVoice?: string;
  modelSelectionSpeechToText?: "Transcribe" | "OtherAWSSpeechToTextModel";
};

// Commerce provider configurations
export type CakeConfig = {
  apiKey: string;
  storeUrl: string;
  webhookEndpoint?: string;
};

export type AlohaConfig = {
  clientId: string;
  clientSecret: string;
  instanceUrl: string;
};

// Auth providers
export type AuthProvider = "MS Entra" | "Okta" | "Auth0" | "Keycloak" | "Other OpenID";

// AI providers
export type AIProvider = "OpenAI" | "AWS";

// Commerce providers
export type CommerceProvider = "Cake" | "Aloha";

// Application status
export type AppStatus = "dev" | "test" | "deployed" | "archived";

// Root config schema
export type AppConfig = {
  label: string;
  status: AppStatus;
  authProvider: AuthProvider;
  aiProvider: AIProvider;
  commerceProvider: CommerceProvider;
  authConfiguration?: MSEntraConfig | OktaConfig | Auth0Config | KeycloakConfig | OtherOpenIDConfig;
  aiConfiguration?: OpenAIConfig | AWSConfig;
  commerceConfiguration?: CakeConfig | AlohaConfig;
  useApi: boolean;
  apiBaseUrl: string;
};
