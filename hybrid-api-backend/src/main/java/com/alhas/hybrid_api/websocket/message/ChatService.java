package com.alhas.hybrid_api.websocket.message;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
@Service
public class ChatService {
    // On déplace la Map ici pour qu'elle soit accessible partout
    private final Map<String, Set<ChatUserDTO>> roomUsers = new ConcurrentHashMap<>();

    public void addUser(String roomId, ChatUserDTO user) {
        roomUsers.computeIfAbsent(roomId, k -> new HashSet<>()).add(user);
    }

    public void removeUser(String roomId, ChatUserDTO user) {
        if (roomUsers.containsKey(roomId)) {
            roomUsers.get(roomId).remove(user);
        }
    }

    public Set<ChatUserDTO> getUsersInRoom(String roomId) {
        return roomUsers.getOrDefault(roomId, new HashSet<>());
    }
}