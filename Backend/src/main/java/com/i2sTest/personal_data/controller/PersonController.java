package com.i2sTest.personal_data.controller;

import com.i2sTest.personal_data.dto.request.CreatePersonRequest;
import com.i2sTest.personal_data.dto.request.UpdatePersonRequest;
import com.i2sTest.personal_data.dto.response.PersonResponse;
import com.i2sTest.personal_data.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PersonResponse create(
        @Valid @RequestBody CreatePersonRequest request
    ) {
        return personService.create(request);
    }

    @GetMapping("/{nik}")
    public PersonResponse getByNik(
        @PathVariable String nik
    ) {
        return personService.getByNik(nik);
    }

    @GetMapping
    public List<PersonResponse> getAll(
            @RequestParam(required = false) String nik,
            @RequestParam(required = false) String namaLengkap
    ) {
        return personService.getAll(nik, namaLengkap);
    }

    @PutMapping("/{nik}")
    public PersonResponse update(
        @PathVariable String nik,
        @Valid @RequestBody UpdatePersonRequest request
    ) {
        return personService.update(nik, request);
    }

    @DeleteMapping("/{nik}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @PathVariable String nik
    ) {
        personService.delete(nik);
    }
    
}
