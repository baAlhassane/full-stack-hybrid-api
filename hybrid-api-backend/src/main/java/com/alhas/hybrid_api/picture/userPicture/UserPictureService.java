package com.alhas.hybrid_api.picture.userPicture;

import org.springframework.stereotype.Service;

@Service
public class UserPictureService {
    private final UserPictureRepository userPictureRepository;

    public UserPictureService(UserPictureRepository userPictureRepository) {
        this.userPictureRepository = userPictureRepository;
    }

   public UserPicture saveUserPicture( UserPicture userPicture){


        return userPictureRepository.save(userPicture);
   }
}
