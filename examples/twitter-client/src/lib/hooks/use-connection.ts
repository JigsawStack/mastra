'use client';

import { Connection } from '@arkw/core';
import { useEffect, useState } from 'react';

import { getConnectionByReferenceId, getOAuthConnectionRoute } from '../actions';

export const useConnection = ({ name }: { name: string }) => {
  const [error, setError] = useState<unknown>();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [oAuthConnectionRoute, setOAuthConnectionRoute] = useState('');
  const referenceId = 'user-1';

  useEffect(() => {
    const getConnection = async () => {
      if (!name || !referenceId) return;

      try {
        setIsLoading(true);
        const newOAuthConnectionRoute = await getOAuthConnectionRoute({ name, referenceId });
        setOAuthConnectionRoute(newOAuthConnectionRoute);
        const newConnection = await getConnectionByReferenceId({ name, referenceId });
        setConnection(newConnection);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    getConnection();
  }, [name, referenceId]);

  return { oAuthConnectionRoute, connection, isLoading, error };
};