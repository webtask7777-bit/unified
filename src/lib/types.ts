export type ToolId = 'home' | 'darkmatter' | 'motion' | 'timedilation' | 'wormhole' | 'spacetimemesh' | 'freeenergy' | 'unifiedfield' | 'symmetrybreaker' | 'infiniteseries' | 'entanglement' | 'discovery' | 'dishanirdesh' | 'researchlab' | 'scientistprofiles' | 'aibrain' | 'scientistchat';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskRequest {
  tool: ToolId;
  subType?: string;
  input: string;
  sliders?: Record<string, string>;
}

export interface GutRequest {
  messages: ChatMessage[];
}

export interface NavItem {
  id: ToolId;
  icon: string;
  title: string;
  subtitle: string;
  dimColor: string;
  group: string;
}

export interface ChipPreset {
  icon: string;
  label: string;
  value: string;
}
