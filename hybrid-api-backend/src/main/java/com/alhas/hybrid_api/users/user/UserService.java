package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.users.user.authRessource.Authority;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityRepository;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityService;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
   private final UserMapper userMapper;
    private static final String UPDATED_AT_KEY = "updated_at";
    private final AuthorityRepository authorityRepository;
    private final AuthorityService authorityService;

    Set<Authority> authorities=new HashSet<>();

    public UserService(UserRepository userRepository, UserMapper userMapper, AuthorityRepository authorityRepository, AuthorityService authorityService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.authorityRepository = authorityRepository;
        this.authorityService = authorityService;
    }


    public ReadUserDTO getAuthentificationFromExistingUser() {
        OAuth2User auth2User = (OAuth2User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();// 0Auth2User etends de Principal

        User user= SecurityUtils.mapOauth2AttributesToUser(auth2User.getAttributes());

        return getByEmail(user.getEmail())
                .orElseThrow( ()-> new UserException(" User with email "+   user.getEmail() +" does not exist" ));
    }

    @Transactional
    Optional<ReadUserDTO> getByEmail(String email ){
        Optional<User> optionalUser=userRepository.findOneByEmail(email);

        return optionalUser.map(userMapper::mapUserToReadUserDTO);
    }


    public ReadUserDTO saveUser(User user) {
  return userMapper.mapUserToReadUserDTO(userRepository.save(user));

    }
    @Transactional
    public ReadUserDTO updateUserWithIdp(User user) {
        OAuth2User auth2User = (OAuth2User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        Optional<User> optionalUser = userRepository.findOneByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User userInDb = optionalUser.get();

            boolean isIdpUpdated = isSyncIdpModifyByUpdatedAt(auth2User);
            User userFromOAuth2IDp= SecurityUtils.mapOauth2AttributesToUser(auth2User.getAttributes());

            // 🔹 Mise à jour avec les valeurs de l'IDP **seulement si l'IDP a des modifications récentes**
            if (auth2User != null && isIdpUpdated) {
                userInDb.setFirstname(userFromOAuth2IDp.getFirstname());
                userInDb.setLastname(userFromOAuth2IDp.getLastname());
                userInDb.setLastModifiedDate(SecurityUtils.getUpdatedAtIDP(auth2User.getAttributes()));
            }

            // 🔹 Mise à jour avec les valeurs passées dans `user`
            if (user.getFirstname() != null) {
                userInDb.setFirstname(user.getFirstname());
            }
            if (user.getLastname() != null) {
                userInDb.setLastname(user.getLastname());
            }
            if (user.getFirstname() != null) {
                userInDb.setLastModifiedDate(user.getLastModifiedDate());
            }

            //  Enregistrement en base
            User updatedUser = userRepository.save(userInDb);

            return userMapper.mapUserToReadUserDTO(updatedUser);
        }

        throw new EntityNotFoundException("Utilisateur non trouvé avec l'email: " + user.getEmail());
    }
  // methode qui sera appeler dans le controller avant de retourner les infos de l'utilisateur existant
    // pour les mis a jour de son profil.
    public void syncWithIdp(OAuth2User oAuth2User, boolean forceResync) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        User userFrom0Auth2User = SecurityUtils.mapOauth2AttributesToUser(attributes);
        this.authorities.addAll(userFrom0Auth2User.getAuthorities());
        Optional<User> existingUser = userRepository.findOneByEmail(userFrom0Auth2User.getEmail());
        if (existingUser.isPresent()) {
            if (attributes.get(UPDATED_AT_KEY) != null) {
                Instant lastModifiedDate = existingUser.orElseThrow().getLastModifiedDate();
                Instant idpModifiedDate;
                if (attributes.get(UPDATED_AT_KEY) instanceof Instant instant) {
                    idpModifiedDate = instant;
                } else {
                    //Si l'attribut UPDATED_AT_KEY n'est pas un Instant,
                    // il est probablement une valeur numérique représentant un timestamp UNIX (en secondes depuis l'époque - 1970-01-01 00:00:00 UTC).
                    idpModifiedDate = Instant.ofEpochSecond((Integer) attributes.get(UPDATED_AT_KEY));
                }
                if (idpModifiedDate.isAfter(lastModifiedDate) || forceResync) {
                    updateUser(userFrom0Auth2User);
                }
            }
        } else {

            authorityService.saveAuthority(this.authorities);
            userRepository.saveAndFlush(userFrom0Auth2User);
        }
    }

    private void updateUser(User user) {
        Optional<User> userToUpdateOpt= userRepository.findOneByEmail(user.getEmail());
        if(userToUpdateOpt.isPresent()){
            User userToUpdate= userToUpdateOpt.get();
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setFirstname(user.getFirstname());
            userToUpdate.setLastname(user.getLastname());
            userToUpdate.setImageUrl(user.getImageUrl());
            userToUpdate.setAuthorities(user.getAuthorities());
            //System.out.println(" user.isAuthenticated() "+user.isAuthenticated());
           // userToUpdate.setAuthenticated(user.isAuthenticated());
//            userToUpdate.setPublicId(user.getPublicId()); // on doit pas l'ajouter car
            //Car le update est mis les données de OAuth2USer qui n'a pas de publicId.
             userRepository.saveAndFlush(userToUpdate);

        }
    }

    @Transactional
    public boolean isSyncIdpModifyByUpdatedAt(OAuth2User oAuth2User) {
        User userFromIdp = SecurityUtils.mapOauth2AttributesToUser(oAuth2User.getAttributes());
        Optional<User> optionalUser = userRepository.findOneByEmail(userFromIdp.getEmail());
        if (optionalUser.isPresent()) {
            Instant userIdpUpdatedAt = SecurityUtils.getUpdatedAtIDP(oAuth2User.getAttributes());
            Instant lastModifiedInDatabase = optionalUser.get().getLastModifiedDate();

            return userIdpUpdatedAt.isBefore(lastModifiedInDatabase);
        }

        return false;
    }


    public Set<Authority> getUserRoles() {
//        System.out.println(" role1  "+ attributes.get(SecurityUtils.CLAIMS_NAMESPACE));
        return this.authorities;
    }
    
}
