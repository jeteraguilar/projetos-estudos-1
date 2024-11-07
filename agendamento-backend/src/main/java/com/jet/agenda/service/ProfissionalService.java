package com.jet.agenda.service;

import com.jet.agenda.model.Profissional;
import com.jet.agenda.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfissionalService {
    @Autowired
    private ProfissionalRepository profissionalRepository;

    public List<Profissional> listarProfissionais() {
        return profissionalRepository.findAll();
    }

    public Profissional cadastrarProfissional(Profissional profissional) {
        return profissionalRepository.save(profissional);
    }
}
