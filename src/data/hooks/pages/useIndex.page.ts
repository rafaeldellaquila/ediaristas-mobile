import { useState, useMemo } from 'react';
import { UserShortInterface } from 'data/@types/UserInterface';
import { ValidationService } from 'data/services/ValidationService';
import { ApiService } from 'data/services/ApiService';

export default function useIndex() {
  //States
  const [cep, setCep] = useState('');
  const [warning, setWarning] = useState('');
  const [search, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState(
    [] as UserShortInterface[]
  );
  const [otherProfessionals, setOtherProfessionals] =
    useState(0);

  //Validations
  const cepValidation = useMemo(() => {
    return ValidationService.cep(cep);
  }, [cep]);

  async function searchProfessionals(cep: string) {
    setSearching(false);
    setLoading(true);
    setWarning('');

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        quantidade_diaristas: number;
      }>('/api/diaristas-cidade?cep=' + cep.replace(/\D/g, ''));

      setProfessionals(data.diaristas);
      setOtherProfessionals(data.quantidade_diaristas);
      setSearching(true);
      setLoading(false);
    } catch (error) {
      setWarning('Cep não encontrado');
      setLoading(false);
    }
  }

  return {
    cep,
    setCep,
    cepValidation,
    searchProfessionals,
    warning,
    professionals,
    search,
    loading,
    otherProfessionals,
  };
}
