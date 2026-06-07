package com.i2sTest.personal_data.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePersonRequest {

    @NotBlank(message = "Nama lengkap wajib diisi")
    private String namaLengkap;

    private String jenisKelamin;

    private LocalDate tanggalLahir;

    private String alamat;

    private String negara;
}
