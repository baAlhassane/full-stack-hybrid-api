package com.alhas.hybrid_api.websocket.message;


import com.alhas.hybrid_api.users.user.ChatUserDTO;
import com.alhas.hybrid_api.users.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import static java.rmi.server.LogStream.log;

@Controller
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final Map<String, Set<ChatUserDTO>> roomUsers = new ConcurrentHashMap<>();

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, ChatMessage message) {
        // Envoie le message à tous les abonnés du topic correspondant
        messagingTemplate.convertAndSend("/topic/messages/" + roomId, message);
    }

    @MessageMapping("/join/{roomId}")
    public void joinRoom(@DestinationVariable String roomId, ChatUserDTO user) {
        roomUsers.putIfAbsent(roomId, new HashSet<>());
        roomUsers.get(roomId).add(user);

        // 🔥 Diffuser la liste mise à jour à tout le monde
        messagingTemplate.convertAndSend("/topic/users/" + roomId, roomUsers.get(roomId));
        log.info("➡️ Utilisateurs dans la room {} : {}", roomId, roomUsers.get(roomId));
    }
    @MessageMapping("/leave/{roomId}")
    public void leaveRoom(@DestinationVariable String roomId, ChatUserDTO user) {
        if (roomUsers.containsKey(roomId)) {
            roomUsers.get(roomId).remove(user);

            ChatMessage notification = ChatMessage.builder()
                    .sender("SYSTEM")
                    .content(user.getFirstname() + " " + user.getLastname() + " a quitté le chat")
                    .timestamp(String.valueOf(Instant.now()))
                    .build();

            messagingTemplate.convertAndSend("/topic/messages/" + roomId, notification);
            messagingTemplate.convertAndSend("/topic/users/" + roomId, roomUsers.get(roomId));
        }
    }


}
