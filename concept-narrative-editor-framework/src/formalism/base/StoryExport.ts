// idea: Use JSON schema for this?
type TriggerSystemExport = {
    storyArcs: StoryArc[];
    data: any;
};

type StoryArc = {
    availableCondition: any;
    label: string;
    data: any;
    id: string;
    storyNodes: StoryNode[];
    isRetained: boolean;
    metadata: any;
    isEnd: boolean;
    unlockCondition: any;
};

type StoryNode = {
    availableCondition: any;
    label: string;
    data: any;
    id: string;
    isRetained: boolean;
    metadata: any;
    isEnd: boolean;
    unlockCondition: any;
};

export { TriggerSystemExport, StoryArc, StoryNode };