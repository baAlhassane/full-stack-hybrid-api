package com.alhas.hybrid_api.users.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger =  LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<String> handleEmailAlreadyUsedException(EmailAlreadyUsedException ex) {
        // Loggez l'exception ici

        //logger.warn("Tentative d'enregistrement avec un email déjà utilisé : {}", ex.getMessage());
        // Ou si vous voulez la trace complète pour le debug, utilisez error() :
         logger.error("Erreur d'enregistrement : email déjà utilisé", ex);

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        // Vous pouvez logguer cette erreur si vous voulez, par exemple :
        logger.error("Tentative de connexion avec un nom d'utilisateur introuvable : {}", ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED); // Ou HttpStatus.BAD_REQUEST si vous préférez être moins spécifique sur la cause
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
 
    // Vous voudrez peut-être aussi gérer AccessDeniedException ici si elle se produit encore pour d'autres raisons
    // @ExceptionHandler(AccessDeniedException.class)
    // public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex) {
    //    return new ResponseEntity<>("Accès Refusé : " + ex.getMessage(), HttpStatus.FORBIDDEN);
    // }
}