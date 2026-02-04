package com.alhas.hybrid_api.websocket.message;


import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@Slf4j
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService; // Injecté

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/join/{roomId}")
    public void joinRoom(@DestinationVariable String roomId,
                         ChatUserDTO user,
                         SimpMessageHeaderAccessor headerAccessor) {

        // IMPORTANT : On stocke l'user et la room dans la session WebSocket
        headerAccessor.getSessionAttributes().put("user", user);
        headerAccessor.getSessionAttributes().put("roomId", roomId);

        chatService.addUser(roomId, user);

        messagingTemplate.convertAndSend("/topic/users/" + roomId, chatService.getUsersInRoom(roomId));
        log.info("➡️ User {} a rejoint la room {}", user.getEmail(), roomId);
    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, ChatMessage message) {
        messagingTemplate.convertAndSend("/topic/messages/" + roomId, message);
    }

    // Tu peux garder leaveRoom pour les clics manuels sur un bouton "Quitter"





    @MessageMapping("/leave/{roomId}")
    public void leaveRoom(@DestinationVariable String roomId, ChatUserDTO user) {
        // 1. Utiliser le service pour supprimer l'utilisateur proprement
        chatService.removeUser(roomId, user);

        // 2. Créer la notification système
        ChatMessage notification = ChatMessage.builder()
                .sender("SYSTEM")
                .content(user.getFirstname() + " " + user.getLastname() + " a quitté le chat")
                .timestamp(String.valueOf(Instant.now()))
                .build();

        // 3. Diffuser le message de départ ET la nouvelle liste
        messagingTemplate.convertAndSend("/topic/messages/" + roomId, notification);
        messagingTemplate.convertAndSend("/topic/users/" + roomId, chatService.getUsersInRoom(roomId));

        log.info("🚪 Départ volontaire : {} de la room {}", user.getEmail(), roomId);
    }
}






// controller sans service chatService à part

//@Controller
//@Slf4j
//public class ChatController {
//
//    private final SimpMessagingTemplate messagingTemplate;
//    private final Map<String, Set<ChatUserDTO>> roomUsers = new ConcurrentHashMap<>();
//
//    public ChatController(SimpMessagingTemplate messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @MessageMapping("/chat/{roomId}")
//    public void sendMessage(@DestinationVariable String roomId, ChatMessage message) {
//        // Envoie le message à tous les abonnés du topic correspondant
//        messagingTemplate.convertAndSend("/topic/messages/" + roomId, message);
//    }
//
//    @MessageMapping("/join/{roomId}")
//    public void joinRoom(@DestinationVariable String roomId, ChatUserDTO user) {
//        roomUsers.putIfAbsent(roomId, new HashSet<>());
//        roomUsers.get(roomId).add(user);
//
//        //  Diffuser la liste mise à jour à tout le monde
//        messagingTemplate.convertAndSend("/topic/users/" + roomId, roomUsers.get(roomId));
//        log.info("➡️ Utilisateurs dans la room {} : {}", roomId, roomUsers.get(roomId));
//    }
//    @MessageMapping("/leave/{roomId}")
//    public void leaveRoom(@DestinationVariable String roomId, ChatUserDTO user) {
//        if (roomUsers.containsKey(roomId)) {
//            roomUsers.get(roomId).remove(user);
//
//            ChatMessage notification = ChatMessage.builder()
//                    .sender("SYSTEM")
//                    .content(user.getFirstname() + " " + user.getLastname() + " a quitté le chat")
//                    .timestamp(String.valueOf(Instant.now()))
//                    .build();
//
//            messagingTemplate.convertAndSend("/topic/messages/" + roomId, notification);
//            messagingTemplate.convertAndSend("/topic/users/" + roomId, roomUsers.get(roomId));
//        }
//    }
//
//
//}
