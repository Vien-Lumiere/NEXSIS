import { useEffect, useRef, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';

const BACKOFF_INTERVALS = [3000, 5000, 10000]; // 3s, 5s, 10s

export const useWebSocket = () => {
  const { wsUrl, setConnectionStatus, triggerAlert } = useApp();
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const manualDisconnectRef = useRef(false);

  const connect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    console.log(`Connecting to WebSocket: ${wsUrl}`);
    setConnectionStatus('connecting');
    manualDisconnectRef.current = false;

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected successfully');
        setConnectionStatus('online');
        reconnectAttemptRef.current = 0; // Reset backoff on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          console.log('Received WebSocket message:', payload);
          if (payload.type === 'earthquake' && payload.data) {
            triggerAlert(payload.data);
          }
        } catch (err) {
          console.warn('Failed to parse WebSocket message:', err);
        }
      };

      ws.onclose = (event) => {
        console.log(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
        setConnectionStatus('offline');
        
        if (!manualDisconnectRef.current) {
          scheduleReconnect();
        }
      };

      ws.onerror = (error) => {
        console.warn('WebSocket encountered error:', error);
        setConnectionStatus('offline');
      };
    } catch (err) {
      console.error('Failed to create WebSocket client:', err);
      setConnectionStatus('offline');
      scheduleReconnect();
    }
  }, [wsUrl, setConnectionStatus, triggerAlert]);

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    const backoffIndex = Math.min(reconnectAttemptRef.current, BACKOFF_INTERVALS.length - 1);
    const delay = BACKOFF_INTERVALS[backoffIndex];
    reconnectAttemptRef.current += 1;

    console.log(`Scheduling reconnect in ${delay}ms (attempt ${reconnectAttemptRef.current})`);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  // Clean up and connect on wsUrl changes
  useEffect(() => {
    connect();

    return () => {
      manualDisconnectRef.current = true;
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [wsUrl, connect]);

  // Manual reconnect action triggered by user
  const manualReconnect = useCallback(() => {
    reconnectAttemptRef.current = 0;
    connect();
  }, [connect]);

  return { manualReconnect };
};
