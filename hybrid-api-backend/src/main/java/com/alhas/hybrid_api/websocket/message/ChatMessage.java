package com.alhas.hybrid_api.websocket.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String receiver;
    private String content;
    private String roomId;
    private String timestamp;
}
