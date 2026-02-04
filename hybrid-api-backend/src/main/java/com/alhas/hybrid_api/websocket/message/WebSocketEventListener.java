package com.alhas.hybrid_api.websocket.message;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;



@Component
@Slf4j
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // On récupère ce qu'on a mis dans la session lors du joinRoom
        ChatUserDTO user = (ChatUserDTO) headerAccessor.getSessionAttributes().get("user");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        if (user != null && roomId != null) {
            log.info("L'utilisateur {} a perdu la connexion", user.getEmail());
            chatService.removeUser(roomId, user);

            // On met à jour la liste pour les autres personnes restées dans le chat
            messagingTemplate.convertAndSend("/topic/users/" + roomId, chatService.getUsersInRoom(roomId));
        }
    }
}