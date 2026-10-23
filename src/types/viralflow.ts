export type ViralAngle = {
  angle: string;
  rationale: string;
  targetEmotion: 'curiosity' | 'fear' | 'desire' | 'anger' | 'surprise';
};

export type ViralHook = {
  id: string;
  text: string;
  framework: string;
  reasoning: string;
};

export type ViralScript = {
  hook: string;
  body: {
    scene: string;
    text: string;
    visualCue: string;
  }[];
  cta: string;
};

export type RepurposedContent = {
  xThread: string[];
  linkedinPost: string;
};

export type ViralFlowResult = {
  angle: ViralAngle;
  hooks: ViralHook[];
  script?: ViralScript;
  repurposed?: RepurposedContent;
};
