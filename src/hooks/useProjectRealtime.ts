"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Project, BuilderComponent, SiteTheme } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";

export type Collaborator = {
  id: string;
  name: string;
  avatarUrl?: string;
  color: string;
  joinedAt: string;
};

export function useProjectRealtime(
  initialProject: Project,
  onRemoteUpdate?: (payload: { components?: BuilderComponent[]; theme?: SiteTheme; name?: string }) => void
) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const supabase = createClient();
  const projectId = String(initialProject.id);

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [remoteUpdatingUser, setRemoteUpdatingUser] = useState<string | null>(null);

  const onRemoteUpdateRef = useRef(onRemoteUpdate);
  useEffect(() => {
    onRemoteUpdateRef.current = onRemoteUpdate;
  }, [onRemoteUpdate]);

  const lastLocalSnapshotRef = useRef<string>("");

  // Generate consistent color for collaborator avatar
  const getCollaboratorColor = useCallback((id: string) => {
    const colors = [
      "#FF4500", "#1d9bf0", "#3ecf8e", "#8b5cf6",
      "#e11d48", "#f97316", "#06b6d4", "#a855f7",
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }, []);

  // 1. TanStack Query for Project fetching & caching
  const { data: project = initialProject, refetch } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      return res.json();
    },
    initialData: initialProject,
    staleTime: 1000 * 60, // 60s - purely event driven to avoid polling loops
  });

  // 2. TanStack Mutation for Project saving
  const saveMutation = useMutation({
    mutationFn: async (updatedData: {
      name?: string;
      description?: string;
      components?: BuilderComponent[];
      theme?: SiteTheme;
      isPublished?: boolean;
      slug?: string;
    }) => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Save failed");
      return res.json();
    },
    onSuccess: (updatedProject) => {
      queryClient.setQueryData(["project", projectId], updatedProject);
    },
  });

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // 3. Supabase Realtime Channel Setup (Broadcast + Presence)
  useEffect(() => {
    if (!projectId) return;

    const myId = user?.id || `anon-${Math.random().toString(36).substring(2, 9)}`;
    const myName =
      user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Guest Collaborator";
    const myAvatar = user?.user_metadata?.avatar_url || "";
    const myColor = getCollaboratorColor(myId);

    const channel = supabase.channel(`project_realtime:${projectId}`, {
      config: {
        presence: { key: myId },
        broadcast: { self: false, ack: false },
      },
    });

    channelRef.current = channel;

    // Presence: Track online collaborators
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const activeUsers: Collaborator[] = [];

        Object.keys(state).forEach((key) => {
          const presences = state[key] as unknown as Array<{
            id?: string;
            name?: string;
            avatarUrl?: string;
            color?: string;
            joinedAt?: string;
          }>;
          if (presences && presences.length > 0) {
            const p = presences[0];
            activeUsers.push({
              id: p.id || key,
              name: p.name || "Collaborator",
              avatarUrl: p.avatarUrl,
              color: p.color || "#FF4500",
              joinedAt: p.joinedAt || new Date().toISOString(),
            });
          }
        });

        setCollaborators(activeUsers);
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        const joined = (newPresences as unknown as Array<{ name?: string }>)[0];
        if (joined?.name && joined.name !== myName) {
          toast.info(`${joined.name} joined the canvas`, { duration: 2500 });
        }
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        const left = (leftPresences as unknown as Array<{ name?: string }>)[0];
        if (left?.name && left.name !== myName) {
          toast.info(`${left.name} left the canvas`, { duration: 2000 });
        }
      });

    // Broadcast: Listen for live canvas edits from other users
    channel.on("broadcast", { event: "canvas_update" }, (payload) => {
      if (payload.payload) {
        const { components, theme, name, senderId, senderName } = payload.payload as {
          components?: BuilderComponent[];
          theme?: SiteTheme;
          name?: string;
          senderId?: string;
          senderName?: string;
        };

        // Don't process broadcasts sent by ourselves
        if (senderId === myId) return;

        const payloadStr = JSON.stringify({ components, theme, name });
        if (payloadStr === lastLocalSnapshotRef.current) return;

        if (senderName) {
          setRemoteUpdatingUser(senderName);
          setTimeout(() => setRemoteUpdatingUser(null), 2000);
        }

        // Instantly invoke local canvas update callback
        if (onRemoteUpdateRef.current) {
          onRemoteUpdateRef.current({ components, theme, name });
        }

        // Update TanStack Query cache
        queryClient.setQueryData(["project", projectId], (old: Project | undefined) => {
          if (!old) return old;
          return {
            ...old,
            ...(components ? { components } : {}),
            ...(theme ? { theme } : {}),
            ...(name ? { name } : {}),
          };
        });
      }
    });

    // Subscribe to channel
    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        setIsRealtimeConnected(true);
        await channel.track({
          id: myId,
          name: myName,
          avatarUrl: myAvatar,
          color: myColor,
          joinedAt: new Date().toISOString(),
        });
      } else {
        setIsRealtimeConnected(false);
      }
    });

    return () => {
      void supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [projectId, user, supabase, queryClient, getCollaboratorColor]);

  // Function to broadcast live local modifications to other collaborators
  const broadcastCanvasUpdate = useCallback(
    (payload: { components?: BuilderComponent[]; theme?: SiteTheme; name?: string }) => {
      // Record local snapshot to avoid self-update loops
      lastLocalSnapshotRef.current = JSON.stringify({
        components: payload.components,
        theme: payload.theme,
        name: payload.name,
      });

      if (!channelRef.current) return;

      const myId = user?.id || "anon";
      const senderName =
        user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Teammate";

      void channelRef.current.send({
        type: "broadcast",
        event: "canvas_update",
        payload: {
          ...payload,
          senderId: myId,
          senderName,
        },
      });
    },
    [user]
  );

  return {
    project,
    collaborators,
    isRealtimeConnected,
    remoteUpdatingUser,
    broadcastCanvasUpdate,
    saveMutation,
    refetchProject: refetch,
  };
}
