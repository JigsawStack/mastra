import { AutomationBlueprint, WorkflowContextSelectedBlock } from '../../types';

import { WorkflowSidebarAction } from './workflow-sidebar-action';
import { WorkflowSidebarPath } from './workflow-sidebar-path';
import { WorkflowSidebarTrigger } from './workflow-sidebar-trigger';

export const RenderBlock = ({
  selectedBlock,
  constructedBlueprint,
}: {
  selectedBlock: WorkflowContextSelectedBlock;
  constructedBlueprint: AutomationBlueprint;
}) => {
  switch (selectedBlock.type) {
    case 'action':
      return <WorkflowSidebarAction action={selectedBlock.block} blueprintId={constructedBlueprint.id} />;
    case 'trigger':
      return <WorkflowSidebarTrigger trigger={selectedBlock.block} blueprintId={constructedBlueprint.id} />;
    case 'path':
      return <WorkflowSidebarPath path={selectedBlock.block} />;
    default:
      return null;
  }
};