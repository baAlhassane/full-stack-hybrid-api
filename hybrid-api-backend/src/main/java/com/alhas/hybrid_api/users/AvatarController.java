package com.alhas.hybrid_api.users;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.users.user.User;
import com.alhas.hybrid_api.users.user.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@RestController
@RequestMapping("/api/avatar")
public class AvatarController {

    private final UserRepository userRepository;

    public AvatarController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // GET /api/avatar/me → renvoie l'avatar de l'utilisateur connecté
    @GetMapping("/me")
    @Transactional(readOnly = true) // <--- Ajoute ceci pour garder la session ouverte
    public ResponseEntity<byte[]> getMyAvatar() {
        String email = SecurityUtils.getCurrentUserEmail();

        Optional<User> optUser = userRepository.findOneByEmail(email);

        if (optUser.isEmpty()) {
            return ResponseEntity.noContent().build(); // utilisateur absent = 204
        }

        User user = optUser.get();
        UserPicture avatar = user.getAvatar();


        if (avatar == null || avatar.getFile() == null) {
            return ResponseEntity.noContent().build(); // pas d'image = 204
        }
        System.out.println("   @GetMapping(me ) getMyAvatar() ;  UserPicture avatar   : " + avatar.getFile().length);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(avatar.getFileContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + avatar.getName() + "\"")
                .body(avatar.getFile()); // byte[]
    }

}
