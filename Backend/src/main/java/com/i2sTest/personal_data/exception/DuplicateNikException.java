package com.i2sTest.personal_data.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateNikException extends RuntimeException {
    public DuplicateNikException(String message) {
        super(message);
    }
}
