import { startCase } from 'lodash';
import React from 'react';

import { Icon } from '@/app/components/icon';
import NumberAnimator from '@/app/components/number-animator';
import { IconName } from '@/types/icons';

import { getSyncedDataByEntity, watchEntityTypeStatusAction } from '../actions';

interface EntitySyncedProps {
  iconName: IconName;
  referenceId: string | undefined;
  integrationName: string;
  label: string;
  defaultCount: number;
  canAddLetterS: boolean;
  entityType: string;
}

export const EntitySynced = ({
  iconName,
  integrationName,
  referenceId,
  label,
  defaultCount,
  canAddLetterS,
  entityType,
}: EntitySyncedProps) => {
  const [count, setCount] = React.useState(defaultCount);

  React.useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    try {
      const pollForUpdate = async () => {
        if (referenceId && entityType !== 'ACTION') {
          const { lastSyncId, recordCount } = await getSyncedDataByEntity({
            referenceId,
            entityType,
            integrationName,
          });

          if (!lastSyncId) {
            return pollForUpdate();
          }

          const status = await watchEntityTypeStatusAction({
            lastSyncId,
          });

          if (status !== 'Completed') {
            pollForUpdate();
          }

          if (recordCount) {
            setCount(recordCount);
          }
        }
      };

      timeOutId = setTimeout(pollForUpdate, 1000);
    } catch (err) {}

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId);
      }
    };
  }, []);

  return (
    <div className="flex gap-2.5">
      <div className="flex items-center text-kpl-el-3 bg-[#5F783E]/10 rounded-[3px] w-10 h-10 justify-center ">
        <Icon name={iconName} width={14} height={14} />
      </div>
      <span className="h-10 px-4 flex text-kpl-el-5 text-[13px] font-medium items-center bg-gradient-radial">
        <NumberAnimator value={count} /> &nbsp;{startCase(label)}
        {canAddLetterS ? 's' : ''}
      </span>
    </div>
  );
};